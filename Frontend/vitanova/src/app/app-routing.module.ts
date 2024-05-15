import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/Components/all-template-front/all-template-front.component';
import { StoryCComponent } from './FrontOffice/Components/story-c/story-c.component';
import { ChromeGameComponent } from './FrontOffice/Components/chrome-game/chrome-game.component';


const routes: Routes = [
 
  {
    path:"vitanova",
    component:AllTemplateFrontComponent
  },{
    path:"Story",
    component:StoryCComponent
  },{
    path:"game",
    component:ChromeGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
