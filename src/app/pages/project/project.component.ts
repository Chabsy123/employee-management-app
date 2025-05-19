import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  currentView: string = "List";

  projectForm: FormGroup = new FormGroup({});

  employeeService = inject(EmployeeService);
  // sync pipe to directly subscribe into an HTML using an observable
  projectList: Project[] =[];
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employeeData$ = this.employeeService.getEmployees();
  }

  ngOnInit(): void {
    this.getAllProject();
  }
// create reactive form separately to bind to the form
  initializeForm(){
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(""),
      clientName: new FormControl(""),
      startDate: new FormControl(""),
      leadByEmpId: new FormControl(""),
      contactPerson: new FormControl(""),
      contactNo:new FormControl(""),
      emailId: new FormControl(""),
    })
  }

  onSaveProject(){
    const formValue = this.projectForm.value;
    debugger;
    this.employeeService.createNewProject(formValue).subscribe((res:Project)=>{
      debugger;
   alert("Project Created Successfully")
    },error=>{
    alert("Project Creation Failed")
    })
  }

  getAllProject(){

    this.employeeService.getProjects().subscribe((res:Project[])=>{
      debugger;
      this.projectList = res;

   alert("Project Created Successfully")
    },error=>{

    })
  }
}


