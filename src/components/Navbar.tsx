import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        🎬 MovieZone
      </h1>

      <div className="flex items-center gap-4">
        <Avatar onClick={() => navigate("/profile")} title="Profile" className="cursor-pointer">
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=U" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={() => setShowLogoutConfirm(true)}>
          Logout
        </Button>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
