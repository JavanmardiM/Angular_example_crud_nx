import { EmployeeListOpion } from './../services/employee.service';
import { SortDirection } from '@angular/material';
import {
  EmployeeService,
  Employee,
  EmployeeList
} from '../services/employee.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

export class EmployeeDatasource extends DataSource<EmployeeList> {
  private employeesSubject = new BehaviorSubject<EmployeeList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

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

  constructor(private employeeService: EmployeeService) {
    super();
  }

  //loadEmployees(date?: string, search?: string, sort?: Map<string, SortDirection>) {
  loadEmployees(option?: EmployeeListOpion) {
    this.loadingSubject.next(true);

    // this.employeeService.getEmployees(
    //   date || null,
    //   search || null,
    //   sort || sort
    // )

    this.employeeService
      .sendRequest(option)
      .pipe(
        //delay(500),//if using table loader spinner
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        employees => this.employeesSubject.next(employees),
        err => console.log(err),
        () => {}
      );
  }
}
