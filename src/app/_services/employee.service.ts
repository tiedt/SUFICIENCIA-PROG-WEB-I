import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employees } from "../_modules/employees.model";
import { Employee } from "../_modules/employee.model";
import { CreateEmployee } from "../_modules/createEmployee.model";


@Injectable()
export class EmployeesService {
    baseUrl = 'http://dummy.restapiexample.com/api/v1';
    employees: Employees[];
    constructor(private http: HttpClient) {

    }

    getAllEmployees(): Observable<Employees[]> {
        var get = 'employees';
        return this.http.get<Employees[]>(`${this.baseUrl}/${get}`);
    }
    getEmployeeById(id: string): Observable<Employees>{
        var get = 'employees';
        return this.http.get<Employees>(`${this.baseUrl}/${get}/${id}`);
      }
      postEmployee(employee: CreateEmployee) {
        var url = 'create';
        return this.http.post(`${this.baseUrl}/${url}`, employee);
      }
      putEmployee(employee: Employee) {
        var url = 'update';
        return this.http.put(`${this.baseUrl}/${url}/${employee.id}`, employee);
      }
      deleteEmployee(id: number) {
        var url = 'delete';
        return this.http.delete(`${this.baseUrl}/${url}/${id}`);
      }
}