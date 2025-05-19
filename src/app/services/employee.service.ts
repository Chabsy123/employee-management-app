import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse, Project } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string = "/api/EmployeeManagement";

  constructor(private http : HttpClient) { }

  createNewEmployee(obj:Employee){
    return this.http.post<Employee>(this.apiUrl + "/api/EmployeeManagement/CreateEmployee",obj)
  }
  updateEmployees(obj:Employee){
    return this.http.put<Employee[]>(this.apiUrl +`/api/EmployeeManagement/UpdateEmployee/${obj.employeeId}`,obj)
  }
  getEmployees(){
    return this.http.get<Employee[]>(this.apiUrl +"/api/EmployeeManagement/GetAllEmployees")
  }

  deleteEmpId(id:number){
    return this.http.delete<Employee>(this.apiUrl +`/api/EmployeeManagement/DeleteEmployee/${id}`);
}

createNewProject(obj:Project){
  return this.http.post<Project>(`${this.apiUrl}CreateProject`,obj)
}

getProjects(){
  return this.http.get<Project[]>(this.apiUrl + "GetAllProjects")
}

}

