import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { LinkItem } from "@/data/data";

export async function getMainLinks(): Promise<LinkItem[]> {
    const ref = doc(db, "links", "main");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items : [];
}