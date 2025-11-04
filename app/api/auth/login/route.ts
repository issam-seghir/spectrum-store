import apiClient from "@/lib/apiClient";
import mapApiError from "@/lib/errorMapper";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Server-side proxy for login requests to fakestoreapi.com
 * Adds retry logic and better error handling to work around Cloudflare challenges
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        let lastError: any;

        // Retry logic with exponential backoff
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await apiClient.post(
                    `${API_URL}/auth/login`,
                    { username, password },
                    {
                        timeout: 15000, // 15 second timeout per attempt
                    }
                );

                // Success! Return the token
                return NextResponse.json({
                    token: response.data.token,
                    success: true,
                });
            } catch (error: any) {
                lastError = error;

                // If it's an HTML response (Cloudflare), log and retry
                if (error?.isExternalHtml) {
                    console.warn(
                        `Login attempt ${attempt}/${MAX_RETRIES} failed: external API returned HTML`,
                        {
                            status: error?.response?.status,
                            attempt,
                        }
                    );
                } else {
                    // Other errors (401, 404, network, etc.)
                    console.error(
                        `Login attempt ${attempt}/${MAX_RETRIES} failed:`,
                        error?.response?.data || error?.message
                    );
                }

                // If not the last attempt, wait before retrying
                if (attempt < MAX_RETRIES) {
                    const delay = RETRY_DELAY * Math.pow(2, attempt - 1); // Exponential backoff
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    // Last attempt failed, break and return error
                    break;
                }
            }
        }

        // All retries failed
        const mapped = mapApiError(lastError);
        console.error("All login attempts failed:", mapped.message);

        return NextResponse.json(
            {
                error: mapped.friendly,
                details: mapped.message,
                success: false,
            },
            { status: mapped.status || 503 }
        );
    } catch (error: any) {
        console.error("Login proxy error:", error);
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
