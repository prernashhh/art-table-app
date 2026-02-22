import { useEffect, useState } from "react";
import type { Artwork } from "./types/artwork";
import { fetchArtworks } from "./services/api";
import { ArtworkTable } from "./components/ArtworkTable";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [rowsPerPage] = useState<number>(12);

  const loadArtworks = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchArtworks(page);

      setArtworks(response.data);
      setTotalRecords(response.pagination.total);
      setCurrentPage(response.pagination.current_page);
    } catch (err) {
      console.error(err);
      setError("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks(1);
  }, []);

  const handlePageChange = (event: { first: number; rows: number }) => {
    const page = event.first / event.rows + 1;
    loadArtworks(page);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Artworks Table</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ArtworkTable
        artworks={artworks}
        loading={loading}
        totalRecords={totalRecords}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;