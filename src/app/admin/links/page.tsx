'use client';

import { useEffect, useState } from 'react';
import type {LinkItem, Document} from '@/data/type';
import Image from 'next/image';
import {deleteImageFromStorage, getLinks, saveLinks} from '@/lib/api';
import Link from "next/link";
import {CheckIcon, TrashIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function AdminLinksPage() {
    const [mode, setMode] = useState<Document>('sub');
    const [items, setItems] = useState<LinkItem[]>([]);

    useEffect(() => {
        (async  () => {
            const links = await getLinks(mode);
            setItems(links);
        })();
    }, [mode]);

    async function handleSave(updated: LinkItem[]) {
        await saveLinks(mode, updated);
        setItems(updated);
    }

    async function handleDelete(index: number) {
        const itemToDelete = items[index];
        const updated = items.filter((_, i) => i !== index);

        try {
            await deleteImageFromStorage(itemToDelete.image);
        } catch (e) {
            toast.error("이미지 삭제 실패");
            console.error("이미지 삭제 실패:", e);
        }

        await handleSave(updated);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">링크 관리</h1>

            <div className="flex justify-between items-center">
                {/* 상단 카테고리 선택 */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => setMode('main')}
                        className={`px-4 py-2 rounded-lg transition hover:cursor-pointer
                        ${mode === 'main'
                            ? 'bg-gray-500 text-white shadow-lg scale-105 font-semibold'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        <div className="flex space-x-2">
                            {mode === 'main' && <CheckIcon className="w-5 h-5" />}
                            <span>메인 배너 링크</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setMode('sub')}
                        className={`px-4 py-2 rounded-lg transition hover:cursor-pointer
                        ${mode === 'sub'
                            ? 'bg-gray-500 text-white shadow-lg scale-105 font-semibold'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        <div className="flex space-x-2">
                            {mode === 'sub' && <CheckIcon className="w-5 h-5" />}
                            <span>서브 리스트 링크</span>
                        </div>
                    </button>
                </div>

                {/* 새 링크 추가 */}
                <Link
                    href={`/admin/links/new/${mode}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 transition whitespace-nowrap"
                >
                    {mode === 'main' ? '메인 배너 추가' : '서브 링크 추가'}
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border p-4 flex flex-col space-y-2 rounded-lg shadow-sm">

                        <div className="flex justify-between items-start">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={200}
                                height={60}
                                className="object-contain"
                            />
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-red-600 text-xl hover:scale-110 transition hover:cursor-pointer"
                                title="삭제"
                            >
                                <TrashIcon className="w-7 h-7" />
                            </button>
                        </div>

                        <ul className="list-disc pl-5 text-sm text-gray-100 space-y-1 bg-gray-800 p-4 rounded-md">
                            <li className="break-words">
                                <strong>링크 주소:</strong>
                                {item.href}
                            </li>
                            <li className="break-words">
                                <strong>이미지 URL:</strong>
                                {item.image}
                            </li>
                            <li className="break-words">
                                <strong>제목:</strong>
                                {item.title}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}