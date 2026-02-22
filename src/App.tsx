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

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchArtworks(1);

        setArtworks(response.data);
        setTotalRecords(response.pagination.total);
        setCurrentPage(response.pagination.current_page);

        console.log("Fetched artworks:", response);
      } catch (err) {
        console.error(err);
        setError("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Artworks Table</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ArtworkTable artworks={artworks} loading={loading} />
      )}
    </div>
  );
}

export default App;