import { EmployeeService } from './../../service/employee.service';
import { Employee } from 'src/app/home/interface/employee';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit, OnDestroy {
  registerForm = this.fb.nonNullable.group({
    name: ['',[Validators.required]],
    cellphone: [0,[Validators.required]],
    etnia: ['',[Validators.required]],
    maritalstatus: ['',[Validators.required]]
  });

  listEtnia = ['Afro','Indigena','Blanco','Otro','Ningun@'];
  listMarital = ['Casado','Comprometido','Soltero','Viudo','Union Libre','Otro'];
  listObservables$ = Array<Subscription>();
  id: string;

  customOption = {
    name: 'Update',
    color: 'warning'
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly employeeSvc: EmployeeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public toastController: ToastController,

  ) { }

  ngOnDestroy(): void {
    this.listObservables$.forEach(e => e.unsubscribe());
    console.log('Unsubscription');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.customOption;
      this.onGet(this.id);
    }else{
      this.customOption.color = 'primary',
      this.customOption.name = 'Create'
    }
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
      if(this.id != null){
        const observer2$ = this.employeeSvc.updateEmployee(this.id,body)
        .subscribe(
          (async resOk=>{
            const toast = await this.toastController.create({
              message: 'Update exitosa.',
              duration: 2000,
              color: 'success'
            });
            toast.present();
            // setTimeout(() => {
            //   this.router.navigate(['admin/list']);
            // }, 2000);
            this.employeeSvc.getAllEmployees$()
            .subscribe(resListOk=>{
              setTimeout(() => {
                this.router.navigate(['admin/list']);
              }, 2000);
            })
          }),
          (async resFail=>{
            const toast = await this.toastController.create({
              message: 'Error .',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
            setTimeout(() => {
              //TODO: Redireccionamiento
            }, 2000);
          })
        );
        this.listObservables$ = [observer2$];
      }else{
        const observer$ = this.employeeSvc.createEmployee(body)
        .subscribe(
          (async resOk=>{
            const toast = await this.toastController.create({
              message: 'Create exitoso .',
              duration: 2000,
              color: 'success'
            });
            toast.present();
            setTimeout(() => {
              //TODO: Redireccionamiento
              this.router.navigate(['admin/list']);
            }, 2000);
          }),
          (async resFail=>{
            const toast = await this.toastController.create({
              message: 'Error.',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
            setTimeout(() => {
              //TODO: Redireccionamiento
            }, 2000);
          })
        )
        this.listObservables$ = [observer$];
      }
    }
  }

  onGet(id: string){
    const observer3$ = this.employeeSvc.getEmployee(id)
    .subscribe(
      (resOk=>{
        this.registerForm.setValue({
          name: resOk.name,
          cellphone: resOk.cellphone,
          etnia: resOk.etnia,
          maritalstatus: resOk.maritalstatus
        });
      })
    );
    this.listObservables$ = [observer3$];
  }

}
