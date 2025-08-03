'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getLinks, saveLinks } from '@/lib/api';
import type { LinkItem } from '@/data/type';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddSubLinkPage() {
    const router = useRouter();

    const [newItem, setNewItem] = useState<LinkItem>({
        href: '',
        image: '',
        title: '',
    });
    const [uploading, setUploading] = useState(false);

    async function handleUploadImage(file: File) {
        if (!file) return;
        setUploading(true);
        try {
            const storageRef = ref(storage, `sub-images/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setNewItem((prev) => ({ ...prev, image: url }));
        } catch (e) {
            alert('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit() {
        const current = await getLinks('sub');
        const updated = [...current, newItem];
        await saveLinks('sub', updated);
        router.push('/admin/links');
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">서브 링크 추가</h1>

            <div className="space-y-4">
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 hover:cursor-pointer disabled:opacity-50"
                    >
                        저장하고 돌아가기
                    </button>
                </div>
                <div className="space-y-2">
                    <label className="block text-md font-medium">링크 주소</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder="https://example.com"
                        value={newItem.href}
                        onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-md font-medium">제목</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder="제목"
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    />
                </div>

                <div>
                    {/* 숨겨진 실제 파일 입력 */}
                    <input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadImage(file);
                        }}
                        className="hidden"
                    />

                    {/* 빨간색 버튼처럼 보이도록 label 사용 */}
                    <label
                        htmlFor="fileUpload"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transition"
                    >
                        이미지 업로드
                    </label>
                </div>

                {uploading && <p className="text-gray-500 text-sm">업로드 중...</p>}

                {newItem.image && (
                    <img
                        src={newItem.image}
                        alt="preview"
                        className="w-full max-w-xs object-contain border rounded"
                    />
                )}
            </div>
        </div>
    );
}
