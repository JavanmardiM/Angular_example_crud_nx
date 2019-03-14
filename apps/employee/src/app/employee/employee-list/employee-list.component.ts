import  * as moment  from 'moment-jalaali';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeList, SortOption, EmployeeListOpion, EmptyEmployeeListOption, EmployeeService, Employee } from '../services/employee.service';
import { MatDrawer, MatPaginator, MatSort } from '@angular/material';
import { EmployeeDatasource } from '../attendance/employees.datasource';
import { EmployeeDrawerService, DrawerEvent } from '../services/employee-drawer.service';
import { Router } from '@angular/router';

type ViewFlag =  | null  | 'edit'   | 'register' ;

@Component({
  selector: 'angular-nx-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild('sidecontent')
  public set drawer(drawer: MatDrawer) {
    this._drawer = drawer;
  }
  public get drawer(): MatDrawer {
    return this._drawer;
  }
  private _drawer: MatDrawer;

  columnName: string;
  sortDir: string;
  employeesDatasource: EmployeeDatasource;
  employeeID: number;
  selectedDate: string = moment().format('jYYYY/jM/jDD');
  sortOpt: SortOption
  employeeListOption: EmployeeListOpion = EmptyEmployeeListOption;
  flag: ViewFlag = null;
  selectedEmployee : EmployeeList;
  isToday :boolean;

  displayedColumns: string[] = ['number','employeeId','fullname', 'nationalCode' , 'mobileNumber' , 'address' ,'opration' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
    private router : Router
  ) {}

  ngOnInit() {
    this.employeesDatasource = new EmployeeDatasource(this.employeeService);

    let updatedEmployee ;
    let employeeIndex;

    this.employeeDrawerService.drawerClosed().subscribe(
      (closedEvent:DrawerEvent<any>) => {
        if(closedEvent.target==='register') {
          const registeredEmployee = closedEvent.getPayload<Employee>();

          this.employeesDatasource.addEmployeeItem({
            date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
            employeeId: parseInt(registeredEmployee.employeeId, 10),
            description:['','',''],
            enterTime: null,
            exitTime: null,
            fullName: String(registeredEmployee.fullName),
            isAbsence: false
          });
         }
          else if(closedEvent.target=== 'editprofile') {
          updatedEmployee = closedEvent.getPayload<EmployeeList>();
          employeeIndex = this.employeesDatasource.getEmployeeIndexById(updatedEmployee.employeeId);
          this.employeesDatasource.updateEmployeeList(employeeIndex,updatedEmployee );
          }

        this._drawer.close();
        this.flag = null;
      }
    );

    this.employeeDrawerService
      .drawerOpened()
      .subscribe(opendEvent => this._drawer.open());

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
     date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      search: this.input.nativeElement.value,
      sortOption: this.sortOpt,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });
  }

  prevDate: string;
  onDateChange(newDate) {
    this.isToday = this.selectedDate === moment().format('jYYYY/jM/jDD') ? true : false;
    if (this.prevDate !== newDate) {
      this.prevDate = newDate;

      this.getEmployees();
    }
  }

  gotoToday() {
   this.selectedDate = moment().format('jYYYY/jM/jDD');
  }
  onReg() {
    this.flag = 'register';
    this._drawer.toggle();
  }
  edit(obj: EmployeeList){
    this.flag = 'edit';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }
  flagChange(event: ViewFlag) {
    if (event === 'edit') {
      this.flag = 'edit';
    }
  }
  cancel() {
    this._drawer.close();
    this.flag = null;
  }
  closedStart(){
    this.flag=null;
  }
  search(event){
    if(event.keyCode === 13){
      this.getEmployees();
    }
  }
  getNext(event){
    console.log(event);
    this.getEmployees();

  }
  searchButton(){
    this.input.nativeElement.value='';
    this.getEmployees();
  }
  archivedList(){
    this.router.navigate(['/archive']);
  }

}


