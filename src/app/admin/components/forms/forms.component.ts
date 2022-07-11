import { EmployeeService } from './../../service/employee.service';
import { Employee } from 'src/app/home/interface/employee';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  registerForm = this.fb.nonNullable.group({
    name: ['',[Validators.required]],
    cellphone: [0,[Validators.required]],
    etnia: ['',[Validators.required]],
    maritalstatus: ['',[Validators.required]]
  });

  listEtnia = ['Afro','Indigena','Blanco','Otro','Ningun@'];
  listMarital = ['Casado','Comprometido','Soltero','Viudo','Union Libre','Otro'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly employeeSvc: EmployeeService,
    private readonly router: Router,
  ) { }

  ngOnInit() {

  }

  //TODO: Subscripcion al Suject List, y destruir,
  //TODO: Para luego subcribir en list

  onRegister(){
    if(this.registerForm.valid){
      const body: Employee = {
        name: this.registerForm.controls.name.getRawValue(),
        cellphone: this.registerForm.controls.cellphone.getRawValue(),
        etnia: this.registerForm.controls.etnia.getRawValue(),
        maritalstatus: this.registerForm.controls.maritalstatus.getRawValue(),
      }
      this.employeeSvc.createEmployee(body)
      .subscribe(res=>{
        console.log(res);
      })
    }
  }

}
