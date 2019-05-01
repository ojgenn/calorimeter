import { RecipesSegments } from '../enums/recipes-segments.enum';

export interface SingleRecipeItem {
    id: string;
    type: RecipesSegments;
    name: string;
    calories: number;
}
