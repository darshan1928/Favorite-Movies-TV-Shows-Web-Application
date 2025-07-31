import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@/utils/Button";
import Spinner from "@/components/ui/spinner";

const defaultForm = {
  title: "",
  type: "Movie",
  director: "",
  budget: "",
  location: "",
  duration: "",
  year: "",
  posterUrl: "",
};

export default function CreateOrEdit() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchEntry = async () => {
    setDataLoading(true);
    try {
      const res = await api.get("/entries", { params: { page: 1, limit: 1 } });
      const entry = res.data.entries.find((e: any) => e.id === Number(id));
      if (entry) setForm(entry);
    } catch (err) {
      console.error("Failed to load entry");
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/entries/${id}`, form);
      } else {
        await api.post("/entries", form);
      }
      navigate("/");
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEntry();
  }, [id]);

  if (dataLoading) return <Spinner />;
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">
        {id ? "Edit Entry" : "Add Entry"}
      </h2>
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="Movie">Movie</option>
        <option value="TV Show">TV Show</option>
      </select>
      <Input
        name="director"
        placeholder="Director"
        value={form.director}
        onChange={handleChange}
      />
      <Input
        name="budget"
        placeholder="Budget"
        value={form.budget}
        onChange={handleChange}
      />
      <Input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <Input
        name="duration"
        placeholder="Duration"
        value={form.duration}
        onChange={handleChange}
      />
      <Input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
      />
      <Input
        name="posterUrl"
        placeholder="Poster URL (dummy)"
        value={form.posterUrl}
        onChange={handleChange}
      />
      <LoadingButton
        onClick={handleSubmit}
        loading={loading}
        text={id ? "Update Entry" : "Create Entry"}
        loadingText="Saving..."
      />
    </div>
  );
}
