import { Employee } from './../../home/interface/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API = environment.api;



  constructor(
    private readonly http: HttpClient
  ) { }

  //TODO: get All Employees
  getAllEmployees$(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.API+'/employees');
  }

  // //TODO: get All Employees
  // getAllEmployees$(): Observable<Employee[]>{
  //   return this.http.get<Employee[]>(this.API+'/employees')
  //   .pipe(
  //     map((resOk)=>{
  //       return resOk;
  //     })
  //   );
  // }

  deleteEmployee(id: string): Observable<string>{
    return this.http.delete<string>(this.API+'/employees/'+id);
  }

  //TODO: Create employees
  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.API+'/employees/',employee);
  }

  //TODO: Update employee
  updateEmployee(id:string ,employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(this.API+'/employees/'+id,employee);
  }

  //TODO: Get only employee
  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>(this.API+'/employees/'+id);
  }

}
