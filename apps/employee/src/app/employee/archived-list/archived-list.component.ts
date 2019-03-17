import { ArchivedEmployeeListDatasource } from './archived-list.datasource';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SortOption, EmptyEmployeeListOption, ListOpion, AttendanceList, EmployeeService, EmployeeList } from '../services/employee.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'angular-nx-archived-list',
  templateUrl: './archived-list.component.html',
  styleUrls: ['./archived-list.component.scss']
})
export class ArchivedListComponent  implements OnInit{


  columnName: string;
  sortDir: string;
  employeesDatasource: ArchivedEmployeeListDatasource;
  employeeID: number;
  sortOpt: SortOption
  employeeListOption: ListOpion = EmptyEmployeeListOption;
  selectedEmployee : AttendanceList;
  isToday :boolean;

  displayedColumns: string[] = ['number','employeeId','fullname', 'nationalCode' , 'mobileNumber' , 'address' ,'opration' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private employeeService: EmployeeService,
    private router : Router,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.employeesDatasource = new ArchivedEmployeeListDatasource(this.employeeService);

    this.employeesDatasource.loadArchivedEmployeeList(
      {
      searchedText: this.input.nativeElement.value,
      columnSortDirections: this.sortOpt,
      pageId:this.paginator.pageIndex,
      recordsPerPage : this.paginator.pageSize
    }
    );
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
    this.employeesDatasource.loadArchivedEmployeeList(
      {
      searchedText: this.input.nativeElement.value,
      columnSortDirections: this.sortOpt,
      pageId:this.paginator.pageIndex+1,
      recordsPerPage : this.paginator.pageSize
    }
    );
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
  back(){
    this.router.navigate(['/employeeList']);
  }

  openDialog(employee : EmployeeList): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height : '250px',
      data: {selectedEmployee: employee.employeeId, dialogTitle:'تایید بازیابی کارمند', confirmButton:'بازیابی',contentMsg:`کارمند با شماره پرسنلی ${employee.employeeId} بازیابی شود؟`},
      direction:'rtl'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.employeeService.recoverEmployee(employee.employeeId).subscribe();
        const index = this.employeesDatasource.getEmployeeIndexById(employee.employeeId);
        this.employeesDatasource.deleteEmployeeItem(index);
      }
    });
  }
}
