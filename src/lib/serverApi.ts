import { adminDb } from "./firebaseAdmin";
import {Blog} from "@/data/type";

export async function fetchBlogs(): Promise<Blog[]> {
    const snap = await adminDb
        .collection("blogs")
        .orderBy("createdAt", "desc")
        .get();

    return snap.docs.map((doc) => {
        const data = doc.data() as FirebaseFirestore.DocumentData;
        return {
            title: String(data.title ?? ""),
            slug: String(data.slug ?? ""),
            content: String(data.content ?? ""),
            createdAt: data.createdAt instanceof Date
                ? data.createdAt
                : data.createdAt?.toDate?.() ?? new Date(0),
            updatedAt: data.updatedAt instanceof Date
                ? data.updatedAt
                : data.updatedAt?.toDate?.() ?? new Date(0),
        } satisfies Blog;
    });
}

export async function fetchBlog(slug: string): Promise<Blog | null> {
    const ref = adminDb.collection("blogs").doc(slug);
    const snap = await ref.get();
    if (!snap.exists) return null;

    const data = snap.data() as FirebaseFirestore.DocumentData;
    return {
        title: String(data.title ?? ""),
        slug: String(data.slug ?? slug),
        content: String(data.content ?? ""),
        createdAt: data.createdAt instanceof Date
            ? data.createdAt
            : data.createdAt?.toDate?.() ?? new Date(),
        updatedAt: data.updatedAt instanceof Date
            ? data.updatedAt
            : data.updatedAt?.toDate?.() ?? new Date(),
    };
}

export async function fetchAllSlugs(): Promise<string[]> {
    const snap = await adminDb.collection("blogs").select("slug").get();
    return snap.docs
        .map((doc) => {
            const data = doc.data() as FirebaseFirestore.DocumentData;
            return typeof data.slug === "string" && data.slug.length > 0
                ? data.slug
                : doc.id;
        })
        .filter(Boolean);
}