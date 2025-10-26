"use client";

import AdminActionBar from "@/components/adminActionBar";

type Mode = "create" | "edit";

interface BlogFormProps {
    mode: Mode;                         // "create" | "edit" (슬러그 입력 가능/불가 제어 + 제목 문구)
    title: string;
    slug: string;
    content: string;
    slugInvalid?: boolean;
    saving?: boolean;
    onChangeTitle: (v: string) => void;
    onChangeSlug: (v: string) => void;
    onChangeContent: (v: string) => void;
    onSave: () => void;
}

export default function BlogForm({
                                     mode,
                                     title,
                                     slug,
                                     content,
                                     slugInvalid = false,
                                     saving = false,
                                     onChangeTitle,
                                     onChangeSlug,
                                     onChangeContent,
                                     onSave,
                                 }: BlogFormProps) {
    const isCreate = mode === "create";

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">
                {isCreate ? "새 블로그 글 작성" : "블로그 글 수정"}
            </h1>

            <AdminActionBar backPath="/admin/blogs" onSave={onSave} saving={saving} />

            <div className="space-y-5">
                {/* 제목 */}
                <div className="space-y-2">
                    <label className="block text-md font-medium">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onChangeTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* 슬러그 */}
                <div className="space-y-1">
                    <label className="block text-md font-medium">슬러그</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => onChangeSlug(e.target.value)}
                        placeholder="예: my-first-post"
                        disabled={!isCreate} // 수정 페이지에서는 비활성화
                        className={`border p-2 w-full rounded ${
                            slugInvalid ? "border-red-500" : ""
                        } ${!isCreate ? "text-gray-500 border-gray-50" : ""}`}
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

                {/* 본문 */}
                <div className="space-y-2">
                    <label className="block text-md font-medium">본문</label>
                    <textarea
                        value={content}
                        onChange={(e) => onChangeContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        className="border p-2 w-full rounded resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
