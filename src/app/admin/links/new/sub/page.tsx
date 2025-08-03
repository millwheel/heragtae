'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getLinks, saveLinks } from '@/lib/api';
import type { LinkItem } from '@/data/type';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast, {Toaster} from "react-hot-toast";
import Image from "next/image";

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
            console.error(e);
            alert('이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
        }
    }

    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    async function handleSubmit() {
        if (!newItem.href.trim() || !isValidUrl(newItem.href)) {
            toast.error('올바른 링크 주소를 입력하세요.');
            return;
        }
        if (!newItem.title.trim()) {
            toast.error('제목을 입력하세요.');
            return;
        }
        if (!newItem.image) {
            toast.error('이미지를 업로드하세요.');
            return;
        }

        const current = await getLinks('sub');
        const updated = [...current, newItem];
        await saveLinks('sub', updated);
        router.push('/admin/links');
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <Toaster position="top-center" />
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

                    <label
                        htmlFor="fileUpload"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transition"
                    >
                        이미지 업로드
                    </label>
                </div>

                {uploading && <p className="text-gray-500 text-sm">업로드 중...</p>}

                {newItem.image && (
                    <Image
                        src={newItem.image}
                        alt="preview"
                        width={100}
                        height={100}
                        className="w-full max-w-xs object-contain border rounded"
                    />
                )}
            </div>
        </div>
    );
}
