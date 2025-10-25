"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from "@/data/type";
import { getBlogs } from "@/lib/api"; // 실제 경로 맞춰주세요

function excerpt(text: string, max = 200) {
    const flat = (text ?? "").replace(/\s+/g, " ").trim();
    return flat.length > max ? flat.slice(0, max) + "…" : flat;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const list = await getBlogs();
            setBlogs(list);
            setLoading(false);
        })();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">블로그</h1>

            {loading ? (
                <div className="space-y-4">
                    <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                </div>
            ) : blogs.length === 0 ? (
                <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
            ) : (
                <ul className="space-y-6">
                    {blogs.map((b) => (
                        <li key={b.slug}>
                            <article className="p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition">
                                <h2 className="text-xl font-semibold mb-2">
                                    <Link href={`/blogs/${b.slug}`} className="hover:underline">
                                        {b.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {excerpt(b.content, 200)}
                                </p>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
