import Link from "next/link";

export default function GlobalNavigationBar() {
    return (
        <header className="w-full py-2 px-6 shadow-md bg-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between relative">
                {/* 왼쪽 로고 */}
                <Link href="/" className="text-xl text-gray-900">
                    보증 911
                </Link>

                {/* 가운데 메뉴 */}
                <Link
                    href="/blogs"
                    className="absolute left-1/2 transform -translate-x-1/2 text-xl text-gray-900"
                >
                    토토 블로그
                </Link>
            </div>
        </header>
    );
}