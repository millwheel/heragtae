"use client";

import AdminGuard from "@/auth/guard";
import { useRouter } from "next/navigation";
import {logout} from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.replace("/");
    }

    return (
        <AdminGuard>
            <div className="w-full border-b flex justify-end p-4 bg-gray-50">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400 text-sm hover:cursor-pointer"
                >
                    로그아웃
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </AdminGuard>
    );
}