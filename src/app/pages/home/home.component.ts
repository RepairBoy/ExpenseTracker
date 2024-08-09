import { Component, ViewChild, ElementRef  } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { TableComponent } from "../../components/table/table.component";
import { ExpenseDataService } from '../../core/services/expense-data.service';
import { DatePipe, NgClass } from '@angular/common';
import { Expense } from '../../interfaces/expense';
import { NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFormComponent } from "../../components/input-form/input-form.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, TableComponent, DatePipe, ReactiveFormsModule, NgIf, DialogModule, InputFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: Expense[] = [];
  addIcon:string = "pi-plus";
  buttonlabel:string = "Add Expense";
  saveIcon:string = "pi-save";
  visible: boolean = false;

  constructor(private api: ExpenseDataService,) { }
  loginForm!:FormGroup

  ngOnInit() {
    this.api.getData().subscribe(data => {
      this.data = this.formatCreatedAt(data);
    });

    this.loginForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      amount:new FormControl('',[Validators.required]),
    })
  }

  formatCreatedAt(data: Expense[]): Expense[] {
    return data.map(item => {
      const createdAtDate = new Date(item.createdAt);
      const formattedDate = `${createdAtDate.getDate().toString().padStart(2, '0')}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getFullYear()}`;
      return { ...item, createdAt: formattedDate };
    });
  }

  onSubmit(){ 
    var formData = this.loginForm.value;
    const currentData = new Date().toISOString();
    const submitData:Expense = {
      amount: formData.amount,
      description: formData.description,
      name: formData.name,
      createdAt: currentData,
      id:0
    }
    this.api.addExpense(JSON.stringify(submitData)).subscribe(
      response => {console.log('Expense created successfully:', response);
      window.location.reload();
      },
      error => {
        console.error('Error creating expense:', error);
    });
    
  }
  showDialog() {
    this.visible = true;
  }
}
