"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Blog } from "@/data/type";
import { getBlog } from "@/lib/api";

export default function BlogDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            const data = await getBlog(slug);
            setBlog(data);
            setLoading(false);
        })();
    }, [slug]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <Link href="/blogs" className="text-sm text-blue-600 hover:underline">
                    목록으로
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-48 bg-gray-100 rounded animate-pulse" />
                </div>
            ) : !blog ? (
                <p className="text-gray-500">해당 글을 찾을 수 없습니다.</p>
            ) : (
                <article className="prose max-w-none">
                    <h2 className="!mt-0">{blog.title}</h2>
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </div>
                </article>
            )}
        </div>
    );
}
