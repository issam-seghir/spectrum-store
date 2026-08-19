import { useMounted } from "@/hooks/use-mounted";

export const useOrigin = () => {
    const mounted = useMounted();
    const origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";

    if (!mounted) {
        return "";
    }

    return origin;
};
