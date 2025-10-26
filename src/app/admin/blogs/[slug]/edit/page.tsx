"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import AdminActionBar from "@/components/adminActionBar";
import { getBlog, saveBlog } from "@/lib/api";

export default function AdminBlogEditPage() {
    const { slug: rawSlug } = useParams<{ slug: string }>();
    const slug = useMemo(() => decodeURIComponent(rawSlug ?? ""), [rawSlug]);

    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        (async () => {
            if (!slug) return;
            try {
                const blog = await getBlog(slug);
                if (!blog) {
                    toast.error("글을 찾을 수 없습니다.");
                    router.replace("/admin/blogs");
                    return;
                }
                setTitle(blog.title ?? "");
                setContent(blog.content ?? "");
            } catch (e) {
                console.error(e);
                toast.error("불러오는 중 오류가 발생했습니다.");
                router.replace("/admin/blogs");
            }
        })();
    }, [slug, router]);

    async function handleSubmit() {
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            toast.error("제목과 본문을 입력해주세요.");
            return;
        }

        setSaving(true);
        try {
            await saveBlog({
                title: trimmedTitle,
                slug, // 슬러그는 수정하지 않음
                content: trimmedContent,
            });
            router.push("/admin/blogs");
        } catch (err) {
            console.error("블로그 수정 실패:", err);
            toast.error("저장 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Toaster position="top-center" />

            <h1 className="text-2xl font-bold">블로그 글 수정</h1>

            <AdminActionBar
                backPath="/admin/blogs"
                onSave={handleSubmit}
                loading={saving}
            />

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="block text-md font-medium">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-md font-medium">슬러그</label>
                    <input
                        type="text"
                        value={slug}
                        disabled
                        className="border p-2 w-full rounded text-gray-600"
                    />
                    <p className="text-xs text-gray-500">
                        URL에 사용됩니다. 예) <code>/blogs/{slug}</code>
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-md font-medium">본문</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        className="border p-2 w-full rounded resize-none"
                    />
                </div>

            </div>
        </div>
    );
}
