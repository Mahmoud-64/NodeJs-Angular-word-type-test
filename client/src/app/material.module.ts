import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DialogModule} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  exports: [
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DialogModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
