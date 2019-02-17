import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://192.168.1.249:8080/api';

@Injectable()
export class EmployeeService {

    constructor(
        private http: HttpClient
    ){}

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${API_URL}/Register`);
    }

    registerEmployee(employee: Employee): Observable<any> {
        return this.http.post(`${API_URL}/Register`, employee);
    }

    getUsers(): Observable<any> {
        return this.http.get(`https://reqres.in/api/users?page=2`)
    }

    createUser(): Observable<any> {
        return this.http.post('https://reqres.in/api/users', {
            "name": "mousavi",
            "job": "programmer"
        });
    }
}

export interface Employee {
    ID:number;
    username: string;
    fullname: string;
    nationalCode: string;
    phoneNumber: string;
    address?: string;
}

// private employees: Employee[] = EMPLOYEES;

// public register(employee: Employee): boolean {
//     if(this.employees.some(e => e.username === employee.username)) {
//         return false;
//     } else {
//         this.employees.push(employee);
//         return true;
//     }
// }

// const EMPLOYEES: Employee[] = [
//     { username: 'Employee1', fullname: 'Employee 1', nationalCode: '1', phoneNumber: '1', address: 'Address 1' },
//     { username: 'test', fullname: 'Employee 1', nationalCode: '1', phoneNumber: '1', address: 'Address 1' },
//     { username: 'Employee2', fullname: 'Employee 2', nationalCode: '2', phoneNumber: '2', address: 'Address 2' },
//     { username: 'Employee3', fullname: 'Employee 3', nationalCode: '3', phoneNumber: '3', address: 'Address 3' },
//     { username: 'Employee4', fullname: 'Employee 4', nationalCode: '4', phoneNumber: '4', address: 'Address 4' },
//     { username: 'Employee5', fullname: 'Employee 5', nationalCode: '5', phoneNumber: '5', address: 'Address 5' },
//     { username: 'Employee6', fullname: 'Employee 6', nationalCode: '6', phoneNumber: '6', address: 'Address 6' }
// ];

