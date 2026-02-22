import type { ApiResponse } from "../types/artwork";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(`${BASE_URL}?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }

  const data: ApiResponse = await response.json();
  return data;
};