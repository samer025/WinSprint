import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../Services/comment.service';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  allPosts:any;
  postData:any;
  showCreatePost: boolean = false;
  commentForm!:FormGroup;
  comments:any;
  

  

  constructor(private postservice:PostService,
    private snackBar:MatSnackBar,
    
    private matSnackBar: MatSnackBar,
    private fb:FormBuilder,
    private commentservice:CommentService
    

  ){

  }


  

  ngOnInit() {
    this.getAllPosts();
    
    
    
     
    this.commentForm=this.fb.group({
      postedBy:['',Validators.required],
      content:['',Validators.required]
    })
  }

  showComments: boolean = false;

  toggleComments(item: any) {
      // Toggle the value of showComments for the clicked post
      this.showComments = !this.showComments;
      
  }


  
 


  decodeBase64(base64String: string): string {
    const binaryString = window.atob(base64String);
    const byteNumbers = new Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteNumbers[i] = binaryString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }

 


  publishComment(postId:string) {
    
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;
  
    
  
    this.commentservice.createComment(postId,postedBy,content).subscribe(
      res => {
        this.matSnackBar.open("Comment published successfully !!", "OK");
        this.getCommentByPost(postId);
        this.commentForm.reset();
      },
      error => {
        this.matSnackBar.open("Something went wrong !!", "OK");
      }
    );
  }





  getCommentByPost(postId:string){
    this.commentservice.getAllCommentsByPost(postId).subscribe(res=>{
      this.comments=res;
    },error=>{
      this.matSnackBar.open("Something went Wrong !!!","OK");

    })
  }



  getPostById(postId:string){
    this.postservice.getPostById(postId).subscribe(res=>{
      this.postData=res;
      console.log(res);
      this.getCommentByPost(postId);
    },error=>{
      this.matSnackBar.open("Something went Wrong !!!","OK");
    })
  }
  likePost(postId:string){
    this.postservice.likePost(postId).subscribe((response)=>{
      this.matSnackBar.open("Post liked succesfully !!","ok");
      //this.getPostById(postId);
      this.getAllPosts();

    },(error)=>{
      this.matSnackBar.open("Something went wrong !!","ok");
    })
  }

  deletePost(postId:string){
    this.postservice.deletePost(postId).subscribe(res=>{
      this.snackBar.open("post deleted succsfully !","ok");
      this.getAllPosts();
    },(error)=>{
      this.snackBar.open("something went wrong !!","ok");
    })
  }


  getAllPosts(){
    this.postservice.getAllPosts().subscribe(res=>{
      console.log(res);
      res.forEach((element: Post) => {
        
        this.allPosts=res;
        this.getCommentByPost(element.id);
      });

      
      

     
      

      
    },error=>{
      this.snackBar.open("something went wrong !!","ok");

    })
  }




}
