'use client';

import { useEffect, useState } from 'react';
import type {LinkItem, Document} from '@/data/type';
import Image from 'next/image';
import { getLinks, saveLinks} from '@/lib/api';
import Link from "next/link";

export default function AdminLinksPage() {
    const [mode, setMode] = useState<Document>('sub');
    const [items, setItems] = useState<LinkItem[]>([]);
    const [newItem, setNewItem] = useState<LinkItem>({ href: '', image: '', title: '' });

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

    function handleUpdate(index: number, field: keyof LinkItem, value: string) {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    }

    async function handleAdd() {
        const updated = [...items, newItem];
        await handleSave(updated);
        setNewItem({ href: '', image: '', title: '' });
    }

    async function handleDelete(index: number) {
        const updated = items.filter((_, i) => i !== index);
        await handleSave(updated);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">링크 관리</h1>

            <div className="flex justify-between items-center">
                {/* 왼쪽: 모드 토글 버튼 */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => setMode('main')}
                        className={`px-4 py-2 rounded-lg font-semibold transition hover:cursor-pointer
                        ${mode === 'main'
                            ? 'bg-red-500 text-white shadow-lg scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        메인 배너 링크
                    </button>
                    <button
                        onClick={() => setMode('sub')}
                        className={`px-4 py-2 rounded-lg font-semibold transition hover:cursor-pointer
                        ${mode === 'sub'
                            ? 'bg-red-500 text-white shadow-lg scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        서브 리스트 링크
                    </button>
                </div>

                {/* 오른쪽: 새 링크 추가 버튼 */}
                <Link
                    href={`/admin/links/new/${mode}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                >
                    {mode === 'main' ? '메인 배너 추가' : '서브 링크 추가'}
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border p-4 flex flex-col space-y-2">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={60}
                            className="object-contain"
                        />
                        <input
                            className="border p-2" value={item.href}
                            onChange={e => handleUpdate(index, 'href', e.target.value)}
                            placeholder="링크 주소"
                        />
                        <input
                            className="border p-2" value={item.image}
                            onChange={e => handleUpdate(index, 'image', e.target.value)}
                            placeholder="이미지 URL"
                        />
                        <input
                            className="border p-2" value={item.title}
                            onChange={e => handleUpdate(index, 'title', e.target.value)}
                            placeholder="제목"
                        />
                        <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:cursor-pointer">
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}