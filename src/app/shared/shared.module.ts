import { ModuleWithProviders, NgModule } from '@angular/core';

const SERVICES = [
];

@NgModule({
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule, providers: [SERVICES] };
  }

  // Создает инстансы синглтон сервисов, гарантируя их доступность сразу после инициализации модуля
  constructor() {}
}
