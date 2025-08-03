'use client';

import { useEffect, useState } from 'react';
import type {LinkItem, Mode} from '@/data/type';
import Image from 'next/image';
import { getLinks, saveLinks} from '@/lib/api';

export default function AdminLinksPage() {
    const [mode, setMode] = useState<Mode>('main');
    const [items, setItems] = useState<LinkItem[]>([]);
    const [newItem, setNewItem] = useState<LinkItem>({ href: '', image: '', title: '' });

    useEffect(() => {
        fetchItems();
    }, [mode]);

    async function fetchItems() {
        const data = await getLinks(mode);
        setItems(data);
    }

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

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border p-4 flex flex-col space-y-2">
                        <input
                            className="border p-2" value={item.href}
                            onChange={e => handleUpdate(index, 'href', e.target.value)} placeholder="링크 주소" />
                        <input
                            className="border p-2" value={item.image}
                            onChange={e => handleUpdate(index, 'image', e.target.value)} placeholder="이미지 URL" />
                        <input
                            className="border p-2" value={item.title}
                            onChange={e => handleUpdate(index, 'title', e.target.value)} placeholder="제목" />
                        <Image src={item.image} alt={item.title} width={200} height={60} className="object-contain" />
                        <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:cursor-pointer">
                            삭제
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">새 링크 추가</h2>
                <div className="space-y-2">
                    <input
                        className="border p-2 w-full"
                        placeholder="링크 주소" value={newItem.href} onChange={e => setNewItem({ ...newItem, href: e.target.value })} />
                    <input
                        className="border p-2 w-full"
                        placeholder="이미지 URL" value={newItem.image} onChange={e => setNewItem({ ...newItem, image: e.target.value })} />
                    <input
                        className="border p-2 w-full"
                        placeholder="제목" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded">
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
}