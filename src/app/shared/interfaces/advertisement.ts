export interface Advertisement {
    id?: string | null;
    title?: string | undefined;
    price?: number | undefined;
    imageUrl?: string | undefined;
    address?: string | undefined;
    type?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    authorId?: string | undefined;
    favorites?: {[key: string]: boolean } | undefined;
}


