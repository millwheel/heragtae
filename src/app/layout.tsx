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
    metadataBase: new URL("https://www.bojeung911.net/"),
    title: {
        default: "보증911",
        template: "%s | 보증911",
    },
    description: "보증911",
    keywords: ["보증", "검증", "블랙리스트", "안전거래"],
    alternates: {
        canonical: "/",
        languages: {
            "ko-KR": "/",
        },
    },
    openGraph: {
        type: "website",
        siteName: "보증911",
        title: "보증911",
        description: "보증911",
        url: "https://www.bojeung911.net/",
        images: [
            {
                url: "image/og.png",
                width: 300,
                height: 600,
                alt: "보증911",
            },
        ],
        locale: "ko_KR",
    },
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