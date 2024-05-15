import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
onMessageOpen() {



  console.log("message works")
}


@Output() openComponent = new EventEmitter<string>();

openHome() {
  this.openComponent.emit('home');
}

openGames() {
  this.openComponent.emit('games');
}








}
