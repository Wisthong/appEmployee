import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/home/interface/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  listEmployee: Employee[] = [];
  listObservables$ = Array<Subscription>();
  constructor(
    private readonly employeeSvc: EmployeeService
  ) { }

  ngOnInit() {

    const observer1$ = this.employeeSvc.observerEmployee.subscribe(
      (resOk=>{
        this.listEmployee = resOk;
        console.log('Observer 1', resOk);
      })
    );

    const observer$ = this.employeeSvc.getAllEmployees$()
    .subscribe(
      (resOk=>{
//        this.listEmployee = resOk;
//        console.log(this.listEmployee);
      }),
      (resFail=>{
        console.log('Error en el servidor', resFail);
      })
    )
    this.listObservables$ = [observer$, observer1$];
  }

  ngOnDestroy(): void {
   this.listObservables$.forEach(e => e.unsubscribe());
   console.log('DesList');
  }

  onDelete(id: string): void{
    const observer2$ = this.employeeSvc.deleteEmployee(id)
    .subscribe(
      (resOk=>{
        const newArray = this.listEmployee.filter(m => m.id != id);
        this.listEmployee = [...newArray];
      }),
      (err=>{
        console.log('🔴🔴🔴');
      })
    )
    this.listObservables$ = [observer2$];
  }

  onGet(id: string): void{
    const observer3$ = this.employeeSvc.getEmployee(id)
    .subscribe(
      (resOk=>{
        const newArray = this.listEmployee.filter(m => m.id != id);
        this.listEmployee = [...newArray];
      }),
      (err=>{
        console.log('🔴🔴🔴');
      })
    )
    this.listObservables$ = [observer3$];
  }


}
