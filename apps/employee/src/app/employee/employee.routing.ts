import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ArchivedListComponent } from './archived-list/archived-list.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'attendance'
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'employeeList',
        component: EmployeeListComponent
      },
      {
        path: 'archive',
        component: ArchivedListComponent
      }
    ]
  }
];
