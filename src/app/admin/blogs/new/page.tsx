"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { saveBlog, getBlog } from "@/lib/api";
import {validateSlug} from "@/util/stringUtils";
import BlogForm from "@/components/blogForm";

export default function AdminBlogNewPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

    const slugInvalid = slug.length > 0 && !validateSlug(slug);

    async function handleSubmit() {
        const trimmedTitle = title.trim();
        const trimmedSlug = slug.trim(); // 사용자 입력 그대로 사용
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedSlug || !trimmedContent) {
            toast.error("제목, 슬러그, 본문을 모두 입력해주세요.");
            return;
        }
        if (!validateSlug(trimmedSlug)) {
            toast.error("슬러그는 영문자(A–Z, a–z)와 하이픈(-)만 사용할 수 있습니다.");
            return;
        }

        setSaving(true);
        try {
            const exists = await getBlog(trimmedSlug);
            if (exists) {
                toast.error("이미 존재하는 슬러그입니다. 다른 값을 사용해주세요.");
                return;
            }

            await saveBlog({
                title: trimmedTitle,
                slug: trimmedSlug,
                content: trimmedContent,
            });

            toast.success("블로그 글이 생성되었습니다.");
            router.push("/admin/blogs");
        } catch (err) {
            toast.error("저장 중 오류가 발생했습니다.");
            console.error("블로그 저장 실패:", err);
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <Toaster position="top-center" />
            <BlogForm
                mode="create"
                title={title}
                slug={slug}
                content={content}
                slugInvalid={slugInvalid}
                saving={saving}
                onChangeTitle={setTitle}
                onChangeSlug={setSlug}
                onChangeContent={setContent}
                onSave={handleSubmit}
            />
        </>
    );
}
