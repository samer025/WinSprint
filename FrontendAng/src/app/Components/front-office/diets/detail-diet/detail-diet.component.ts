import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DietService } from '../../../../Core/Services/diet.service';
import { Diet } from '../../../../Core/Models/diet';

@Component({
  selector: 'app-detail-diet',
  templateUrl: './detail-diet.component.html',
  styleUrls: ['./detail-diet.component.css']
})
export class DetailDietComponent implements OnInit {
  public diet!: Diet;

  constructor(private route: ActivatedRoute, private dietService: DietService) {}

  ngOnInit(): void {
    const dietId = this.route.snapshot.params['id'];
    if (dietId) {
      this.dietService.getDietById(dietId).subscribe({
        next: (diet: Diet) => {
          this.diet = diet;
          console.log(this.diet);
        },
        error: (error) => {
          console.error('Error loading diet:', error);
        }
      });
    }
  }
}
