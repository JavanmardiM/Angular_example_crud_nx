import { EmployeeListOpion, EmployeesListWithAttendances } from './../services/employee.service';
import { EmployeeService,  EmployeeList} from '../services/employee.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

export class EmployeeDatasource extends DataSource<EmployeeList> {
  private employeesSubject = new BehaviorSubject<EmployeeList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalCountSubject = new BehaviorSubject<number>(0);

  connect(
    collectionViewer: CollectionViewer
  ): Observable<EmployeeList[] | ReadonlyArray<EmployeeList>> {
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

  addEmployeeItem(employeeRecord: EmployeeList){
    const oldEmployeeList = this.employeesSubject.value;
    const newEmployeeList = [...oldEmployeeList,employeeRecord];
    this.employeesSubject.next(newEmployeeList);
  }

  updateEmployeeList(index , employeeRecord:EmployeeList){
    const oldEmployeeList = [...this.employeesSubject.value];
    oldEmployeeList[index] = employeeRecord;
    this.employeesSubject.next(oldEmployeeList);
  }

  getEmployeeIndexById(id: number): number {
    const employees = this.employeesSubject.value;
    return employees.findIndex(e => e.employeeId === id);
  }

  loadEmployees(option?: EmployeeListOpion) {
    this.loadingSubject.next(true);


    this.employeeService
      .sendRequest(option)
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
