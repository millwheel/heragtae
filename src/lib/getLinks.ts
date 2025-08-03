import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { LinkItem } from "@/data/type";

export async function getMainLinks(): Promise<LinkItem[]> {
    const ref = doc(db, "links", "main");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items : [];
}

export async function getSubLinks(): Promise<LinkItem[]> {
    const ref = doc(db, "links", "sub");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items : [];
}