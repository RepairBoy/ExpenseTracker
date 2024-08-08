import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { TableComponent } from "../../components/table/table.component";
import { ExpenseDataService } from '../../core/services/expense-data.service';
import { DatePipe } from '@angular/common';
import { Expense } from '../../interfaces/expense';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, TableComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: Expense[] = [];
  addIcon:string = "pi-plus";
  buttonlabel:string = "Add Expense"
  constructor(private api: ExpenseDataService,) { }

  ngOnInit() {
    this.api.getData().subscribe(data => {
      this.data = this.formatCreatedAt(data);
    });
  }

  formatCreatedAt(data: Expense[]): Expense[] {
    return data.map(item => {
      const createdAtDate = new Date(item.createdAt);
      const formattedDate = `${createdAtDate.getDate().toString().padStart(2, '0')}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getFullYear()}`;
      return { ...item, createdAt: formattedDate };
    });
  }
}
