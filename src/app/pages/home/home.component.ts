import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ITask } from '../../models/tasks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  tasks = signal<ITask[]>([
    { title: 'Task 1', description: 'Description 1' },
    { title: 'Task 2', description: 'Description 2' },
    { title: 'Task 3', description: 'Description 3' },
  ]);

  addTask(title: string = 'Default Title', description: string) {
    this.tasks.update((tasks) => [...tasks, { title, description }]);
  }

  removeTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
}
