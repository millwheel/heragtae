import { db } from "@/lib/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import type {LinkItem, Mode} from "@/data/type";

export async function getLinks(mode: Mode): Promise<LinkItem[]> {
    const ref = doc(db, "links", mode);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items ?? [] : [];
}

export async function saveLinks(mode: Mode, items: LinkItem[]): Promise<void> {
    const ref = doc(db, "links", mode);
    await updateDoc(ref, { items });
}