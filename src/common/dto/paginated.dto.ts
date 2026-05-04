
export class PaginatedDto<T> {
  items?: T[];
  total?: number;
  page?: number;
  limit?: number;
}