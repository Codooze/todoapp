import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss',
})
export class LabsComponent {
  colorControl = new FormControl('red');

  get color() {
    return this.colorControl.value!;
  }

  set color(value: string) {
    this.colorControl.setValue(value);
  }

  resetColor() {
    this.color = 'red';
  }
}
