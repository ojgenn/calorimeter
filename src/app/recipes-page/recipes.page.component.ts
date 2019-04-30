import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';

export enum RecipesSegments {
    Products,
    Sport,
}

@Component({
    selector: 'app-recipes-page',
    templateUrl: 'recipes.page.component.html',
    styleUrls: ['recipes.page.component.scss'],
})

export class RecipesPageComponent {
    recipesSegments = {
        [RecipesSegments.Products]: 'PAGES.RECIPES.SEGMENTS.PRODUCTS',
        [RecipesSegments.Sport]: 'PAGES.RECIPES.SEGMENTS.SPORT',
    };
    segments = RecipesSegments;
    activeSegment: RecipesSegments = RecipesSegments.Products;

    constructor(public _modalController: ModalController) {}

    segmentChanged(ev: any) {
        this.activeSegment = ev;
    }

    async presentModal() {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: RecipesModalComponent,
            componentProps: { activeSegment: this.activeSegment }
        });
        return await modal.present();
    }
}
