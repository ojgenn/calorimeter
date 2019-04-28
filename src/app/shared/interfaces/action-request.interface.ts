import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

export interface ActionRequestData<T> {
    condition?: (action?: ActionRequest) => boolean;
    method: (action?: ActionRequest) => Observable<T>;
    onSuccess: (action?: ActionRequest, res?: T) => Action;
    onError: (action?: ActionRequest, error?: any) => Observable<Action>;
}

export interface ActionRequest<T = any> {
    readonly request: ActionRequestData<T>;
}
