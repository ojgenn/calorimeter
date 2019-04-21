import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

export interface ActionRequestData<T> {
    condition?: (action?: ActionRequestInterface) => boolean;
    method: (action?: ActionRequestInterface) => Observable<T>;
    onSuccess: (action?: ActionRequestInterface, res?: T) => Action;
    onError: (action?: ActionRequestInterface, error?: any) => Observable<Action>;
}

export interface ActionRequestInterface<T = any> {
    readonly request: ActionRequestData<T>;
}
