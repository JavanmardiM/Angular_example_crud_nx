import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

export const EmptyEmployeeListOption: ListOpion = {
  date: null,
  searchedText: null,
  columnSortDirections: {}
};

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  AttendanceList(option?: ListOpion): Observable<EmployeesListWithAttendances> {
    option = option || EmptyEmployeeListOption;
    return this.http.post<EmployeesListWithAttendances>(`${API_URL}/list`, option);
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

  employeeAbsence(emploeeID: number, gateOption: GateOption): Observable<number> {
    return this.http.post<number>(`${API_URL}/api/Employee/${emploeeID}/Absence`, gateOption );
  }

  EmployeeList(option?: ListOpion): Observable<EmployeeListViewModel> {
    option = option || EmptyEmployeeListOption;
    return this.http.post<EmployeeListViewModel>(`${API_URL}/api/Employee/EmployeesList`, option);
  }

  ArchivedEmployeeList(option?: ListOpion): Observable<EmployeeListViewModel> {
    option = option || EmptyEmployeeListOption;
    return this.http.post<EmployeeListViewModel>(`${API_URL}/api/Employee/ArchivedEmployeesList`, option);
  }

  DeleteEmplyoee(emploeeID: number): Observable<number> {
    return this.http.delete<number>(`${API_URL}/api/Employee/Delete/?employeeId=${emploeeID}`);
  }

  recoverEmployee(employeeId: number): Observable<any> {
    return this.http.put<number>(`${API_URL}/api/Employee/Recover/?employeeId=${employeeId}`, null);
  }
}

export interface Employee {
  fullName: string;
  nationalCode: number;
  mobileNumber: string;
  address: string;
  employeeId?: string;
}
export interface AttendanceList {
  employeeId: number;
  fullName: string;
  date: string;
  enterTime: string;
  exitTime: string;
  description: string[];
  isAbsence: boolean;
  isDeleted?:boolean;
}
export interface EmployeesListWithAttendances {
  employeesListWithAttendances: AttendanceList[];
  totalCount: number;
}

export interface EmployeeListViewModel {
  employeeList: EmployeeList[];
  totalCount: number;
}

export interface EmployeeList {
  employeeId: number;
  fullName: string;
  nationalCode: string;
  mobileNumber: string;
  address: string;
  archiveOrRecoverDate?: string;
}

export interface SortOption {
  [key: string]: string;
}

export interface ListOpion {
  date?: string;
  searchedText?: string;
  columnSortDirections?: SortOption;
  pageId?: number;
  recordsPerPage?: number;
  displayArchivedEmployees? :boolean;
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
  description?: string;
}
