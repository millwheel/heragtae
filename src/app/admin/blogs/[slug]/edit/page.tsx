"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { getBlog, saveBlog } from "@/lib/api";
import BlogForm from "@/components/blogForm";

export default function AdminBlogEditPage() {
    const { slug: rawSlug } = useParams<{ slug: string }>();
    const slug = useMemo(() => decodeURIComponent(rawSlug ?? ""), [rawSlug]);
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

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
        <>
            <Toaster position="top-center" />
            <BlogForm
                mode="edit"
                title={title}
                slug={slug}
                content={content}
                saving={saving}
                onChangeTitle={setTitle}
                onChangeSlug={() => {}}
                onChangeContent={setContent}
                onSave={handleSubmit}
            />
        </>
    );
}
