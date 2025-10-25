"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { saveBlog, getBlog } from "@/lib/api";

const SLUG_REGEX = /^[A-Za-z-]+$/;
function validateSlug(s: string): boolean {
    return SLUG_REGEX.test(s);
}

export default function AdminBlogNewPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");

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
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <Toaster position="top-center" />

            <h1 className="text-2xl font-bold">새 블로그 글 작성</h1>

            {/* 상단 액션 바: 목록 / 저장 나란히 */}
            <div className="flex justify-between mb-12">
                <button
                    onClick={() => router.push("/admin/blogs")}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
                >
                    목록으로 돌아가기
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 hover:cursor-pointer"
                >
                    저장
                </button>
            </div>

            {/* 입력 폼 (LinkForm 스타일 맞춤) */}
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
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="예: my-first-post"
                        className={`border p-2 w-full rounded ${
                            slugInvalid ? "border-red-500" : ""
                        }`}
                    />
                    <p className={`text-xs ${slugInvalid ? "text-red-600" : "text-gray-500"}`}>
                        {slugInvalid ? (
                            "슬러그는 영문자와 하이픈(-)만 가능합니다."
                        ) : (
                            <>
                                URL에 사용됩니다. 예) <code>/blogs/{slug || "my-first-post"}</code>
                            </>
                        )}
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-md font-medium">본문</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        className="border p-2 w-full rounded"
                    />
                </div>
            </div>
        </div>
    );
}
