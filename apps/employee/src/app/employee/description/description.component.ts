import { Component, OnInit, Input } from '@angular/core';
import { AttendanceList } from '../services/employee.service';

@Component({
  selector: 'angular-nx-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  host:{
    'class' :'angular-nx-description'
  }
})
export class DescriptionComponent implements OnInit {

  @Input() selectedEmployee : AttendanceList;
  desc:description;

  constructor() {}

  ngOnInit() {
    this.desc={
      descEnter : this.selectedEmployee.description[0],
      descExit : this.selectedEmployee.description[1],
      descAbsence : this.selectedEmployee.description[2]
    }
  }
}

interface description{
  descEnter : string,
  descExit : string,
  descAbsence : string,
}
