import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Upload, FileText, Clock, LogOut, Award, Calendar, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock Data
const mockStudentTasks = [
  { id: 1, title: 'Latihan Soal Turunan', subject: 'Matematika Wajib', deadline: '05 Des 2025', status: 'Dinilai', grade: 85 },
  { id: 2, title: 'Praktikum Fisika Dasar', subject: 'Fisika', deadline: '08 Des 2025', status: 'Belum Dikumpulkan', grade: null },
  { id: 3, title: 'Tugas Kelompok Matriks', subject: 'Matematika', deadline: '01 Des 2025', status: 'Menunggu Penilaian', grade: null },
  { id: 4, title: 'UAS Fisika Semester 1', subject: 'Fisika', deadline: '10 Des 2025', status: 'Belum Dikumpulkan', grade: null },
];

const mockStudentExtracurriculars = [
  { id: 1, name: 'Pramuka', schedule: 'Jumat, 15:00', location: 'Lapangan Utama', coach: 'Budi Santoso', status: 'Terdaftar' },
  { id: 2, name: 'Basket', schedule: 'Rabu, 16:00', location: 'Lapangan Basket', coach: 'Andi Wijaya', status: 'Belum Terdaftar' },
  { id: 3, name: 'KIR', schedule: 'Kamis, 15:30', location: 'Lab IPA', coach: 'Siti Aminah', status: 'Belum Terdaftar' },
  { id: 4, name: 'PMR', schedule: 'Selasa, 15:00', location: 'UKS', coach: 'Rina Marlina', status: 'Terdaftar' },
];

