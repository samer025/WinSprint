import { FileEntity } from "./file-entity";

export class Story {


   id!:String;
   Content!:String;
   images!:FileEntity[] ;
   likes!:number;
   views!:number;
   date!:Date;
   postedBy!:String;
   tags!: string[];



}
