import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [  ReactiveFormsModule, DialogModule, InputFormComponent],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {
  visible: boolean = false;

}
