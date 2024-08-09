import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../ui/button/button.component";
import { ExpenseDataService } from '../../core/services/expense-data.service';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditExpense, Expense } from '../../interfaces/expense';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonComponent, ReactiveFormsModule, DialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() expenseData : any;
  cols!: any[];
  editIcon:string = "pi-pen-to-square";
  deleteIcon:string = "pi-trash";
  visible: boolean = false;
  editIdIndex!:number;

  descInputValue!:string
  nameInputValue!:string;
  amountInputValue!:string;

  constructor(private api: ExpenseDataService) {}
  loginForm!:FormGroup

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'amount', header: 'Amount' },
        { field: 'createdAt', header: 'Created On' }
    ];

    this.loginForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      amount:new FormControl('',[Validators.required]),
    })
  }

  deleteExpense(expenseId:number){
    console.log(expenseId);
    this.api.deleteExpense(expenseId).subscribe(
      response => {console.log('Expense created successfully:', response);
      alert(`Deleted expense with ID : ${expenseId}`)
      window.location.reload();
      },
      error => {
        console.error('Error creating expense:', error);
    }); 
  }

  showDialog(expenseData:any) {
    this.loginForm.get('name')?.setValue(expenseData.name);
    this.loginForm.get('description')?.setValue(expenseData.description);
    this.loginForm.get('amount')?.setValue(expenseData.amount);
    this.editIdIndex = expenseData.id;
    this.visible = true;
  }
  onSubmit(){
    var formData = this.loginForm.value;
    const submitData:EditExpense = {
        amount: formData.amount,
        description: formData.description,
        name: formData.name
    }  
    this.api.updateExpense(this.editIdIndex, JSON.stringify(submitData)).subscribe(
      response => {alert('Expense updated successfully:' + response);
      window.location.reload();
      },
      error => {
        console.error('Error creating expense:', error);
    });
}
}
