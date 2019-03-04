import {
  EmployeeService,
  EmployeeListOpion,
  EmptyEmployeeListOption,
  EmployeeList,
  Sort
} from './../services/employee.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDrawer,
  MatPaginatorIntl
} from '@angular/material';
import {
  EmployeeDrawerService,
  DataService
} from '../services/employee-drawer.service';
import moment from 'moment-jalaali';
import { EmployeeDatasource } from './employees.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

type ViewFlag =
  | null
  | 'edit'
  | 'profile'
  | 'register'
  | 'enterconfirm'
  | 'exitconfirm'
  | 'absence'
  | 'desc';

@Component({
  selector: 'angular-nx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, AfterViewInit {
  @ViewChild('sidecontent')
  public set drawer(drawer: MatDrawer) {
    this._drawer = drawer;
  }
  public get drawer(): MatDrawer {
    return this._drawer;
  }

  columnName = 'employeeId';
  sortDir: string;

  private _drawer: MatDrawer;

  employeesDatasource: EmployeeDatasource;

  selectedDate: string = moment().format('jYYYY/jM/jDD');

  flag: ViewFlag = null;
  displayedColumns: string[] = [
    'number',
    'employeeId',
    'fullname',
    'date',
    'enterTime',
    'exitTime',
    'des',
    'opration'
  ];
  dataSource: MatTableDataSource<EmployeeList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  employeeListOption: EmployeeListOpion = EmptyEmployeeListOption;

  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
    private data: DataService
  ) {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.employeesDatasource = new EmployeeDatasource(this.employeeService);

    this.employeeDrawerService.drawerClosed().subscribe(closedEvent => {
      this._drawer.close();
      this.flag = null;
    });

    this.employeeDrawerService
      .drawerOpened()
      .subscribe(opendEvent => this._drawer.open());

    this.data.currentFlag.subscribe(flag => (this.flag = flag));

    const date = moment(this.selectedDate, 'jYYYY/jMM/jDD').format(
      'YYYY/MM/DD'
    );
    this.getEmployees({ date: date });
  }

  ngAfterViewInit() {
    const date = moment(this.selectedDate, 'jYYYY/jMM/jDD').format(
      'YYYY/MM/DD'
    );

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getEmployees({
            date: date,
            search: this.input.nativeElement.value
          });
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0),
      (this.sortDir = this.sort.direction)
    );

    // this.sortOption[this.columnName] = this.sortDir;
    // on sort or paginate events, load a new page
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     tap(() =>
    //       this.getEmployees({
    //         date: date,
    //         sortOption: this.sortOption
    //       })
    //     )
    //   )
    //   .subscribe(_ => {});

  }

  sortHeaderClick(headerName: string) {
    const date = moment(this.selectedDate, 'jYYYY/jMM/jDD').format(
      'YYYY/MM/DD'
    );


    if (headerName) {
      this.columnName = headerName;
      this.sortDir = this.sort.direction;

      this.sortDir =
        this.sort.direction === null || this.sort.direction === ''
          ? 'asc'
          : this.sort.direction;

          const sortOpt: Sort = {};
          sortOpt[this.columnName] = this.sortDir;

      this.getEmployees({
        date: date,
        sortOption: sortOpt
      });
    }
  }

  getEmployees(option: EmployeeListOpion) {
    // console.log(option);


    this.employeesDatasource.loadEmployees(option);

    // this.employeeService.sendRequest(option).subscribe(
    //   employees =>{
    //    // console.log(employees);
    //   //this.employeesDatasource = new EmployeeDatasource(employees);
    //    this.dataSource = new MatTableDataSource(employees);
    //   }
    // );
  }

  prevDate: string;
  onDateChange(newDate) {
    if (this.prevDate !== newDate) {
      // console.log(newDate);
      this.prevDate = newDate;

      const date = moment(newDate, 'jYYYY/jMM/jDD').format('YYYY/MM/DD');
      this.getEmployees({ date: date });
    }
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  //////---- html code for input --------///(keyup)="applyFilter($event.target.value)"

  gotoToday() {
    this.selectedDate = moment().format('jYYYY/jM/jDD');
  }

  onexitconfirm() {
    this.flag = 'exitconfirm';
    this._drawer.toggle();
  }

  onenterconfirm() {
    this.flag = 'enterconfirm';
    this._drawer.toggle();
  }
  onReg() {
    this.flag = 'register';
    this._drawer.toggle();
  }
  profile() {
    this.flag = 'profile';
    this._drawer.toggle();
  }
  onabsence() {
    this.flag = 'absence';
    this._drawer.toggle();
  }
  desc() {
    this.flag = 'desc';
    this._drawer.toggle();
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
