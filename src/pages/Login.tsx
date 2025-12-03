import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isInstallable, install } = usePWAInstall();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { user } = await login(email, password);
      
      if (user?.user_metadata?.role === 'GURU') {
        navigate('/teacher/dashboard');
      } else if (user?.user_metadata?.role === 'MURID') {
        navigate('/student/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login gagal. Periksa email dan password Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 relative">
      {isInstallable && (
        <button
          onClick={install}
          className="absolute top-4 right-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg text-primary font-medium hover:bg-slate-50 transition animate-bounce"
        >
          <Download className="w-4 h-4" />
          Install Aplikasi
        </button>
      )}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Sistem Sekolah</h1>
          <p className="text-slate-500">Masuk untuk melanjutkan</p>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Masukkan email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Daftar disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
