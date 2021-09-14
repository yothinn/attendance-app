import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { FormbaseService } from 'src/app/shared/components/formbase/formbase.service';

const routes: Routes = [
  {
    path:'',
    component:AttendanceComponent,
    resolve: [FormbaseService]

  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AttendanceRoutingModule { }
