import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
       setLoading(true);
      await api.post('/auth/signup', form);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed');
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Signup</h2>
      <Input placeholder="Name" name="name" onChange={handleChange}  disabled={loading} />
      <Input placeholder="Email" name="email" onChange={handleChange}  disabled={loading} />
      <Input placeholder="Password" name="password" type="password" onChange={handleChange}   disabled={loading}/>
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </div>
  );
}
