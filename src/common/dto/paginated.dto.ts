
export class PaginatedDto<T> {
  items?: T[];
  totalPages?: number;
  page?: number;
  limit?: number;
}