import { ModuleWithProviders, NgModule } from '@angular/core';

import { LocalStorageService } from './services/local-storage.service';

const SERVICES = [
  LocalStorageService,
];

@NgModule({
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule, providers: [SERVICES] };
  }

  // Создает инстансы синглтон сервисов, гарантируя их доступность сразу после инициализации модуля
  constructor(private _localStorageService: LocalStorageService) {}
}
