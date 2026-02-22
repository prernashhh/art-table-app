import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Artwork } from "../types/artwork";

interface ArtworkTableProps {
  artworks: Artwork[];
  loading: boolean;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (event: { first: number; rows: number }) => void;
}

export const ArtworkTable = ({
  artworks,
  loading,
  totalRecords,
  rowsPerPage,
  onPageChange,
}: ArtworkTableProps) => {
  return (
    <DataTable
      value={artworks}
      loading={loading}
      paginator
      lazy
      rows={rowsPerPage}
      totalRecords={totalRecords}
      onPage={onPageChange}
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="title" header="Title" />
      <Column field="place_of_origin" header="Place of Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Start Date" />
      <Column field="date_end" header="End Date" />
    </DataTable>
  );
};