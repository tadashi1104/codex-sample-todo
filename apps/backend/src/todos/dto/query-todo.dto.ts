import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class QueryTodoDto {
  @IsOptional()
  @IsIn(['all', 'active', 'completed'])
  status?: 'all' | 'active' | 'completed';

  @IsOptional()
  @IsString()
  q?: string; // search keyword

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsDateString()
  before?: string; // dueDate before

  @IsOptional()
  @IsDateString()
  after?: string; // dueDate after

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'dueDate', 'title', 'priority'])
  sort?: 'createdAt' | 'updatedAt' | 'dueDate' | 'title' | 'priority';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}

