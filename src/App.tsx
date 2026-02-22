import { useEffect, useState, useRef } from "react";
import type { Artwork } from "./types/artwork";
import { fetchArtworks } from "./services/api";
import { ArtworkTable } from "./components/ArtworkTable";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [rowsPerPage] = useState<number>(12);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [customSelectLimit, setCustomSelectLimit] = useState<number | null>(null);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState<string>("");

  const loadArtworks = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchArtworks(page);
      setArtworks(response.data);
      setTotalRecords(response.pagination.total);
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
    setCurrentOffset(event.first);
    const page = event.first / event.rows + 1;
    loadArtworks(page);
  };

  const handleSelectionChange = (selectedRows: Artwork[]) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);

      artworks.forEach((art) => {
        updated.delete(art.id);
      });

      selectedRows.forEach((art) => {
        updated.add(art.id);
      });

      return updated;
    });

    setCustomSelectLimit(null);
  };

  const handleCustomSelection = () => {
    const count = parseInt(selectCount);

    if (!count || count <= 0) {
      alert("Enter a valid number");
      return;
    }

    const capped = Math.min(count, totalRecords);
    setCustomSelectLimit(capped);

    setSelectCount("");
    overlayRef.current?.hide();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Artworks Table</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <Button
          label="Custom Select"
          icon="pi pi-check-square"
          onClick={(e) => overlayRef.current?.toggle(e)}
        />

        <OverlayPanel ref={overlayRef}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="number"
              placeholder="Enter number"
              value={selectCount}
              onChange={(e) => setSelectCount(e.target.value)}
            />
            <Button label="Select" onClick={handleCustomSelection} />
          </div>
        </OverlayPanel>
      </div>

      <ArtworkTable
        artworks={artworks}
        loading={loading}
        totalRecords={totalRecords}
        rowsPerPage={rowsPerPage}
        selectedIds={selectedIds}
        customSelectLimit={customSelectLimit}
        currentOffset={currentOffset}
        onSelectionChange={handleSelectionChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;