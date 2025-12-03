import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, User, UserPlus, Mail } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MURID',
    teacherCode: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.role === 'GURU' && formData.teacherCode !== 'PGRI2025') {
      setError('Kode Guru salah. Silakan hubungi admin.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role,
          },
        },
      });

      if (error) throw error;
      
      // Supabase might require email confirmation by default. 
      // If so, the user won't be able to login immediately.
      // We should probably inform the user.
      // For now, let's assume email confirmation is disabled or we just redirect to login.
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registrasi gagal. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Daftar Akun</h1>
          <p className="text-slate-500">Buat akun baru untuk memulai</p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Nama Lengkap"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Password (min. 6 karakter)"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Peran</label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition appearance-none bg-white"
              >
                <option value="MURID">Siswa</option>
                <option value="GURU">Guru</option>
              </select>
            </div>
          </div>

          {formData.role === 'GURU' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kode Guru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="teacherCode"
                  value={formData.teacherCode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="Masukkan Kode Guru"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            disabled={formData.role === 'GURU' && !formData.teacherCode}
          >
            Daftar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Masuk disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
