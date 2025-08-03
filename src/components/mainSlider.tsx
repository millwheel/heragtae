"use client";

import { useEffect, useState } from "react";
import { getMainLinks } from "@/lib/getLinks";
import type { LinkItem } from "@/data/type";
import Link from "next/link";
import Image from "next/image";
import SliderWrapper from "@/components/sliderWrapper";

export default function MainSlider() {
    const [mainLinks, setMainLinks] = useState<LinkItem[]>([]);

    useEffect(() => {
        (async () => {
            const links = await getMainLinks();
            setMainLinks(links);
        })();
    }, []);

    return (
        <div className="flex justify-center">
            <SliderWrapper>
                {mainLinks.map((item, index) => (
                    <Link key={index} href={item.href} target="_blank">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={1200}
                            height={400}
                            className="w-full max-w-5xl h-auto"
                        />
                    </Link>
                ))}
            </SliderWrapper>
        </div>
    );
}