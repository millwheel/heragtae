import {auth, db, storage} from "@/lib/firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {LinkType, LinkItem, Blog} from "@/data/type";
import {deleteObject, ref} from "firebase/storage";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, User} from "firebase/auth";

export async function getLinks(linkType: LinkType): Promise<LinkItem[]> {
    const ref = doc(db, "links", linkType);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items ?? [] : [];
}

export async function saveLinks(linkType: LinkType, items: LinkItem[]): Promise<void> {
    const ref = doc(db, "links", linkType);
    await updateDoc(ref, { items });
}

export async function getBlogs(): Promise<Blog[]> {
    const colRef = collection(db, "blogs");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => doc.data() as Blog);
}

export async function getBlog(slug: string): Promise<Blog | null> {
    const docRef = doc(db, "blogs", slug);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as Blog) : null;
}

export async function saveBlog(blog: Blog): Promise<void> {
    const docRef = doc(db, "blogs", blog.slug);
    await setDoc(docRef, blog);
}

export async function deleteBlog(slug: string): Promise<void> {
    const docRef = doc(db, "blogs", slug);
    await deleteDoc(docRef);
}

export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split("/o/")[1].split("?")[0]); // e.g. sub-images/file.jpg
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
}

export async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export function observeAuthState(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

export async function logout() {
    await signOut(auth);
}