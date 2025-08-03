import { db } from "@/lib/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {Document, LinkItem} from "@/data/type";

export async function getLinks(document: Document): Promise<LinkItem[]> {
    const ref = doc(db, "links", document);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items ?? [] : [];
}

export async function saveLinks(document: Document, items: LinkItem[]): Promise<void> {
    const ref = doc(db, "links", document);
    await updateDoc(ref, { items });
}