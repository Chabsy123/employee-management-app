import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse, Project, ProjectEmployee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl: string = "/api/EmployeeManagement/";

  constructor(private http : HttpClient) { }

  createNewEmployee(obj: Employee) {
    return this.http.post<Employee>(this.apiUrl + "CreateEmployee", obj);
  }

  updateEmployees(obj: Employee) {
    return this.http.put<Employee[]>(this.apiUrl + `UpdateEmployee/${obj.employeeId}`, obj);
  }

  getEmployees() {
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  deleteEmpId(id: number) {
    return this.http.delete<Employee>(this.apiUrl + `DeleteEmployee/${id}`);
  }

  createNewProject(obj: Project) {
    return this.http.post<Project>(this.apiUrl + "CreateProject", obj);
  }

  updateProject(obj: Project) {
    return this.http.put<Project>(this.apiUrl + `UpdateProject/${obj.projectId}`, obj);
  }

  getProjects() {
    return this.http.get<Project[]>(this.apiUrl + "GetAllProjects");
  }

  addNewProjectEmployee(obj: ProjectEmployee) {
    return this.http.post<ProjectEmployee>(this.apiUrl + "CreateProjectEmployee", obj);
  }

  GetProjectEmployee() {
    return this.http.get<ProjectEmployee[]>(this.apiUrl + "GetProjectEmployee/");
  }
}
