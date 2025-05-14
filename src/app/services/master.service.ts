import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IParentDept, IChildDept } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
    // Use the proxy path instead of the full URL
  private apiUrl = '/api/EmployeeManagement/GetParentDepartment';
  constructor(private http: HttpClient) {}
  getParentDept(): Observable<IApiResponse<IParentDept[]>> {
    return this.http.get<IApiResponse<IParentDept[]>>("/api/EmployeeManagement/GetParentDepartment");
  }
// basic api call function
getChildDeptByParentId(id: number): Observable<IApiResponse<IChildDept[]>> {
  return this.http.get<IApiResponse<IChildDept[]>>(`/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=${id}`);
}

}
