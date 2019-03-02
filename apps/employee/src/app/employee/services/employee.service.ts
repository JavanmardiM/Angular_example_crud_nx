import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//  const API_URL ='http://192.168.1.155';
const API_URL ='http://localhost:8080';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {}

  sendRequest(option?: EmployeeListOpion): Observable<Employee[]> {
    option = option || NullEmployeeListOption;
    return this.http.post<Employee[]>(`${API_URL}/list`, option);
  }

  registerEmployee(employee: Employee): Observable<any> {

    // this.getEmployees().subscribe(employees => console.log(employees));

      return this.http.post(`${API_URL}/postEmployee`, employee);
  }


}

export interface Employee {
  fullName: string;
  nationalCode: number;
  mobileNumber: string;
  address: string;
}

export interface EmployeeListOpion {
date?: string;
search?: string;
sortOption?: Map<string, SortDirection>;
}

const NullEmployeeListOption: EmployeeListOpion = {
date: null,
search: null,
sortOption: new Map<string, SortDirection>()
}

export enum SortDirection {
ASC, DESC
}
