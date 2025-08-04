import {auth, db, storage} from "@/lib/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {Document, LinkItem} from "@/data/type";
import {deleteObject, ref} from "firebase/storage";
import {signInWithEmailAndPassword} from "firebase/auth";

export async function getLinks(document: Document): Promise<LinkItem[]> {
    const ref = doc(db, "links", document);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items ?? [] : [];
}

export async function saveLinks(document: Document, items: LinkItem[]): Promise<void> {
    const ref = doc(db, "links", document);
    await updateDoc(ref, { items });
}

export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split("/o/")[1].split("?")[0]); // e.g. sub-images/file.jpg
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
}

export async function loginWithEmail(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}