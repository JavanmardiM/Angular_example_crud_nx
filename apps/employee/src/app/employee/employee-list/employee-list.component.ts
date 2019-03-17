import { EmployeeList } from './../services/employee.service';
import  * as moment  from 'moment-jalaali';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AttendanceList, SortOption, ListOpion, EmptyEmployeeListOption, EmployeeService, Employee } from '../services/employee.service';
import { MatDrawer, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { EmployeeDrawerService, DrawerEvent } from '../services/employee-drawer.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeListDatasource } from './employee-list.datasource';

type ViewFlag =  | null  | 'edit'   | 'register' ;

@Component({
  selector: 'angular-nx-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
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
  employeesDatasource: EmployeeListDatasource;
  employeeID: number;
  selectedDate: string = moment().format('jYYYY/jM/jDD');
  sortOpt: SortOption
  employeeListOption: ListOpion = EmptyEmployeeListOption;
  flag: ViewFlag = null;
  selectedEmployee : AttendanceList;
  isToday :boolean;

  displayedColumns: string[] = ['number','employeeId','fullname', 'nationalCode' , 'mobileNumber' , 'address' ,'opration' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
    private router : Router,
    public dialog : MatDialog
  ) {}

  ngOnInit() {
    this.employeesDatasource = new EmployeeListDatasource(this.employeeService);

    let updatedEmployee ;
    let employeeIndex;

    this.employeeDrawerService.drawerClosed().subscribe(
      (closedEvent:DrawerEvent<any>) => {
        if(closedEvent.target==='register') {
          const registeredEmployee = closedEvent.getPayload<Employee>();

          this.employeesDatasource.addEmployeeItem({
            employeeId: parseInt(registeredEmployee.employeeId, 10),
            fullName: String(registeredEmployee.fullName),
            address: String(registeredEmployee.address),
            mobileNumber: String(registeredEmployee.mobileNumber),
            nationalCode: String(registeredEmployee.nationalCode)
          });
         }
          else if(closedEvent.target=== 'editprofile') {
          updatedEmployee = closedEvent.getPayload<Employee>();
          employeeIndex = this.employeesDatasource.getEmployeeIndexById(updatedEmployee.employeeId);
          this.employeesDatasource.updateEmployeeList(employeeIndex,updatedEmployee );
          }

        this._drawer.close();
        this.flag = null;
      }
    );

    this.employeeDrawerService.drawerOpened().subscribe(opendEvent => this._drawer.open());

      this.employeesDatasource.loadEmployeeList({
        searchedText: this.input.nativeElement.value,
        columnSortDirections: this.sortOpt,
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

      this.getEmployees();
    }
  }

  getEmployees() {
    this.employeesDatasource.loadEmployeeList({
      searchedText: this.input.nativeElement.value,
      columnSortDirections: this.sortOpt,
      pageId:this.paginator.pageIndex+1,
      recordsPerPage : this.paginator.pageSize,
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
  edit(obj: AttendanceList){
    this.flag = 'edit';
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
  archivedList(){
    this.router.navigate(['/archive']);
  }

  openDialog(employee : EmployeeList): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height : '250px',
      data: {selectedEmployee: employee.employeeId, dialogTitle:'تایید حذف کارمند', confirmButton:'حذف',contentMsg:`کارمند با شماره پرسنلی ${employee.employeeId} حذف شود؟`,dataSource:this.employeesDatasource},
      direction:'rtl'
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.employeeService.DeleteEmplyoee(employee.employeeId).subscribe();
      const index = this.employeesDatasource.getEmployeeIndexById(employee.employeeId);
      this.employeesDatasource.deleteEmployeeItem(index);
     }
    });
  }



}








