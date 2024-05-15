import { Comment } from "./comment";
import { FileEntity } from "./file-entity";

export class Post {
    
        id!: string;
        content!: string;
        postedBy!: string;
        date!: Date;
        likeCount!: number;
        viewCount!: number;
        tags!: string[];
        images!:FileEntity[] ;
        comments!: Comment[];

    

}
