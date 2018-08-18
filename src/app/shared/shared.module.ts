// tslint:disable-next-line:no-any
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const SHARED_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgbDatepickerModule,
];

// tslint:disable-next-line:no-any
const SHARED_COMPONENTS: any[] = [];

// tslint:disable-next-line:no-any
const SHARED_ENTRY_COMPONENTS: any[] = [];

/**
 * The shared module is used to hold all reusable components across the app's
 * different modules. It imports and exports reusable modules to make them
 * readily available to other feature modules just by importing the shared
 * module, avoiding repetition. Since the shared module is meant to be imported
 * by all feature-modules, it shouldn't provide any service.
 */
@NgModule({
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS,
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    /** Add components here if necessary */
  ],
  entryComponents: [
    ...SHARED_ENTRY_COMPONENTS,
  ],
  /** Do not provide services here, do it in core.module */
})
export class SharedModule {}
