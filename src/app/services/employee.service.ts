import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

  createNewEmployee(obj:Employee){
    return this.http.post<Employee>("/api/EmployeeManagement/CreateEmployee",obj)
  }
  updateEmployees(obj:Employee){
    return this.http.put<Employee[]>(`/api/EmployeeManagement/UpdateEmployee/${obj.employeeId}`,obj)
  }
  getEmployees(){
    return this.http.get<Employee[]>("/api/EmployeeManagement/GetAllEmployees")
  }

  deleteEmpId(id:number){
    return this.http.delete<Employee>(`/api/EmployeeManagement/DeleteEmployee/${id}`);


  }
}

