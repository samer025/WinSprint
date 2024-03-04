import { Component } from '@angular/core';
import {Program} from "../../../../Core/Models/program";
import {ProgramService} from "../../../../Core/Services/program.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-detail-program',
  templateUrl: './detail-program.component.html',
  styleUrls: ['./detail-program.component.css']
})
export class DetailProgramComponent {
  program!: Program;

  constructor(private programServ: ProgramService,private router: Router,  private currentRoute: ActivatedRoute)
  { }

  ngOnInit(): void {
    if (this.currentRoute.snapshot.params['id']) {
      let id = this.currentRoute.snapshot.params['id'];
      this.programServ.getProgramById(id).subscribe({
        next: (program: Program) => {
          this.program = program;
          console.log(this.program)

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
