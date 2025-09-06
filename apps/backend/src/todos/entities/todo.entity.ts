export class Todo {
  id!: number;
  title!: string;
  completed: boolean = false;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date | null;
  tags?: string[];
  createdAt!: Date;
  updatedAt!: Date;
}
