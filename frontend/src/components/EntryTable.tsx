
import LoadingButton from "@/utils/Button";


type Props = {
  entries: any[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  deletingId: number | null;
  editingId: number | null;
};

export default function EntryTable({
  entries,
  onDelete,
  onEdit,
  deletingId,
  editingId,
}: Props) {
  if (entries.length === 0) return <p>No entries found.</p>;

  return (
<table className="w-full text-sm text-left border-collapse overflow-x-auto rounded-md shadow-sm border">
  <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
    <tr>
      <th className="px-4 py-3">Poster</th>
      <th className="px-4 py-3">Title</th>
      <th className="px-4 py-3">Type</th>
      <th className="px-4 py-3">Director</th>
      <th className="px-4 py-3">Budget</th>
      <th className="px-4 py-3">Location</th>
      <th className="px-4 py-3">Year</th>
      <th className="px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody>
    {entries.map((e) => (
      <tr key={e.id} className="border-t hover:bg-gray-50 transition duration-150">
        <td className="px-4 py-2">
          <img
            src={e.posterUrl || 'https://via.placeholder.com/60x90'}
            alt={e.title}
            className="w-12 h-16 object-cover rounded shadow-sm"
          />
        </td>
        <td className="px-4 py-2 font-medium text-gray-900">{e.title}</td>
        <td className="px-4 py-2">{e.type}</td>
        <td className="px-4 py-2">{e.director}</td>
        <td className="px-4 py-2">{e.budget}</td>
        <td className="px-4 py-2">{e.location}</td>
        <td className="px-4 py-2">{e.year}</td>
        <td className="px-4 py-2 space-x-2 whitespace-nowrap">
          <LoadingButton
            onClick={() => onEdit(e.id)}
            loading={editingId === e.id}
            text="Edit"
            loadingText="Redirecting..."
            variant="outline"
          />
          <LoadingButton
            onClick={() => onDelete(e.id)}
            loading={deletingId === e.id}
            text="Delete"
            loadingText="Deleting..."
            variant="destructive"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
}
