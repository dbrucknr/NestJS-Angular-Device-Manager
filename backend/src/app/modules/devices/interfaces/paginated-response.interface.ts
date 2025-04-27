// Should also get moved to a 'global' or 'shared' directory once
// used in multiple modules
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
