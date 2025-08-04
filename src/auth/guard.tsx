"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {observeAuthState} from "@/lib/api";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
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

    if (loading) return <p>Loading...</p>;
    return <>{children}</>;
}