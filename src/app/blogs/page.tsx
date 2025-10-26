"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from "@/data/type";
import { getBlogs } from "@/lib/api";
import {excerpt} from "@/util/stringUtils";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        (async () => {
            const list = await getBlogs();
            setBlogs(list);
        })();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">블로그</h1>

            {blogs.length === 0 ? (
                <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
            ) : (
                <ul className="space-y-6">
                    {blogs.map((b) => (
                        <li key={b.slug}>
                            <Link
                                href={`/blogs/${b.slug}`}
                                className="
                                  block
                                  p-6 rounded-xl
                                  bg-gray-700 text-white
                                  shadow-md hover:shadow-xl
                                  hover:bg-gray-600
                                  transition duration-300
                                  cursor-pointer
                                "
                            >
                                <h2 className="text-xl font-semibold mb-3">{b.title}</h2>
                                <p className="text-gray-200 leading-relaxed">
                                    {excerpt(b.content, 200)}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
