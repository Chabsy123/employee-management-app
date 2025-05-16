import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{


  parentDeptList: IParentDept[] =[];

  childDeptList: IChildDept []=[];
  deptId: number = 0;

  employeeObj: Employee = new Employee();
  employeeList: Employee[]=[];
  masterService = inject(MasterService);
  empService = inject(EmployeeService);

  

  ngOnInit(): void{
    this.getParentDeptList();
    this.getEmployees();
  }

  onEdit(obj:Employee){
    this.employeeObj = obj;
  }

  getEmployees(){
    this.empService.getEmployees().subscribe((res:Employee[])=>{
    this.employeeList = res;
    })
  }
  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:IApiResponse)=>{
    this.parentDeptList = res.data;
    })
  }
  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res:IApiResponse)=>{
      this.childDeptList = res.data;
    })
  }

  onSaveEmp(){
    debugger;
    this.empService.createNewEmployee(this.employeeObj).subscribe((res:Employee)=> {
      debugger;
   alert("Employee Creation Success")
    }, error=>{
      alert('Error From API')
    })
  }

  onUpdateEmp(){
    this.empService.updateEmployees(this.employeeObj).subscribe(()=>{
      debugger;
   alert("Employee Update Success")
    }, error=>{
      alert('Error From API')
    })
  }

  onDelete(id:number){
    const result = confirm("Are you sure you want to delete");
    if(result) {
      this.empService.deleteEmpId(id).subscribe((res:Employee)=> {
      debugger;
      alert("Employee Deletion Success")
      this.getEmployees();
    }, error=>{
      alert('Error From API')
    })
  }

  }
}
