import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import api from "@/lib/apiClient";
import toast from "react-hot-toast";
import LoadingButton from "../utils/Button";
import Spinner from "@/components/ui/spinner";

export default function Profile() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password?: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/profile");
      setForm(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put("/auth/profile", form);
      toast.success("Profile updated!");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Edit Profile
          </h2>

          <div className="space-y-4">
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={loading}
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              disabled={loading}
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <LoadingButton
              onClick={handleUpdate}
              loading={loading}
              text="Update Profile"
              loadingText="Updating..."
              className="w-full"
            />
          </div>
        </div>

      )}
    </>
  );
}
