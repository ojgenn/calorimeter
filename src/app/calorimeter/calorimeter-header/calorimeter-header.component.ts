import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import { ObservableHandler } from '../../shared/models/observable-handler';
import { CalorimeterService } from '../services/calorimeter.service';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { AutoUnsubscribe } from '../../shared/decorators';
import { map } from 'rxjs/operators';
import { consumption } from '../../reducer';

@AutoUnsubscribe
@Component({
    selector: 'app-calorimeter-header',
    templateUrl: './calorimeter-header.component.html',
    styleUrls: ['./calorimeter-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalorimeterHeaderComponent implements OnInit, OnDestroy {

    private _calorimeterSum$$ = new ObservableHandler(
        combineLatest([
            this._calorimeterService.calorimeterSum.observable,
            this._store.select(consumption),
        ])
            .pipe(
                map(([sum, cons]) => ({ sum, cons })),
            ),
        this._prepareSum.bind(this),
        this._cdr,
    );

    foodSum = 0;
    activitySum = 0;
    consumption = 0;

    calorimeterPurpose = CalorimeterPurpose;

    constructor(private _calorimeterService: CalorimeterService,
                private _cdr: ChangeDetectorRef,
                private _store: Store<any>) { }

    ngOnInit() {}

    private _prepareSum(data) {
        if (data.sum) {
            this.foodSum =
                data.sum[CalorimeterPurpose.Breakfast] + data.sum[CalorimeterPurpose.Lunch] + data.sum[CalorimeterPurpose.Dinner];
            this.activitySum = data.sum[CalorimeterPurpose.Activity];
        }
        if (data.cons) {
            this.consumption = Math.round(Number(data.cons));
        }
    }

    ngOnDestroy(): void {}

}
