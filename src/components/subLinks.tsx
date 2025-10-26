"use client";

import { useEffect, useState } from "react";
import {getLinks} from "@/lib/api";
import type { LinkItem } from "@/data/type";
import Link from "next/link";
import Image from "next/image";
import FadeInWrapper from "@/components/fadeInWrapper";

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export default function SubLinks() {
    const [subLinks, setSubLinks] = useState<LinkItem[]>([]);

    useEffect(() => {
        (async () => {
            const links = await getLinks('sub');
            const shuffled = shuffleArray(links);
            setSubLinks(shuffled);
        })();
    }, []);

    return (
        <div>
            {/* 데스크톱: 2열 Flexbox */}
            <div className="hidden md:flex md:flex-wrap md:justify-center">
                {subLinks.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        target="_blank"
                    >
                        <FadeInWrapper delay={index * 25}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={120}
                                className="max-w-[400px] h-auto"
                                unoptimized
                            />
                        </FadeInWrapper>
                    </Link>
                ))}
            </div>

            {/* 모바일: 1열 중앙 정렬 */}
            <div className="md:hidden flex flex-col items-center">
                {subLinks.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        target="_blank"
                    >
                        <FadeInWrapper delay={index * 25}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={120}
                                className="max-w-[400px] h-auto"
                                unoptimized
                            />
                        </FadeInWrapper>
                    </Link>
                ))}
            </div>
        </div>
    );
}
