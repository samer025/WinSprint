import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Core/Uset';
import { UserService } from 'src/app/Services/UserService.service';

@Component({
  selector: 'app-EditUser',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  userId !: number

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userService.getOneUser(this.userId).subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  updateUser(): void {
    this.userService.updateUserWithoutPass(this.user, this.userId).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/backOffice/users']);
      },
      error => {
        console.error(error);
        this.router.navigate(['/backOffice/users']);

      }
    );
  }

}
