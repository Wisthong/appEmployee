import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/home/interface/employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Output() eventDelete = new EventEmitter<string>();
  @Input() listEmployee: Employee[] = [];

  constructor(
    private readonly router: Router
  ) { }

  onDelete(item: Employee){
    this.eventDelete.emit(item.id);
  }

  onGet(item: Employee){
    this.router.navigate(['admin/form/'+item.id])
  }

}
