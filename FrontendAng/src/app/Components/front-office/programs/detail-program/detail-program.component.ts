import {Component, OnInit} from '@angular/core';
import {Program} from "../../../../Core/Models/program";
import {ProgramService} from "../../../../Core/Services/program.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import * as pdfMake from "pdfmake/build/pdfmake";
import jsPDF from 'jspdf';
import {Exercise} from "../../../../Core/Models/exercice";

@Component({
  selector: 'app-detail-program',
  templateUrl: './detail-program.component.html',
  styleUrls: ['./detail-program.component.css']
})
export class DetailProgramComponent implements OnInit{
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
  generatePDF() {
    pdfMake.createPdf(this.getDocDefinition()).download();
  }



  private getDocDefinition() {
    const body = this.programServ.getAllPrograms();

    return {
      content: [
        { text: 'Voici le programme',



        }
      ]
    };
  }
  event: any = {};
   // Optional image URL property
  showPDF(event: any) {
    const doc = new jsPDF();
    const addImageToPDF = (image: string, x: number, y: number, width: number, height: number) => {
      const img = new Image(); // Create a new image element
      img.src = image; // Set the image source

      img.onload = () => {
        doc.addImage(img, 'JPEG', x, y, width, height); // Add image to PDF
      };

      img.onerror = (err) => {
        console.error('Error loading image:', err); // Handle image loading errors gracefully
      };
    };
    const exerciseListHtml = event.exercises.reduce((acc:String,exercise:Exercise) => {
      return  acc+`<li style="margin-bottom: 10px;">${exercise.nom} (${exercise.type} type x ${exercise.description} as description))</li>`;
    }, '');
 const content = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; background: linear-gradient(to bottom, #ffffff, #dcdcdc);">
    <h1 style="color: #007bff; font-size: 24px;">${event.title}</h1>
    <hr style="border: none; border-top: 1px solid #007bff; margin: 10px auto; width: 50%;">
    <p style="margin-bottom: 20px; text-align: left;">${event.description}</p>
      <div>
        <h1 style="color: #007bff; font-size: 12px;">Program Type:</h1>
        <span>${event.programType}</span>
      </div>
      <div>
        <h1>Exercises:</h1>
        <ul>
          ${exerciseListHtml}
            ${event.exercises.map((exercise:Exercise) => {
   if (exercise.image.length) { // Check if exercise has an image URL
     const imageWidth = 50; // Adjust image width as needed
     const imageHeight = 50; // Adjust image height as needed
     const imageX = 50;
     const imageY = 50;
     addImageToPDF(exercise.image, imageX, imageY, imageWidth, imageHeight);
   }
   return ''; // Return empty string to not duplicate content
 })}
        </ul>
      </div>

  </div>
    `;
    doc.html(content, {
      callback: (doc) => {
        doc.save( 'file.pdf');
      },
      html2canvas: { scale: 0.47 },
      x: 10,
      y: 50,
      width: doc.internal.pageSize.getWidth(),
    });
  }
}
