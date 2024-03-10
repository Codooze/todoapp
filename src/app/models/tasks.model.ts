export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  isEditing: boolean;
}

export enum FilterOptions {
  all = 'All',
  pending = 'Pending',
  completed = 'Completed',
}
