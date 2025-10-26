"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Blog } from "@/data/type";
import { getBlog } from "@/lib/api";

export default function BlogDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            const data = await getBlog(slug);
            setBlog(data);
        })();
    }, [slug]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="">
                {!blog ? (
                    <p className="text-gray-500">해당 글을 찾을 수 없습니다.</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h2 className="!mt-0 text-2xl font-bold">{blog.title}</h2>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
                            {blog.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
