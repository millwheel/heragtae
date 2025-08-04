"use client";

import AdminGuard from "@/auth/guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            {children}
        </AdminGuard>
    );
}