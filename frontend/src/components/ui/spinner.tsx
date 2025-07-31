export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-transparent">
      <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-black animate-spin shadow-lg" />
    </div>
  );
}
