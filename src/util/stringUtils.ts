export function excerpt(text: string, max = 200): string {
    const flat = (text ?? "").replace(/\s+/g, " ").trim();
    return flat.length > max ? flat.slice(0, max) + "…" : flat;
}