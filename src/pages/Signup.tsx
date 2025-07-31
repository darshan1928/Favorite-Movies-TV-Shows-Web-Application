import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/apiClient";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingButton from "@/utils/Button";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", form);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started
          </p>
        </div>

        <form className="space-y-4">
          <Input
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            disabled={loading}
          />
          <Input
            placeholder="Email address"
            name="email"
            type="email"
            onChange={handleChange}
            disabled={loading}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            disabled={loading}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <LoadingButton
            onClick={handleSubmit}
            loading={loading}
            text="Create Account"
            loadingText="Creating Account..."
            disabled={!form.name || !form.email || !form.password}
            className="w-full"
          />
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
