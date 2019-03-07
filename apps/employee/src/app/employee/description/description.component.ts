import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-nx-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  host:{
    'class' :'angular-nx-description'
  }
})
export class DescriptionComponent implements OnInit {

  @Input() description:string[];
  desc:description;

  constructor() {}

  ngOnInit() {
    this.desc={
      descEnter : this.description[0],
      descExit : this.description[1],
      descAbsence : this.description[2]
    }
  }
}

interface description{
  descEnter : string,
  descExit : string,
  descAbsence : string,
}
