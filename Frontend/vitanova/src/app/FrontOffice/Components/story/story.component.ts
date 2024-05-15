import { Component } from '@angular/core';
import { StoryServiceService } from '../../Services/story-service.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../Models/post';
import { CommentService } from '../../Services/comment.service';
import { Story } from '../../Models/story';
import { MatDialog } from '@angular/material/dialog';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {

  id:any;
  allStories:any;
  storyData:any;
  showCreatePost: boolean = false;
  
  

  

  constructor(private storyservice:StoryServiceService,
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    
    
    

  ){

  }
  openStoryDialog(story: any) {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      width: 'auto',
      data: { story: story }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Add any logic to handle what happens after the dialog is closed
    });
  }


  ngOnInit() {
    this.getAllStories();
    
  
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


  
  getAllStories(){
    this.storyservice.getAllStories().subscribe(res=>{
      console.log(res);
      res.forEach((element: Story) => {
        
        this.allStories=res;
        
        
      });
      this.allStories=res;
      

      
    },error=>{
      this.snackBar.open("something went wrong !!","ok");

    })
  }



}
