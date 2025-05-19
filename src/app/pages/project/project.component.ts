// import { ProjectEmployees } from './../../model/Employee';
import { AsyncPipe, DatePipe, NgFor, NgIf, } from '@angular/common';

import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { Employee, Project, ProjectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { ProjectEmployeesComponent } from '../project-employees/project-employees.component';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projectEmployee: ProjectEmployee = new ProjectEmployee();

  @ViewChild("myModal")employeeModal: ElementRef | undefined;
  currentView: string = "List";

  projectForm: FormGroup = new FormGroup({});
  ProjectEmployees: ProjectEmployeesComponent = new ProjectEmployeesComponent();

  employeeService = inject(EmployeeService);
  // sync pipe to directly subscribe into an HTML using an observable
  projectList: Project[] =[];
  projectEmployeeList: ProjectEmployee[] =[];
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employeeData$ = this.employeeService.getEmployees();
  }

  ngOnInit(): void {
    this.getAllProject();
  }

  onAddEmployees(id: number){
    this.getAllProjectEmployee(id);
    this.ProjectEmployees.projectId = id;
    if(this.employeeModal){
this.employeeModal.nativeElement.style.display = "block";
    }
  }
  closeModal(){
    if(this.employeeModal){
    this.employeeModal.nativeElement.style.display = "none";
    }
  }

  onEdit(projectData: Project){

     this.initializeForm(projectData)
  }
// create reactive form separately to bind to the form
  initializeForm(project?: Project){
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId:0),
      projectName: new FormControl(project ? project.projectName:""),
      clientName: new FormControl(project ? project.clientName:""),
      startDate: new FormControl(project ? project.startDate:""),
      leadByEmpId: new FormControl(project ? project.leadEmpById:""),
      contactPerson: new FormControl(project ? project.contactPerson:""),
      contactNo:new FormControl(project ? project.contatNo:""),
      emailId: new FormControl(project ? project.emailId:""),
    });
    this.currentView = "Create"
  }

  //  onAddEmp(){
  //   this.employeeService.addNewProjectEmployee(this.ProjectEmployees).subscribe((res:ProjectEmployee)=>{
  //     debugger;
  //     alert("Employee Added to Project");
  //     this.getAllProject(this.ProjectEmployees.projectId );
  //   },error=>{


  //   })
  //  }
  onAddEmp(){
    this.employeeService.addNewProjectEmployee(this.projectEmployee).subscribe((res: ProjectEmployee) => {
      alert("Employee Added to Project");
      this.getAllProject(); // Or getAllProjectEmployee(this.projectEmployee.projectId) if that was the intent
    }, error => {
      console.error("Failed to add employee to project", error);
    });
  }

  onSaveProject(){
    const formValue = this.projectForm.value;
    if(formValue.projectId == 0){
    this.employeeService.createNewProject(formValue).subscribe((res:Project)=>{
      debugger;
   alert("Project Created Successfully");
   this.getAllProject();
    },error=>{
    alert("Project Creation Failed")
    })
  } else {
    this.employeeService.updateProject(formValue).subscribe((res:Project)=>{
      debugger;
      alert("Project Update Successfully");
      this.getAllProject();
       },error=>{
       alert("Project Update Failed")

    })
  }
  }
  getAllProjectEmployee(id: number){
 this.employeeService.GetProjectEmployee().subscribe((res:ProjectEmployee[])=>{
      debugger;
      debugger;
      const record = res.filter(m=>m.projectId == id);
      this.projectEmployeeList = record;
    },error=>{

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


