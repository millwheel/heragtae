import { notFound } from "next/navigation";
import {fetchAllSlugs, fetchBlog} from "@/lib/serverApi";
import {Metadata} from "next";

export const revalidate = 60;
export const runtime = "nodejs";
export const dynamicParams = true;

export async function generateStaticParams() {
    const slugs = await fetchAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const blog = await fetchBlog(slug);
    const title = blog?.title ?? "제목 없는 블로그";
    const description = blog
        ? blog.content.slice(0, 200) + (blog.content.length > 200 ? "…" : "")
        : "게시글을 찾을 수 없습니다.";

    return {
        title,
        description,
        alternates: { canonical: `/blogs/${slug}` },
    };
}

export default async function BlogDetailPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const blog = await fetchBlog(slug);
    if (!blog) return notFound();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col gap-5">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h2 className="!mt-0 text-2xl font-bold">{blog.title}</h2>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
                    {blog.content}
                </div>
            </div>
        </div>
    );
}
