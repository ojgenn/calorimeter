import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { SingleRecipeItem } from '../commons/interfaces/single-recipe-item.interface';
import { RecipesSegments } from '../commons/enums/recipes-segments.enum';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input() item: SingleRecipeItem;

  @Output() edit: EventEmitter<SingleRecipeItem> = new EventEmitter();
  @Output() delete: EventEmitter<SingleRecipeItem['id']> = new EventEmitter();
  @Output() show: EventEmitter<SingleRecipeItem> = new EventEmitter();

  @ViewChild('slidingItem') private _slidingItem;

  recipesSegments = RecipesSegments;
  constructor() { }

  ngOnInit() {}

  editItem(): void {
    this._slidingItem.close();
    this.edit.emit(this.item);
  }

  deleteItem(): void {
    this._slidingItem.close();
    this.delete.emit(this.item.id);
  }

  showItem(): void {
    this._slidingItem.close();
    this.show.emit(this.item);
  }

}
