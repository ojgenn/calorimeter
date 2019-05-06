import { SingleRecipeItem } from '../../../recipes-page/commons/interfaces/single-recipe-item.interface';

export interface DailyCalorie {
    id: string;
    recipe: SingleRecipeItem;
    quantity: number;
}