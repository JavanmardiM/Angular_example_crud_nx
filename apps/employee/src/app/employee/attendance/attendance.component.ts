import {  EmployeeService,  ListOpion,  EmptyEmployeeListOption,  AttendanceList,  SortOption,  Employee,} from './../services/employee.service';
import {  Component,  OnInit,  ViewChild,  ElementRef,  AfterViewInit,} from '@angular/core';
import {  MatPaginator,  MatSort,  MatDrawer,  MatPaginatorIntl} from '@angular/material';
import {  EmployeeDrawerService, DrawerEvent,} from '../services/employee-drawer.service';
import moment from 'moment-jalaali';
import { AttendanceDatasource } from './attendance.datasource';

type ViewFlag =  | null  | 'edit'  | 'profile'  | 'enterconfirm'  | 'exitconfirm'  | 'absence'  | 'desc';

@Component({
  selector: 'angular-nx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  host : {
    'class' : 'angular-nx-attendance'
  }
})
export class AttendanceComponent implements OnInit {

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
  employeesDatasource: AttendanceDatasource;
  employeeID: number;
  selectedDate: string = moment().format('jYYYY/jM/jDD');
  sortOpt: SortOption
  employeeListOption: ListOpion = EmptyEmployeeListOption;
  flag: ViewFlag = null;
  selectedEmployee : AttendanceList;
  isToday :boolean;
  showArchived : boolean = false;

  displayedColumns: string[] = ['number','employeeId','fullname','date','enterTime','exitTime', 'des','opration'  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
  ) {}

  ngOnInit() {
    this.employeesDatasource = new AttendanceDatasource(this.employeeService);

    let updatedEmployee ;
    let employeeIndex;

    this.employeeDrawerService.drawerClosed().subscribe(
      (closedEvent:DrawerEvent<any>) => {
       if(closedEvent.target === 'enterconfirm' || closedEvent.target ===  'exitconfirm' || closedEvent.target ===  'absenceconfirm') {
          updatedEmployee = closedEvent.getPayload<AttendanceList>();
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
    this.employeesDatasource.loadEmployeesAttendanceList({
      date: moment(this.selectedDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
      searchedText: this.input.nativeElement.value,
      columnSortDirections: this.sortOpt,
      pageId:this.paginator.pageIndex+1,
      recordsPerPage : this.paginator.pageSize,
      displayArchivedEmployees : this.showArchived
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

  onexitconfirm(obj: AttendanceList) {
    this.flag = 'exitconfirm';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }

  onenterconfirm(obj: AttendanceList) {
    this.flag = 'enterconfirm';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }
  profile(obj: AttendanceList) {
    this.flag = 'profile';
    this._drawer.toggle();
    this.employeeID = obj.employeeId;
    this.selectedEmployee = obj;
  }
  onabsence(obj: AttendanceList) {
    this.flag = 'absence';
    this._drawer.toggle();
    this.selectedEmployee = obj;
  }
  desc(obj: AttendanceList) {
    this.flag = 'desc';
    this._drawer.toggle();
    this.selectedEmployee = obj;
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

  NextPage(event){
    this.getEmployees();

  }

  searchButton(){
    this.input.nativeElement.value='';
    this.getEmployees();
  }

  checkboxChange(event){
    this.showArchived = event.checked;
    this.getEmployees();
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

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' از ' + length;
  };
}
