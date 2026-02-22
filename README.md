# Artworks Data Table (React + TypeScript)

A production-ready React application that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with true server-side pagination and persistent row selection.

## Live Demo

https://artworks-table-prerna.netlify.app/

---

## Features

- Server-side pagination (lazy loading)
- Data fetched on every page change (no client-side caching)
- Persistent row selection across pages
- Select/Deselect individual rows
- Select/Deselect all rows on current page
- Custom row selection (select N rows) implemented without prefetching
- Strict TypeScript typing
- Clean separation of API, state management, and UI components

---

## Architecture Highlights

- Only current page data is stored in state
- Selection state stores only row IDs (no row object storage)
- No mass data storage or multi-page prefetching
- Custom selection implemented using global index logic
- Modular structure (types, services, components)

---

## Tech Stack

- React (Vite)
- TypeScript
- PrimeReact DataTable
- Netlify (CI/CD Deployment)

---

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

---

## API Used

Art Institute of Chicago API  
https://api.artic.edu/api/v1/artworks
