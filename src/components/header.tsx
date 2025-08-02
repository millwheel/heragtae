"use client"

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full py-2 px-6 shadow-md bg-white sticky top-0 z-50">
            <div className="max-w-6xl flex justify-between items-center">
                <Link href="/" className="text-xl text-gray-900">
                    heragtae
                </Link>
            </div>
        </header>
    );
}