import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SpotifyComponent } from '../spotify/spotify.component';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {



  showForm: boolean = false; // Initially hide the form

  toggleForm() {
    this.showForm = !this.showForm; // Toggle the visibility of the form
  }
  onTrackSelected(data: {trackName: string, artistName: string}) {
    this.story.trackName = data.trackName;
    this.story.artistName = data.artistName;
    console.log("createStory "+this.story.trackName);
    console.log("createStory "+this.story.artistName);
  }




  ngOnInit(): void {
  }

  
  story: any = {
    content: '',
    storyedBy: '',
    tags: [],
    trackName: '', // Add trackName property to store the track name
    artistName: '', // Add artistName property to store the artist name
    
  };

  

  
  selectedFiles: File[] = [];
  newTag!: string;
  files: any = [];
  array_images:any=[];
  selectedFile!:File;

 

  constructor(private http: HttpClient) { }


  addTag(tag: string) {
    if (tag.trim() !== '') {
      this.story.tags.push(tag.trim());
    }
  }

  removeTag(tagIndex: number) {
    this.story.tags.splice(tagIndex, 1);
  }


  

  createstory() {
    const formData = new FormData();
    formData.append('story', JSON.stringify(this.story));
    formData.append('trackName', this.story.trackName); // Append track name
    console.log(this.story.trackName);
    formData.append('artistName', this.story.artistName); // Append artist name
    console.log(  this.story.artistName);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
    console.log(formData)
      
    this.http.post('http://localhost:8080/story/saveStory', formData).subscribe(
      (response: any) => {
        console.log(response);
        
        // Handle success, maybe show a success message
              // Reset form fields and selected files
      this.story = {}; // Clear story object
      this.story.trackName='';
      this.story.artistName='';
      this.selectedFiles = []; // Clear selectedFiles array
      },
      (error: any) => {
        console.error(error);
        // Handle error, maybe show an error message
      }
    );
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
    if (this.selectedFile) {
      this.selectedFiles.push(this.selectedFile);
      console.log(this.selectedFile)
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

  
  

}
