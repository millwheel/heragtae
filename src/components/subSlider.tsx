"use client";

import { useEffect, useState } from "react";
import { getSubLinks } from "@/lib/getLinks";
import type { LinkItem } from "@/data/type";
import Link from "next/link";
import Image from "next/image";

export default function SubSlider() {
    const [subLinks, setSubLinks] = useState<LinkItem[]>([]);

    useEffect(() => {
        (async () => {
            const links = await getSubLinks();
            setSubLinks(links);
        })();
    }, []);

    return (
        <div>
            {subLinks.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={120}
                        className="max-w-[400px] h-auto"
                    />
                </Link>
            ))}
        </div>
    );
}
