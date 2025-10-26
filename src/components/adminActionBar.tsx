"use client";

import { useRouter } from "next/navigation";

interface AdminActionBarProps {
    backPath: string;
    onSave: () => void;
    saving?: boolean;
}

export default function AdminActionBar({
                                           backPath,
                                           onSave,
                                           saving = false,
                                       }: AdminActionBarProps) {
    const router = useRouter();

    return (
        <div className="flex justify-between mb-12">
            <button
                onClick={() => router.push(backPath)}
                disabled={saving}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer disabled:opacity-50"
            >
                목록으로 돌아가기
            </button>

            <button
                onClick={onSave}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 hover:cursor-pointer disabled:opacity-50"
            >
                저장
            </button>
        </div>
    );
}
