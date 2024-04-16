import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Core/Uset';
import { UserService } from 'src/app/Services/UserService.service';

@Component({
  selector: 'app-UserList',
  templateUrl: './UserList.component.html',
  styleUrls: ['./UserList.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  message !: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      response => {
        // Remove the deleted user from the users array
        
        // @ts-ignore
        this.users = this.users.filter(user => user.id !== id);
        this.message = response;
      },
      error => {  
        console.error(error);
        this.message = 'Error deleting user';
      }
    );
  }
  

}
