import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  foods:Food[] = []

  constructor(private foodService:FoodService,private activatedRoute:ActivatedRoute){
   let foodsObservable:Observable<Food[]>;
    this.activatedRoute.params.subscribe((params:any)=>{
      console.log(params,'params');

      if(params.searchTerm){
        console.log(this.foodService.getAllFoodsBySearchTerm(params.searchTerm));
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm)
      }else if(params.tag){
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag)
      }
      else{
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((res:any)=>{
        this.foods = res
      })
    })
  }
  ngOnInit(): void {}

}
