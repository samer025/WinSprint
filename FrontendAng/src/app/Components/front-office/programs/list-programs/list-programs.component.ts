import { Component, OnInit } from '@angular/core';
import { Program } from '../../../../Core/Models/program';
import { ProgramService } from '../../../../Core/Services/program.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list-programs.component.html',
  styleUrls: ['./list-programs.component.css'],
})
export class ListProgramsComponent implements OnInit {
  public programs!: Program[];
  public pagedPrograms!: Program[];
  public pageSize = 4;
  public currentPage = 0;

  constructor(private programService: ProgramService, private router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programService.getAllPrograms().subscribe({
      next: (params) => {
        this.programs = params;
        this.updatePage();
        console.log(this.programs);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedPrograms = this.programs.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.programs.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  protected readonly Array = Array;
}
