export interface LinkItem {
    title: string;
    href: string;
    image: string;
}

export type LinkType = "main" | "sub";

export interface Blog {
    title: string;
    content: string;
}