import {  EmployeeService,  EmployeeListOpion,  EmptyEmployeeListOption,  EmployeeList,  SortOption,  Employee,} from './../services/employee.service';
import {  Component,  OnInit,  ViewChild,  ElementRef,  AfterViewInit,} from '@angular/core';
import {  MatPaginator,  MatSort,  MatDrawer,  MatPaginatorIntl} from '@angular/material';
import {  EmployeeDrawerService, DrawerEvent,} from '../services/employee-drawer.service';
import moment from 'moment-jalaali';
import { EmployeeDatasource } from './employees.datasource';

type ViewFlag =  | null  | 'edit'  | 'profile'  | 'register'  | 'enterconfirm'  | 'exitconfirm'  | 'absence'  | 'desc';

@Component({
  selector: 'angular-nx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  host : {
    'class' : 'angular-nx-attendance'
  }
})
export class AttendanceComponent implements OnInit, AfterViewInit {
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

  displayedColumns: string[] = ['number','employeeId','fullname','date','enterTime','exitTime', 'des','opration'  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
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
          else if(closedEvent.target=== 'editprofile' ||  'enterconfirm' || 'exitconfirm' || 'absenceconfirm') {
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

    this.getEmployees({ date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      search: this.input.nativeElement.value,
      sortOption: this.sortOpt,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });
  }

  ngAfterViewInit() {
    this.getEmployees({
      date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });
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

      this.getEmployees({
        date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
        search: this.input.nativeElement.value,
        sortOption: this.sortOpt,
        pageId:this.paginator.pageIndex,
        recordsPerPage : this.paginator.pageSize
      });
    }
  }

  getEmployees(option: EmployeeListOpion) {
    this.employeesDatasource.loadEmployees(option);
  }

  prevDate: string;
  onDateChange(newDate) {
    this.isToday = this.selectedDate === moment().format('jYYYY/jM/jDD') ? true : false;
    if (this.prevDate !== newDate) {
      this.prevDate = newDate;

      this.getEmployees({
        date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
        search: this.input.nativeElement.value,
        sortOption: this.sortOpt ,
        pageId:this.paginator.pageIndex,
        recordsPerPage : this.paginator.pageSize
      });
    }
  }

  gotoToday() {
    this.selectedDate = moment().format('jYYYY/jM/jDD');
  }

  onexitconfirm(obj: EmployeeList) {
    this.flag = 'exitconfirm';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }

  onenterconfirm(obj: EmployeeList) {
    this.flag = 'enterconfirm';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }
  onReg() {
    this.flag = 'register';
    this._drawer.toggle();
  }
  profile(obj: EmployeeList) {
    this.flag = 'profile';
    this._drawer.toggle();
    this.employeeID = obj.employeeId;
    this.selectedEmployee = obj;
  }
  onabsence(obj: EmployeeList) {
    this.flag = 'absence';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }
  desc(obj: EmployeeList) {
    this.flag = 'desc';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }

  flagChange(event: ViewFlag) {
    if (event === 'edit') {
      this.flag = 'edit';
    } else if (event === 'profile') {
      this.flag = 'profile';
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
      this.getEmployees({
        date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
        search: this.input.nativeElement.value,
        sortOption: this.sortOpt,
        pageId:this.paginator.pageIndex,
        recordsPerPage : this.paginator.pageSize
      });
    }
  }

  getNext(event){
    console.log(event);
    this.getEmployees({
      date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      search: this.input.nativeElement.value,
      sortOption: this.sortOpt ,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });

  }

  searchButton(){
    this.input.nativeElement.value='';
    this.getEmployees({
      date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      search: this.input.nativeElement.value,
      sortOption: this.sortOpt ,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    });
  }
}

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'آیتم در هر صفحه';
  nextPageLabel = 'صفحه بعد';
  previousPageLabel = 'صفحه قبل';

  getRangeLabel = function(page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 از ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' از ' + length;
  };
}
