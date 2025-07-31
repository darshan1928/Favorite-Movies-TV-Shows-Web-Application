import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}
