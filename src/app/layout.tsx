import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto", // CSS 변수로 등록
});

export const metadata: Metadata = {
    title: "Heragatae",
    description: "Heragatae",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={roboto.variable}>
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}