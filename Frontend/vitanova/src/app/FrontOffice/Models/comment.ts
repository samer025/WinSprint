import { Post } from "./post";

export class Comment {
    id_comment!: string;
    content!: string;
    createdAt!: Date;
    postedBy!: string;
    post!: Post | null;
}
