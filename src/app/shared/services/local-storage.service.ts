import { Injectable } from '@angular/core';

import { safe } from '../utils';

@Injectable()
export class LocalStorageService {

    constructor() {
    }

    static getItem<T>(key: string): T | null {
        return safe(() => JSON.parse(window.localStorage.getItem(key))) as T || null;
    }

    /**
     * Сохраняет в LocalStorage значение {@link value} по ключу {@link key}.<br>
     *
     * @param key - ключ LocalStorage
     * @param value - любые JSON-сериализуемые данные
     * @param nullableOnError - если true, обнуляет (присваивает null) значение в случае ошибки при сохранении
     *
     * @return true, если сохранение прошло успешно, иначе false
     */
    static setItem<T>(key: string, value: T, nullableOnError: boolean = true): boolean {
        const valueJSON = safe(() => JSON.stringify(value));

        if (valueJSON === undefined) {
            console.error('Значение value не определено', { value, key });
            if (nullableOnError) {
                window.localStorage.setItem(key, 'null');
            }
            return false;
        }

        window.localStorage.setItem(key, valueJSON);
        return true;
    }

}
