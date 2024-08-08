import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() expenseData : any;
  cols!: any[];
  editIcon:string = "pi-pen-to-square";
  deleteIcon:string = "pi-trash";
    constructor() {}

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'amount', header: 'Amount' },
            { field: 'createdAt', header: 'Created On' }
        ];
    }
}
