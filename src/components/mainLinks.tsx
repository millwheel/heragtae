"use client";

import { useEffect, useState } from "react";
import { getLinks } from "@/lib/api";
import type { LinkItem } from "@/data/type";
import Link from "next/link";
import Image from "next/image";
import SliderWrapper from "@/components/sliderWrapper";

export default function MainLinks() {
    const [mainLinks, setMainLinks] = useState<LinkItem[]>([]);

    useEffect(() => {
        (async () => {
            const links = await getLinks('main');
            setMainLinks(links);
        })();
    }, []);

    return (
        <div>
            <SliderWrapper>
                {mainLinks.map((item, index) => (
                    <Link key={index} href={item.href} target="_blank">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={1000}
                            height={420}
                            className="w-full max-w-5xl h-auto"
                        />
                    </Link>
                ))}
            </SliderWrapper>
        </div>
    );
}