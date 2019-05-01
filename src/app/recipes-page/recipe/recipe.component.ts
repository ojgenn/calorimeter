import { Component, Input, OnInit } from '@angular/core';
import { SingleRecipeItem } from '../recipes.page.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {

  @Input() item: SingleRecipeItem;
  constructor() { }

  ngOnInit() {}

}
