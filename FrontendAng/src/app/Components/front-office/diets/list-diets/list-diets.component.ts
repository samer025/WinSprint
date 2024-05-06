import { Component, OnInit } from '@angular/core';
import {DietService} from "../../../../Core/Services/diet.service";
import {Diet} from "../../../../Core/Models/diet";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-diets',
  templateUrl: './list-diets.component.html',
  styleUrls: ['./list-diets.component.css']
})
export class ListDietsComponent implements OnInit {
  public diets!: Diet[];
  public pagedDiets!: Diet[];
  public pageSize = 4;
  public currentPage = 0;
    handler:any = null;




  constructor(private dietService: DietService,private router:Router) { }

  ngOnInit(): void {
    this.loadDiets();
    this.loadStripe();

  }

  loadDiets() {
    this.dietService.getAllDiets().subscribe({
      next: (diets) => {
        this.diets = diets;
        this.updatePage();
        console.log(this.diets);
      },
      error: (error) => {
        console.log('Error loading diets:', error);
      }
    });
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedDiets = this.diets.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.diets.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  protected readonly Array = Array;

      // Append the <script> element to the <body> of the document
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
        this.router.navigate(['/frontOffice/diets/detail', id]);
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
