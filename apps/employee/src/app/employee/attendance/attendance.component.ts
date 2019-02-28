import { Component, OnInit, ViewChild } from '@angular/core';
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
import moment from'moment-jalaali';

export interface PeriodicElement {
  number: string;
  code: string;
  fullname: string;
  date: string;
  timein: string;
  timeout: string;
  des: string;
  opration: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    number: '1',
    code: 'alavi',
    fullname: '1.0079',
    date: 'H',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '2',
    code: 'mandegari',
    fullname: '1.0079',
    date: 'He',
    timein: 'H',
    timeout: 'H',
    des: 't',
    opration: 'H'
  },
  {
    number: '3',
    code: 'namvar',
    fullname: '1.0079',
    date: 'Li',
    timein: '4',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'soltani',
    fullname: '1.0079',
    date: '3',
    timein: 'H',
    timeout: 'H',
    des: 'a',
    opration: 'H'
  },
  {
    number: '3',
    code: 'akbari',
    fullname: '1.0079',
    date: '2',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '5',
    code: 'niazi',
    fullname: '1.0079',
    date: '1',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'eslami',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'sadeghi',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'falahi',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'ebrahumi',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  },
  {
    number: '3',
    code: 'y',
    fullname: '1.0079',
    date: 'Li',
    timein: 'H',
    timeout: 'H',
    des: 'H',
    opration: 'H'
  }
];

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
export class AttendanceComponent implements OnInit {
  @ViewChild('sidecontent')
  public set drawer(drawer: MatDrawer) {
    this._drawer = drawer;
  }
  public get drawer(): MatDrawer {
    return this._drawer;
  }

  private _drawer: MatDrawer;

  today:string=moment().format('jYYYY/jM/jDD');

  flag: ViewFlag = null;
  displayedColumns: string[] = [
    'number',
    'code',
    'fullname',
    'date',
    'timein',
    'timeout',
    'des',
    'opration'
  ];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeDrawerService: EmployeeDrawerService,
    private data: DataService
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.employeeDrawerService.drawerClosed().subscribe(closedEvent => {
      this._drawer.close();
      this.flag = null;
    });

    this.employeeDrawerService
      .drawerOpened()
      .subscribe(opendEvent => this._drawer.open());

    this.data.currentFlag.subscribe(flag => (this.flag = flag));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoToday(){
    this.today=moment().format('jYYYY/jM/jDD');
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
