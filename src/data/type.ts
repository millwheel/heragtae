export interface LinkItem {
    title: string;
    href: string;
    image: string;
}

export type LinkType = "main" | "sub";

export interface Blog {
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}