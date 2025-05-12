import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginObj: any = {
    "userName": "",
    "password": ""
  };
  //template form to bind to the form above
   http = inject(HttpClient);
   router = inject(Router)

  //  constructor(private http: HttpClient){
// this is the old method and the new method using inject is above
  //  }
  onLogin(){
    console.log("Login button clicked");
    debugger;
     this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        localStorage.setItem('employeeApp', JSON.stringify(res.data));
        // whatever data you get from the API, get the data, store it and if it is successful it redirects to the dashboard
        this.router.navigateByUrl('dashboard');
    } else {
      alert(res.message)
    }
     })

  }
  // sending objects and using any because we havent created any class or interface we will use
}
