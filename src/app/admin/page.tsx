import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="h-150 flex items-center justify-center">
            <div className="flex space-x-8">
                <Link
                    href="/admin/links"
                    className="px-16 py-16 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 text-center
                    transition-colors duration-600 ease-in-out"
                >
                    링크 관리
                </Link>

                <Link
                    href="/admin/blogs"
                    className="px-16 py-16 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 text-center
                    transition-colors duration-600 ease-in-out"
                >
                    블로그 관리
                </Link>
            </div>
        </div>
    );
}