const mockStudentSchedule = [
  { day: 'Senin', subjects: [
    { name: 'Upacara Bendera', time: '07:00 - 07:45', room: 'Lapangan' },
    { name: 'Matematika Wajib', time: '07:45 - 09:15', room: 'R. 101' },
    { name: 'Bahasa Indonesia', time: '09:30 - 11:00', room: 'R. 101' },
    { name: 'Biologi', time: '11:00 - 12:30', room: 'Lab Biologi' },
  ]},
  { day: 'Selasa', subjects: [
    { name: 'Fisika', time: '07:00 - 09:15', room: 'Lab Fisika' },
    { name: 'Bahasa Inggris', time: '09:30 - 11:00', room: 'R. 101' },
    { name: 'Seni Budaya', time: '11:00 - 12:30', room: 'R. Seni' },
  ]},
  { day: 'Rabu', subjects: [
    { name: 'Kimia', time: '07:00 - 09:15', room: 'Lab Kimia' },
    { name: 'Sejarah Indonesia', time: '09:30 - 11:00', room: 'R. 101' },
    { name: 'PKN', time: '11:00 - 12:30', room: 'R. 101' },
  ]},
  { day: 'Kamis', subjects: [
    { name: 'Matematika Peminatan', time: '07:00 - 09:15', room: 'R. 101' },
    { name: 'Agama Islam', time: '09:30 - 11:00', room: 'Masjid' },
    { name: 'PJOK', time: '11:00 - 12:30', room: 'Lapangan' },
  ]},
  { day: 'Jumat', subjects: [
    { name: 'Ekonomi', time: '07:00 - 08:30', room: 'R. 101' },
    { name: 'Prakarya', time: '08:30 - 10:00', room: 'R. Workshop' },
    { name: 'Sholat Jumat', time: '11:30 - 12:30', room: 'Masjid' },
  ]},
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'tasks' | 'extracurricular' | 'schedule'>('home');
  const { user, logout } = useAuth();
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    let scanner: any = null;
    if (activeTab === 'scan' && !scanResult) {
      const timer = setTimeout(() => {
        try {
          const element = document.getElementById('reader');
          if (element) {
            scanner = new Html5QrcodeScanner(
              "reader",
              { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                showTorchButtonIfSupported: true
              },
              false
            );
            
            scanner.render(
              (decodedText: string) => {
                setScanResult(decodedText);
                scanner.clear();
              }, 
              (_error: any) => {
                // console.warn(error);
              }
            );
          }
        } catch (err) {
          console.error("Error initializing scanner:", err);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (scanner) {
          scanner.clear().catch((e: any) => console.error("Failed to clear scanner", e));
        }
      };
    }
  }, [activeTab, scanResult]);

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in min-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Scan QR Absensi</h2>
            
            {scanResult ? (
               <div className="bg-white shadow-lg border border-slate-200 p-8 rounded-2xl flex flex-col items-center text-center max-w-sm w-full animate-scale-in">
                 <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle className="w-10 h-10 text-emerald-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Absensi Berhasil!</h3>
                 <p className="text-slate-600 mb-6">Anda telah tercatat hadir pada:</p>
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full mb-6">
                    <p className="text-slate-900 font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-emerald-600 font-bold text-xl mt-1">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                 </div>
                 <button 
                   onClick={() => { setScanResult(null); setActiveTab('home'); }}
                   className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                 >
                   Kembali ke Dashboard
                 </button>
               </div>
            ) : (
               <>
                <div className="bg-white shadow-md border border-slate-200 p-4 rounded-2xl relative group w-full max-w-md">
                  <div id="reader" className="w-full rounded-xl overflow-hidden bg-slate-100"></div>
                </div>
                <p className="mt-6 text-slate-600 text-center max-w-xs">Arahkan kamera ke QR Code yang ditampilkan oleh guru.</p>
                
                <button 
                  onClick={() => setScanResult("MOCK-QR-DATA")}
                  className="mt-4 text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Simulasi Scan Berhasil (Dev Mode)
                </button>

                <button 
                  onClick={() => setActiveTab('home')}
                  className="mt-8 bg-white border border-slate-200 px-6 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition flex items-center shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
                  Kembali
                </button>
               </>
            )}
          </div>
        );
      case 'tasks':
        return (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setActiveTab('home')}
                className="mr-4 p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <h2 className="text-2xl font-bold text-slate-900">Daftar Tugas & Nilai</h2>
            </div>

            <div className="space-y-4">
              {mockStudentTasks.map((task) => (
                <div key={task.id} className="bg-white shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-primary/30 transition-all rounded-2xl">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        task.status === 'Dinilai' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        task.status === 'Menunggu Penilaian' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {task.status}
                      </span>
                      <span className="text-xs text-slate-500">{task.subject}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-slate-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      Deadline: {task.deadline}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    {task.grade !== null ? (
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold">Nilai</p>
                        <p className="text-3xl font-bold text-emerald-600">{task.grade}</p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold">Nilai</p>
                        <p className="text-xl font-bold text-slate-400">-</p>
                      </div>
                    )}
                    
                    {task.status === 'Belum Dikumpulkan' ? (
                      <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    ) : (
                      <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed border border-slate-200">
                        <CheckCircle className="w-4 h-4" />
                        Selesai
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'extracurricular':
        return (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setActiveTab('home')}
                className="mr-4 p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <h2 className="text-2xl font-bold text-slate-900">Ekstrakurikuler</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockStudentExtracurriculars.map((ekskul) => (
                <div key={ekskul.id} className="bg-white shadow-sm border border-slate-200 p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Award className="w-24 h-24 text-slate-900" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        ekskul.status === 'Terdaftar' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {ekskul.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{ekskul.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">Pembina: {ekskul.coach}</p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {ekskul.schedule}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {ekskul.location}
                      </div>
                    </div>

                    <button className={`w-full mt-6 py-2 rounded-lg font-medium transition-all ${
                      ekskul.status === 'Terdaftar' 
                        ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                        : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                    }`}>
                      {ekskul.status === 'Terdaftar' ? 'Lihat Detail' : 'Daftar Sekarang'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setActiveTab('home')}
                className="mr-4 p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <h2 className="text-2xl font-bold text-slate-900">Jadwal Pelajaran</h2>
            </div>

            <div className="space-y-6">
              {mockStudentSchedule.map((daySchedule, idx) => (
                <div key={idx} className="bg-white shadow-sm border border-slate-200 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    {daySchedule.day}
                  </h3>
                  <div className="space-y-3">
                    {daySchedule.subjects.map((subject, subIdx) => (
                      <div key={subIdx} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="w-1.5 h-10 bg-gradient-to-b from-primary to-purple-600 rounded-full mr-4"></div>
                          <div>
                            <p className="font-medium text-slate-900">{subject.name}</p>
                            <p className="text-sm text-slate-500 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" /> {subject.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg self-start md:self-center">
                          <MapPin className="w-3 h-3 mr-1.5" />
                          {subject.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 space-y-8 animate-fade-in min-h-screen flex flex-col">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Halo, {user?.name || 'Siswa'}!</h1>
                <p className="text-slate-600 mt-1">XII IPA 1 - NIS: 12345678</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={logout} className="p-2 text-slate-500 hover:text-red-600 transition bg-white border border-slate-200 rounded-xl hover:bg-red-50 shadow-sm">
                  <LogOut className="w-6 h-6" />
                </button>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 border border-white">
                  {user?.name?.charAt(0) || 'S'}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 content-center">
              <button 
                onClick={() => setActiveTab('scan')}
                className="group relative overflow-hidden p-8 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-3xl shadow-2xl shadow-slate-900/20 flex flex-col items-center justify-center space-y-6 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/10 h-64"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <QrCode className="w-12 h-12 text-slate-200" />
                </div>
                <div className="text-center">
                  <span className="font-bold text-2xl tracking-wide block text-slate-100">Absensi QR</span>
                  <span className="text-slate-400 text-sm mt-1 block">Scan untuk kehadiran</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('tasks')}
                className="group relative overflow-hidden p-8 bg-gradient-to-br from-zinc-700 to-zinc-800 text-white rounded-3xl shadow-2xl shadow-zinc-900/20 flex flex-col items-center justify-center space-y-6 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/10 h-64"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <FileText className="w-12 h-12 text-zinc-200" />
                </div>
                <div className="text-center">
                  <span className="font-bold text-2xl tracking-wide block text-zinc-100">Tugas & Nilai</span>
                  <span className="text-zinc-400 text-sm mt-1 block">Kumpulkan tugas & cek nilai</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('extracurricular')}
                className="group relative overflow-hidden p-8 bg-gradient-to-br from-neutral-700 to-neutral-800 text-white rounded-3xl shadow-2xl shadow-neutral-900/20 flex flex-col items-center justify-center space-y-6 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/10 h-64"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-12 h-12 text-neutral-200" />
                </div>
                <div className="text-center">
                  <span className="font-bold text-2xl tracking-wide block text-neutral-100">Ekstrakurikuler</span>
                  <span className="text-neutral-400 text-sm mt-1 block">Daftar & jadwal kegiatan</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('schedule')}
                className="group relative overflow-hidden p-8 bg-gradient-to-br from-stone-700 to-stone-800 text-white rounded-3xl shadow-2xl shadow-stone-900/20 flex flex-col items-center justify-center space-y-6 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/10 h-64"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Calendar className="w-12 h-12 text-stone-200" />
                </div>
                <div className="text-center">
                  <span className="font-bold text-2xl tracking-wide block text-stone-100">Jadwal Pelajaran</span>
                  <span className="text-stone-400 text-sm mt-1 block">Cek jadwal mingguan</span>
                </div>
              </button>
            </div>

            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 mt-auto">
              <h3 className="font-semibold mb-4 flex items-center text-slate-900 text-lg">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Jadwal Hari Ini
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-2 h-10 bg-emerald-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-slate-900">Matematika Wajib</p>
                      <p className="text-sm text-slate-500">07:00 - 08:30 • R. 101</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">Hadir</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-2 h-10 bg-amber-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-slate-900">Fisika</p>
                      <p className="text-sm text-slate-500">08:45 - 10:15 • Lab Fisika</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">Belum Mulai</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 text-slate-900">
      {renderContent()}
    </div>
  );
};

export default StudentDashboard;
