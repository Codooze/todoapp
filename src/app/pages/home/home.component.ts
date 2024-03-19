import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ITask, FilterOptions } from '../../models/tasks.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  tasks = signal<ITask[]>([]);

  //enum with the filter options all, pending, completed
  Filters = FilterOptions;
  currentFilter = signal(FilterOptions.all);

  tasksByFilter = computed(() => {
    const tasks = this.tasks();
    const filter = this.currentFilter();
    switch (filter) {
      case FilterOptions.all:
        return tasks;
      case FilterOptions.pending:
        return tasks.filter((task) => !task.completed);
      case FilterOptions.completed:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  changeFilter(filter: FilterOptions) {
    console.log('filter', filter);

    this.currentFilter.set(filter);
  }

  editTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              isEditing: true,
            }
          : {
              ...task,
              isEditing: false,
            }
      )
    );
  }
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

  // LocalStorage
  injector = inject(Injector);

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
      },
      { injector: this.injector }
    );
  }
}
