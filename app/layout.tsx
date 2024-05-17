import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/contexts/theme-provider";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spectrum Store - Your One-Stop Shop",
	description:
		"Discover a spectrum of possibilities with our wide range of products. Spectrum Store, your one-stop shop for all your needs.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
