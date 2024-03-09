import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ITask } from '../../models/tasks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  updateTaskStatus(i: number, status: boolean) {
    this.tasks.update((tasks) =>
      tasks.map((task, index) =>
        index === i
          ? {
              ...task,
              completed: status,
            }
          : task
      )
    );
  }
  changeTask() {
    if (this.newTaskCtrl.valid) {
      this.addTask('New Task', this.newTaskCtrl.value);
      this.newTaskCtrl.reset();
    }
  }

  tasks = signal<ITask[]>([
    {
      title: 'Task 1',
      description: 'Description 1',
      isEditing: false,
      completed: false,
    },
    {
      title: 'Task 2',
      description: 'Description 2',
      isEditing: false,
      completed: false,
    },
    {
      title: 'Task 3',
      description: 'Description 3',
      isEditing: false,
      completed: false,
    },
  ]);

  addTask(title: string = 'Default Title', description: string) {
    this.tasks.update((tasks) => [
      ...tasks,
      {
        title,
        description,
        isEditing: false,
        completed: false,
      },
    ]);
  }

  removeTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  updateTask(index: number, title: string, description: string) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index
          ? {
              title,
              description,
              isEditing: task.isEditing,
              completed: task.completed,
            }
          : task
      )
    );
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^\S.*\S$/)],
  });
}
