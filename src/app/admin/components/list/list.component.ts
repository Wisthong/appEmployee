import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/home/interface/employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() eventDelete = new EventEmitter<string>();
  @Input() listEmployee: Employee[] = [];

  constructor() { }

  ngOnInit() {}

  onDelete(item: Employee){
    this.eventDelete.emit(item.id);
  }

}
