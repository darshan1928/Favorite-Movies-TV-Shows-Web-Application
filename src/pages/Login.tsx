import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/apiClient";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import LoadingButton from "@/utils/Button";
export default function Login() {
  const { setIsLoggedIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Success");
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      console.log(err.response?.data?.error);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your credentials to log in
          </p>
        </div>

        <form className="space-y-4">
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
            text="Login"
            loadingText="Logging in..."
            className="w-full"
          />
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
