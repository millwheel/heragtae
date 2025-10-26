"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Blog } from "@/data/type";
import { getBlogs, deleteBlog } from "@/lib/api";
import { excerpt } from "@/util/stringUtils";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        (async () => {
            const fetched = await getBlogs();
            setBlogs(fetched);
        })();
    }, []);

    async function handleDelete(slug: string) {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteBlog(slug);
            toast.success("삭제되었습니다.");
            const updated = await getBlogs();
            setBlogs(updated);
        } catch (e) {
            toast.error("블로그 삭제 실패");
            console.error("블로그 삭제 실패:", e);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">블로그 관리</h1>
                <Link
                    href="/admin/blogs/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                >
                    새 글 작성
                </Link>
            </div>

            <div className="space-y-4">
                {blogs.length === 0 ? (
                    <p className="text-gray-500">작성된 글이 없습니다.</p>
                ) : (
                    blogs.map((b) => (
                        <div key={b.slug} className="border p-4 rounded-lg shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="pr-4">
                                    <h2 className="text-lg font-semibold break-words">{b.title}</h2>
                                    <p className="text-xs text-gray-500">
                                        slug: {b.slug} ·{" "}
                                        수정시각: {b.updatedAt ? new Date(b.updatedAt).toLocaleString() : ""}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/blogs/${b.slug}/edit/`}
                                        className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-500 transition"
                                    >
                                        수정
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(b.slug)}
                                        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-500 transition cursor-pointer"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>

                            <p className="mt-3 text-gray-300 leading-relaxed break-words">
                                {excerpt(b.content, 200)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
