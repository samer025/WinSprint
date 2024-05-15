import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffice/Components/all-template-front/all-template-front.component';
import { NavbarComponent } from './FrontOffice/Components/navbar/navbar.component';
import { SidebarComponent } from './FrontOffice/Components/sidebar/sidebar.component';
import { RightSideBarComponent } from './FrontOffice/Components/right-side-bar/right-side-bar.component';
import { PostComponent } from './FrontOffice/Components/post/post.component';
import { StoryComponent } from './FrontOffice/Components/story/story.component';
import { AdComponent } from './FrontOffice/Components/ad/ad.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './AngularMaterialModule';
import { CreatePostComponent } from './FrontOffice/Components/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './FrontOffice/Components/comment/comment.component';
import { CreateStoryComponent } from './FrontOffice/Components/create-story/create-story.component';
import { StoryCComponent } from './FrontOffice/Components/story-c/story-c.component';
import { SpotifyComponent } from './FrontOffice/Components/spotify/spotify.component';
import { StoryDialogComponent } from './FrontOffice/Components/story-dialog/story-dialog.component';
import { ChromeGameComponent } from './FrontOffice/Components/chrome-game/chrome-game.component';
import { HomeComponent } from './FrontOffice/Components/home/home.component';
import { AdminComponent } from './BackOffice/Components/admin/admin.component';
import { AllTemplateBackComponent } from './BackOffice/Components/all-template-back/all-template-back.component';



@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    NavbarComponent,
    SidebarComponent,
    RightSideBarComponent,
    PostComponent,
    StoryComponent,
    AdComponent,
    CreatePostComponent,
    CommentComponent,
    CreateStoryComponent,
    StoryCComponent,
    SpotifyComponent,
    StoryDialogComponent,
    ChromeGameComponent,
    HomeComponent,
    AdminComponent,
    AllTemplateBackComponent,
    
    
    
    
    
    
    
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
    
  
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
