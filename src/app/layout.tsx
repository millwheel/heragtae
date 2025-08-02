import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto", // CSS 변수로 등록
});

export const metadata: Metadata = {
    title: "Hera Landing Page",
    description: "Welcome to Hera's simple introduction website built with Next.js",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={roboto.variable}>
            <body>{children}</body>
        </html>
    );
}