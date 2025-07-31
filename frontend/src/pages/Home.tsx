import { useEffect, useRef, useState } from "react";
import api from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import EntryTable from "@/components/EntryTable";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import { Entry } from '../../types/entry.types';

export default function Home() {
const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
const isResetting = useRef(false);



const fetchEntries = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const res = await api.get("/entries", {
      params: { search: debouncedSearch, page, limit: 10 },
    });

    if (isResetting.current) {
      setEntries(res.data.entries);      
      isResetting.current = false;      
    } else {
      setEntries((prev) => [...prev, ...res.data.entries]); 
    }

    setHasMore(res.data.entries.length === 10);
  } catch (err) {
    console.error("Fetch failed", err);
  } finally {
    setLoading(false);
  }
};



  const handleDeleteConfirmed = async () => {
    if (!selectedId) return;
    setDeletingId(selectedId);
    setShowConfirm(false);
    try {
      await api.delete(`/entries/${selectedId}`);
      setEntries((prev) => prev.filter((e) => e.id !== selectedId));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
      setSelectedId(null);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setTimeout(() => {
      navigate(`/edit/${id}`);
    }, 300);
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

useEffect(() => {
  const timeout = setTimeout(() => {
    isResetting.current = true;
    setPage(1); // this triggers the fetch effect
    setDebouncedSearch(search);
  }, 600);

  return () => clearTimeout(timeout);
}, [search]);




  // Fetch entries on page or search change
  useEffect(() => {
    fetchEntries();
  }, [debouncedSearch, page]);

  // Infinite scroll observer
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1);
      }
    },
    { threshold: 1 }
  );

  if (loaderRef.current) observer.observe(loaderRef.current);
  return () => observer.disconnect();
}, [loaderRef.current, hasMore, loading]);


  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title/director"
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/create")}>+ Add Entry</Button>
      </div>

      <EntryTable
        entries={entries}
        onDelete={confirmDelete}
        onEdit={handleEdit}
        deletingId={deletingId}
        editingId={editingId}
      />

      {loading && <Spinner/>}
      <div ref={loaderRef} className="h-12" />

      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteConfirmed} disabled={deletingId !== null}>
                {deletingId ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
