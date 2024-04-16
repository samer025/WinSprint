import { Component, OnInit } from '@angular/core';
import { Program } from '../../../../Core/Models/program';
import { ProgramService } from '../../../../Core/Services/program.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import Swal from 'sweetalert2';

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
    handler:any = null;

  constructor(private programService: ProgramService, private router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
      this.loadStripe();
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
  /*
  generatePDF() {
    pdfMake.createPdf(this.getDocDefinition()).download();
  }



  private getDocDefinition() {
    const programs = this.loadPrograms();
    return {
      content: [
        { text: 'Voici mon PDF',
         },

      ]
    };
  }
*/
    /***************************************************STRIPE*************************************************************/
// Function to initiate the payment process
    pay(amount: any, id: any) {
        // Configure the Stripe Checkout handler
        var handler = (<any>window).StripeCheckout.configure({
            // Set your publishable API key
            key: 'pk_test_51P4t61P5puV1s7cyaLv77BIRfA2Ejpax5p2E53vJGVqS9co6WAPnWEk2Une7jhfIl5qCoO1i9Wz55LwlRuAHJIXz00v348G3P0',
            // Set the locale to 'auto' (let Stripe determine the locale)
            locale: 'auto',
            // Callback function executed when payment is successful
            token: (token: any) => { // Using arrow function
                // Display a success message using Swal (SweetAlert)
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Payment Success!!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Navigate to the program page
                this.router.navigate(['/frontOffice/programs/program', id]);
            }
        });

        // Open the payment pop-up
        handler.open({
            name: 'Demo Site', // Name of the site or business
            description: '2 widgets', // Description of the payment
            amount: amount * 100 // Amount of the payment (converted to cents)
        });

    }

    loadStripe() {
        // Check if the Stripe.js script has already been loaded
        if(!window.document.getElementById('stripe-script')) {
            // If not loaded, create a new <script> element
            var s = window.document.createElement("script");
            s.id = "stripe-script"; // Set the id of the script element
            s.type = "text/javascript"; // Set the type of the script element
            // Set the source URL to load the Stripe.js library from the Stripe CDN
            s.src = "https://checkout.stripe.com/checkout.js";
            // Assign an onload callback function
            s.onload = () => {
                // Configure the Stripe Checkout handler
                this.handler = (<any>window).StripeCheckout.configure({
                    // Set your publishable API key
                    key: 'pk_test_51P4t61P5puV1s7cyaLv77BIRfA2Ejpax5p2E53vJGVqS9co6WAPnWEk2Une7jhfIl5qCoO1i9Wz55LwlRuAHJIXz00v348G3P0',
                    // Set the locale to 'auto' (let Stripe determine the locale)
                    locale: 'auto',
                    // Callback function executed when payment is successful
                    token: function (token: any) {
                        // Display a success alert message
                        alert('Payment Success!!');
                    }
                });
            }
            // Append the <script> element to the <body> of the document
            window.document.body.appendChild(s);
        }
    }
}
