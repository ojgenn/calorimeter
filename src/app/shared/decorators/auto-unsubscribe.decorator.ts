import { Subscription } from 'rxjs';

import { ObservableHandler } from '../models/observable-handler';

export function AutoUnsubscribe<T extends { new(...args: any[]): {} }>(constructor: T): void {
    const ngOnDestroy = constructor.prototype.ngOnDestroy;
    if (typeof ngOnDestroy !== 'function') {
        console.warn(`Класс ${constructor.name} не выполняет интерфейс OnDestroy, который требуется для поддержки @AutoUnsubscribe.`);
        return;
    }
    constructor.prototype.ngOnDestroy = function() {
        for (const property in this) {
            if (this.hasOwnProperty(property)) {
                const target: Subscription | ObservableHandler<any> = this[property];
                if (target && target instanceof Subscription && !target.closed) {
                    target.unsubscribe();
                }
                if (target && target instanceof ObservableHandler && !target['killed']) {
                    target.kill();
                }
            }
        }
        ngOnDestroy.apply(this, arguments);
    };
}
