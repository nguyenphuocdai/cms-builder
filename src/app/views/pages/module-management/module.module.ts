import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';
import { ModuleComponent } from './module.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent,
    ModuleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ModuleListComponent
  ]
})
export class ModuleModule { }
