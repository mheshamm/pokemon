import { EntityId, EntityState } from "@reduxjs/toolkit";

export interface Pagination {
  count: number;
  next?: string | null;
  previous?: string | null;
}

export interface PaginationResponse<T> extends Pagination {
  results: T[];
}

export interface PaginationPayload {
  limit?: number;
  offset?: number;
}

export interface EntityWithCount<T, key extends EntityId> {
  data: EntityState<T, key>;
  count : number
}
