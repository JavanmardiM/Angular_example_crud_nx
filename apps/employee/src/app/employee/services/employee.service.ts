import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

//  const API_URL ='http://192.168.1.155';
const API_URL = 'http://localhost:8080';

export const EmptyEmployeeListOption: EmployeeListOpion = {
  date: null,
  search: null,
  sortOption: {}
};

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  sendRequest(option?: EmployeeListOpion): Observable<EmployeeList[]> {
    option = option || EmptyEmployeeListOption;
    return this.http.post<EmployeeList[]>(`${API_URL}/list`, option);
  }

  registerEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${API_URL}/postEmployee`, employee);
  }

  viewEmploee(emploeeID: number): Observable<any> {
    return this.http.get<EmploeeProfile>(`${API_URL}/GetEmployee/${emploeeID}`);
  }

  editEmployeeInfo(employee: EmploeeProfile, emploeeID: number): Observable<any> {
    return this.http.put<number>(`${API_URL}/Edit/${emploeeID}`, employee);
  }

  employeeEnter(emploeeID: number, gateOption: GateOption): Observable<number> {
    return this.http.post<number>(`${API_URL}/api/Employee/${emploeeID}/Enter`, gateOption);
  }

  employeeExit(emploeeID: number, gateOption: GateOption): Observable<number> {
    return this.http.post<number>(`${API_URL}/api/Employee/${emploeeID}/Exit`, gateOption);
  }
}

export interface Employee {
  fullName: string;
  nationalCode: number;
  mobileNumber: string;
  address: string;
}
export interface EmployeeList {
  employeeId: number;
  fullName: string;
  date: string;
  enterTime: string;
  exitTime: string;
  description: string[];
  isAbsence: boolean;
}

export interface Sort {
  [key: string]: string;
}

export interface EmployeeListOpion {
  date?: string;
  search?: string;
  sortOption?: Sort;
}

export interface EmploeeProfile {
  employeeId: number;
  fullName: string;
  nationalCode: string;
  mobileNumber: string;
  address: string;
}

export interface GateOption {
  employeeId: number;
  fullName?: string;
  description?: string;
}
