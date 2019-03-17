import { ListOpion, EmployeeList, EmployeeListViewModel } from '../services/employee.service';
import { EmployeeService} from '../services/employee.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

export class ArchivedEmployeeListDatasource extends DataSource<EmployeeList> {
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

  // addEmployeeItem(employeeRecord: EmployeeList){
  //   const oldEmployeeList = this.employeesSubject.value;
  //   const newEmployeeList = [...oldEmployeeList,employeeRecord];
  //   this.employeesSubject.next(newEmployeeList);
  // }

  // updateEmployeeList(index , employeeRecord:EmployeeList){
  //   const oldEmployeeList = [...this.employeesSubject.value];
  //   oldEmployeeList[index] = employeeRecord;
  //   this.employeesSubject.next(oldEmployeeList);
  // }

  deleteEmployeeItem(index: number) {
    const oldEmployeeList = this.employeesSubject.value;
    oldEmployeeList.splice(index, 1);
    this.employeesSubject.next(this.employeesSubject.value);
  }

  getEmployeeIndexById(id: number): number {
    const employees = this.employeesSubject.value;
    return employees.findIndex(e => e.employeeId === id);
  }

  loadArchivedEmployeeList(option?: ListOpion) {
    this.loadingSubject.next(true);

    this.employeeService
      .ArchivedEmployeeList(option)
      .pipe(
        delay(500),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(
        (employees : EmployeeListViewModel)=> {
          this.employeesSubject.next(employees.employeeList);
          this.totalCountSubject.next(employees.totalCount);
        },
        err => console.log(err),
        () => {}
      );
  }

}
