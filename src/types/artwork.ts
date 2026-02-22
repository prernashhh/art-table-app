// src/types/artwork.ts

export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string | null;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
}

export interface ApiResponse {
  pagination: Pagination;
  data: Artwork[];
}
