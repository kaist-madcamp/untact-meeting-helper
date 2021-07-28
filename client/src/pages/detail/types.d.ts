export interface PostType {
    images: string[];
    writer: WriterType;
    title: string;
    content: string;
}

export interface WriterType {
    _id: string;
    name: string;
}