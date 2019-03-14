import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDrawer, MatPaginator, MatSort } from '@angular/material';
import { EmployeeDatasource } from '../attendance/employees.datasource';
import { SortOption, EmptyEmployeeListOption, EmployeeListOpion, EmployeeList, EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-nx-archived-list',
  templateUrl: './archived-list.component.html',
  styleUrls: ['./archived-list.component.scss']
})
export class ArchivedListComponent  implements OnInit, AfterViewInit {


  columnName: string;
  sortDir: string;
  employeesDatasource: EmployeeDatasource;
  employeeID: number;
  sortOpt: SortOption
  employeeListOption: EmployeeListOpion = EmptyEmployeeListOption;
  selectedEmployee : EmployeeList;
  isToday :boolean;

  displayedColumns: string[] = ['number','employeeId','fullname', 'nationalCode' , 'mobileNumber' , 'address' ,'opration' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private router : Router
  ) {}

  ngOnInit() {
    this.employeesDatasource = new EmployeeDatasource(this.employeeService);

    this.getEmployees();
  }

  ngAfterViewInit() {
    this.getEmployees();
  }

  sortHeaderClick(headerName: string) {
    if (headerName) {
      this.columnName = headerName;
      this.sortDir = this.sort.direction;

      this.sortDir =
        this.sort.direction === null || this.sort.direction === ''
          ? 'asc'
          : this.sort.direction;

      this.sortOpt = {};
      this.sortOpt[this.columnName] = this.sortDir;

      this.getEmployees();
    }
  }

  getEmployees() {
    this.employeesDatasource.loadEmployees({
     // date:(new Date()).toString(),
      search: this.input.nativeElement.value,
      sortOption: this.sortOpt,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });
  }
  search(event){
    if(event.keyCode === 13){
      this.getEmployees();
    }
  }
  getNext(event){
    this.getEmployees();

  }
  searchButton(){
    this.input.nativeElement.value='';
    this.getEmployees();
  }
  back(){
    this.router.navigate(['/employeeList']);
  }
}
