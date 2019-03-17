import { ListOpion, EmployeesListWithAttendances } from '../services/employee.service';
import { EmployeeService,  AttendanceList} from '../services/employee.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

export class AttendanceDatasource extends DataSource<AttendanceList> {
  private employeesSubject = new BehaviorSubject<AttendanceList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalCountSubject = new BehaviorSubject<number>(0);

  connect(
    collectionViewer: CollectionViewer
  ): Observable<AttendanceList[] | ReadonlyArray<AttendanceList>> {
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
  }

  public get loading$() : Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
  public get totalCount$() : Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  constructor(private employeeService: EmployeeService) {
    super();
  }

  addEmployeeItem(employeeRecord: AttendanceList){
    const oldEmployeeList = this.employeesSubject.value;
    const newEmployeeList = [...oldEmployeeList,employeeRecord];
    this.employeesSubject.next(newEmployeeList);
  }

  updateEmployeeList(index , employeeRecord:AttendanceList){
    const oldEmployeeList = [...this.employeesSubject.value];
    oldEmployeeList[index] = employeeRecord;
    this.employeesSubject.next(oldEmployeeList);
  }

  getEmployeeIndexById(id: number): number {
    const employees = this.employeesSubject.value;
    return employees.findIndex(e => e.employeeId === id);
  }

  loadEmployeesAttendanceList(option?: ListOpion) {
    this.loadingSubject.next(true);
    this.employeeService
      .AttendanceList(option)
      .pipe(
        delay(500),//if using table loader spinner
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(
        (employees : EmployeesListWithAttendances)=> {
          this.employeesSubject.next(employees.employeesListWithAttendances);
          this.totalCountSubject.next(employees.totalCount);
        },
        err => console.log(err),
        () => {}
      );
  }

}
