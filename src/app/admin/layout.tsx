"use client";

import { useRouter } from "next/navigation";
import {logout, observeAuthState} from "@/lib/api";
import {useEffect, useState} from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = observeAuthState((user) => {
            if (!user) {
                router.replace("/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    async function handleLogout() {
        await logout();
        router.replace("/");
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full bg-gray-50 py-4">
                <div className="max-w-4xl mx-auto flex justify-between">
                    <button
                        onClick={() => router.push("/admin")}
                        className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-500 text-sm hover:cursor-pointer"
                    >
                        관리 홈
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400 text-sm hover:cursor-pointer"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </>
    );
}