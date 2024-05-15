import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: any = {
    content: '',
    postedBy: '',
    tags: [],
    images:[]
    
  };
  selectedFiles: File[] = [];
newTag!: string;
files: any = [];
  array_images:any=[];
  selectedFile!:File;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addTag(tag: string) {
    if (tag.trim() !== '') {
      this.post.tags.push(tag.trim());
    }
  }

  removeTag(tagIndex: number) {
    this.post.tags.splice(tagIndex, 1);
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
    if (this.selectedFile) {
      this.selectedFiles.push(this.selectedFile);
      console.log(this.selectedFile)
      console.log(this.selectedFiles);


      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        // Create an object with the file name and processed image
        const uploadedFile = {
          fileName: this.selectedFile.name,
          processedImg: fileContent // Directly use fileContent as base64 string
        };
        // Push the uploaded file object to the files array
        this.files.push(uploadedFile);
        
        // Clear the selected file
       // this.selectedFile = null;
      };
      // Read the selected file as base64 string
      reader.readAsDataURL(this.selectedFile);
      
    } else {
      console.error("No file selected for upload");
    }
  }

  createPost() {
    const formData = new FormData();
    formData.append('post', JSON.stringify(this.post));
    console.log(this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }

    console.log(this.files);
      
    this.http.post('http://localhost:8080/post/savePost', formData).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success, maybe show a success message
      },
      (error: any) => {
        console.error(error);
        // Handle error, maybe show an error message
      }
    );
  }
}