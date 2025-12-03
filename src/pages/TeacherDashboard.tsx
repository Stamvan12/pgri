import { useState, createContext, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, Calendar, Award, TrendingUp, Clock, MoreHorizontal, Search, Filter, Edit, Eye, ChevronRight, X, FileText, Upload, Download, Trash2, Plus, Folder, MapPin, ClipboardList, CheckCircle, Trophy, Printer, LogOut, Sun, Moon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Theme Context
const ThemeContext = createContext({ isDarkMode: true, toggleTheme: () => {} });
const useTheme = () => useContext(ThemeContext);

const data = [
  { name: 'Senin', hadir: 40, sakit: 2, izin: 1 },
  { name: 'Selasa', hadir: 38, sakit: 1, izin: 4 },
  { name: 'Rabu', hadir: 42, sakit: 0, izin: 1 },
  { name: 'Kamis', hadir: 39, sakit: 3, izin: 1 },
  { name: 'Jumat', hadir: 41, sakit: 1, izin: 1 },
];

// Mock Data for Students
const mockStudents = [
  { id: 1, name: 'Ahmad Rizky', nis: '12345678', class: 'XII IPA 1', status: 'Hadir', attendance: 95 },
  { id: 2, name: 'Budi Santoso', nis: '12345679', class: 'XII IPA 1', status: 'Sakit', attendance: 88 },
  { id: 3, name: 'Citra Dewi', nis: '12345680', class: 'XII IPA 1', status: 'Hadir', attendance: 98 },
  { id: 4, name: 'Dewi Lestari', nis: '12345681', class: 'XII IPA 1', status: 'Izin', attendance: 92 },
  { id: 5, name: 'Eko Prasetyo', nis: '12345682', class: 'XII IPA 1', status: 'Hadir', attendance: 90 },
];

// Mock Data for Curriculum
const mockCurriculum = [
  { id: 1, subject: 'Matematika Wajib', class: 'XII IPA 1', files: 12, lastUpdate: '2 Jam yang lalu', color: 'blue' },
  { id: 2, subject: 'Matematika Peminatan', class: 'XII IPA 1', files: 8, lastUpdate: '1 Hari yang lalu', color: 'purple' },
  { id: 3, subject: 'Fisika Dasar', class: 'X IPA 2', files: 15, lastUpdate: '3 Hari yang lalu', color: 'emerald' },
  { id: 4, subject: 'Kimia Organik', class: 'XI IPA 1', files: 10, lastUpdate: '1 Minggu yang lalu', color: 'amber' },
];

const mockFiles = [
  { id: 1, name: 'LKS - Turunan Fungsi Aljabar.pdf', size: '2.4 MB', date: '03 Des 2025', type: 'pdf' },
  { id: 2, name: 'Materi - Limit Fungsi.pptx', size: '5.1 MB', date: '01 Des 2025', type: 'ppt' },
  { id: 3, name: 'Latihan Soal - Integral.docx', size: '1.2 MB', date: '28 Nov 2025', type: 'doc' },
  { id: 4, name: 'Kunci Jawaban - UTS.pdf', size: '0.8 MB', date: '25 Nov 2025', type: 'pdf' },
];

// Mock Data for Extracurricular
const mockExtracurricular = [
  { id: 1, name: 'Pramuka', schedule: 'Jumat, 15:00', members: 45, coach: 'Budi Santoso', location: 'Lapangan Utama', status: 'Active', color: 'brown' },
  { id: 2, name: 'Basket', schedule: 'Rabu, 16:00', members: 20, coach: 'Andi Wijaya', location: 'Lapangan Basket', status: 'Active', color: 'orange' },
  { id: 3, name: 'KIR (Karya Ilmiah Remaja)', schedule: 'Kamis, 15:30', members: 15, coach: 'Siti Aminah', location: 'Lab IPA', status: 'Active', color: 'blue' },
  { id: 4, name: 'PMR', schedule: 'Selasa, 15:00', members: 30, coach: 'Rina Marlina', location: 'UKS', status: 'Active', color: 'red' },
  { id: 5, name: 'Rohis', schedule: 'Jumat, 11:30', members: 50, coach: 'Ust. Ahmad', location: 'Masjid Sekolah', status: 'Active', color: 'emerald' },
];

const StatCard = ({ title, value, icon: Icon, color, gradient }: any) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`relative overflow-hidden p-6 flex items-center justify-between cursor-pointer group transition-all duration-300 rounded-2xl ${
      isDarkMode 
        ? 'glass-card glass-card-hover' 
        : 'bg-white shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1'
    }`}>
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${color.replace('text-', 'bg-').split(' ')[0]} opacity-[0.08] blur-3xl group-hover:opacity-[0.15] transition-all duration-500`} />
      
      <div className="relative z-10">
        <p className={`text-sm font-medium mb-1 transition-colors ${
          isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'
        }`}>{title}</p>
        <h3 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>{value}</h3>
      </div>

      <div className={`relative z-10 p-3.5 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-black/20 group-hover:scale-110 group-hover:shadow-${color.split('-')[1]}-500/30 transition-all duration-300 border ${
        isDarkMode ? 'border-white/10' : 'border-white/20'
      }`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const { isDarkMode } = useTheme();
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 border backdrop-blur-xl shadow-xl rounded-xl ${
        isDarkMode 
          ? 'glass-card border-white/10 !bg-slate-900/90' 
          : 'bg-white/90 border-slate-200'
      }`}>
        <p className={`text-sm mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 text-sm mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }} />
            <span className={`capitalize min-w-[60px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{entry.name}</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StudentManagement = () => {
  const { isDarkMode } = useTheme();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  if (selectedStudent) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedStudent(null)}
          className={`flex items-center transition mb-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
          Kembali ke Daftar Siswa
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Card */}
          <div className={`p-8 flex flex-col items-center text-center relative overflow-hidden rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className={`w-24 h-24 rounded-full border-4 shadow-xl z-10 flex items-center justify-center text-3xl font-bold text-white mb-4 ${isDarkMode ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-900' : 'bg-gradient-to-br from-slate-400 to-slate-500 border-white'}`}>
              {selectedStudent.name.charAt(0)}
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.name}</h2>
            <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedStudent.nis} • {selectedStudent.class}</p>
            
            <div className="w-full space-y-4">
              <div className={`flex justify-between items-center p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kehadiran</span>
                <span className="text-emerald-400 font-bold">{selectedStudent.attendance}%</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Status Hari Ini</span>
                <span className={`font-bold ${selectedStudent.status === 'Hadir' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              className={`mt-8 w-full py-2 rounded-lg flex items-center justify-center transition ${isDarkMode ? 'glass-button' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Biodata
            </button>
          </div>

          {/* Attendance History */}
          <div className={`lg:col-span-2 p-6 rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
            <h3 className={`text-lg font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Riwayat Absensi
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 3 === 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Senin, {i} Des 2025</p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>07:00 WIB</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    i % 3 === 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {i % 3 === 0 ? 'Sakit' : 'Hadir'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`w-full max-w-md p-6 relative animate-scale-in rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-xl'}`}>
              <button 
                onClick={() => setIsEditing(false)}
                className={`absolute top-4 right-4 transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Edit Biodata Siswa</h3>
              <form className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nama Lengkap</label>
                  <input type="text" defaultValue={selectedStudent.name} className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>NIS</label>
                  <input type="text" defaultValue={selectedStudent.nis} className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kelas</label>
                  <input type="text" defaultValue={selectedStudent.class} className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg mt-4 transition">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari siswa berdasarkan nama atau NIS..." 
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:border-primary/50 transition ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50'}`}
          />
        </div>
        <button className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition ${isDarkMode ? 'glass-button' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className={`overflow-hidden rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status Hari Ini</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Kehadiran</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
              {mockStudents.map((student) => (
                <tr key={student.id} className={`transition group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs mr-3">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{student.name}</div>
                        <div className="text-xs text-slate-500">{student.nis}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Hadir' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      student.status === 'Sakit' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-16 rounded-full h-1.5 mr-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${student.attendance}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className={`transition p-2 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-primary hover:bg-white/10' : 'text-slate-400 hover:text-primary hover:bg-slate-100'}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CurriculumManagement = () => {
  const { isDarkMode } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'subjects' | 'extracurricular'>('subjects');
  const [isAdding, setIsAdding] = useState(false);

  if (selectedSubject) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedSubject(null)}
          className={`flex items-center transition mb-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
          Kembali ke Daftar {activeTab === 'subjects' ? 'Mata Pelajaran' : 'Ekstrakurikuler'}
        </button>

        <div className={`p-8 relative overflow-hidden rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
          <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-${selectedSubject.color}-500 to-${selectedSubject.color}-600`} />
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTab === 'subjects' ? selectedSubject.subject : selectedSubject.name}</h2>
              <p className={`flex items-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {activeTab === 'subjects' ? (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    {selectedSubject.class}
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Pembina: {selectedSubject.coach}
                  </>
                )}
              </p>
            </div>
            <button className="w-full md:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white transition shadow-lg shadow-primary/20">
              {activeTab === 'subjects' ? (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Materi / LKS
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Kegiatan
                </>
              )}
            </button>
          </div>

          {activeTab === 'subjects' ? (
            <div className="space-y-4">
              {mockFiles.map((file) => (
                <div key={file.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition group gap-4 ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      file.type === 'pdf' ? 'bg-red-500/20 text-red-400' : 
                      file.type === 'ppt' ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-medium truncate transition ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{file.name}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{file.size} • {file.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button className={`p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-900'}`} title="Download">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-red-400' : 'hover:bg-red-50 text-slate-400 hover:text-red-500'}`} title="Hapus">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Jadwal Kegiatan</h3>
                <div className={`flex items-center gap-3 mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{selectedSubject.schedule}</span>
                </div>
                <div className={`flex items-center gap-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{selectedSubject.location}</span>
                </div>
              </div>
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Statistik Anggota</h3>
                <div className={`flex items-center gap-3 mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <Users className="w-5 h-5 text-primary" />
                  <span>{selectedSubject.members} Anggota Aktif</span>
                </div>
                <div className={`w-full rounded-full h-2 mt-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Kehadiran rata-rata 75%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className={`flex p-1 rounded-xl border backdrop-blur-md ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
          <button 
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'subjects' ? 'bg-primary text-white shadow-lg shadow-primary/25' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`}
          >
            Mata Pelajaran
          </button>
          <button 
            onClick={() => setActiveTab('extracurricular')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'extracurricular' ? 'bg-primary text-white shadow-lg shadow-primary/25' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`}
          >
            Ekstrakurikuler
          </button>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={`Cari ${activeTab === 'subjects' ? 'mata pelajaran' : 'ekstrakurikuler'}...`}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:border-primary/50 transition ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50'}`}
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-xl flex items-center gap-2 bg-primary hover:bg-primary/90 text-white whitespace-nowrap shadow-lg shadow-primary/20 transition"
          >
            <Plus className="w-5 h-5" />
            Tambah {activeTab === 'subjects' ? 'Mapel' : 'Ekskul'}
          </button>
        </div>
      </div>

      {activeTab === 'subjects' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCurriculum.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedSubject(item)}
              className={`p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 rounded-2xl border ${isDarkMode ? 'glass-card hover:border-primary/50' : 'bg-white shadow-sm border-slate-200 hover:shadow-md hover:border-primary/50'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-lg shadow-${item.color}-500/20`}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <button className={`transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className={`text-xl font-bold mb-1 transition ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{item.subject}</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.class}</p>
              
              <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${isDarkMode ? 'text-slate-400 bg-white/5' : 'text-slate-500 bg-slate-100'}`}>
                  {item.files} File
                </span>
                <span className="text-xs text-slate-500">
                  Update: {item.lastUpdate}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExtracurricular.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedSubject(item)}
              className={`p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 rounded-2xl border ${isDarkMode ? 'glass-card hover:border-primary/50' : 'bg-white shadow-sm border-slate-200 hover:shadow-md hover:border-primary/50'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-lg shadow-${item.color}-500/20`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.status}
                </span>
              </div>
              
              <h3 className={`text-xl font-bold mb-1 transition ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{item.name}</h3>
              <p className={`text-sm mb-4 flex items-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <Users className="w-3 h-3 mr-1" /> {item.members} Anggota
              </p>
              
              <div className={`space-y-2 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <div className={`flex items-center text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
                  {item.schedule}
                </div>
                <div className={`flex items-center text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <MapPin className="w-3.5 h-3.5 mr-2 text-primary" />
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 relative animate-scale-in rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-xl'}`}>
            <button 
              onClick={() => setIsAdding(false)}
              className={`absolute top-4 right-4 transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tambah {activeTab === 'subjects' ? 'Mata Pelajaran' : 'Ekstrakurikuler'}</h3>
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nama {activeTab === 'subjects' ? 'Mata Pelajaran' : 'Kegiatan'}</label>
                <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
              </div>
              {activeTab === 'subjects' ? (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kelas</label>
                  <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                </div>
              ) : (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Jadwal</label>
                    <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} placeholder="Contoh: Jumat, 15:00" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Lokasi</label>
                    <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pembina</label>
                    <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                  </div>
                </>
              )}
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg mt-4 transition">
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock Data for Schedule
const mockSchedule = [
  { id: 1, day: 'Senin', time: '07:00 - 08:30', class: 'X IPA 1', subject: 'Matematika', room: 'R. 101' },
  { id: 2, day: 'Senin', time: '08:30 - 10:00', class: 'XI IPS 2', subject: 'Matematika', room: 'R. 203' },
  { id: 3, day: 'Selasa', time: '10:15 - 11:45', class: 'XII IPA 1', subject: 'Fisika', room: 'Lab Fisika' },
  { id: 4, day: 'Rabu', time: '07:00 - 08:30', class: 'X IPA 1', subject: 'Matematika', room: 'R. 101' },
];

// Mock Data for Tasks
const mockTasks = [
  { id: 1, type: 'Tugas', title: 'Latihan Soal Turunan', class: 'XII IPA 1', subject: 'Matematika Wajib', deadline: '05 Des 2025', submitted: 28, total: 32, status: 'Active' },
  { id: 2, type: 'Tugas', title: 'Praktikum Fisika Dasar', class: 'X IPA 2', subject: 'Fisika', deadline: '08 Des 2025', submitted: 15, total: 30, status: 'Active' },
  { id: 3, type: 'Tugas', title: 'Tugas Kelompok Matriks', class: 'XI IPS 2', subject: 'Matematika', deadline: '01 Des 2025', submitted: 30, total: 30, status: 'Completed' },
  { id: 4, type: 'UTS', title: 'UTS Matematika Wajib', class: 'XII IPA 1', subject: 'Matematika Wajib', deadline: '15 Okt 2025', submitted: 32, total: 32, status: 'Completed' },
  { id: 5, type: 'UAS', title: 'UAS Fisika Semester 1', class: 'X IPA 2', subject: 'Fisika', deadline: '10 Des 2025', submitted: 0, total: 30, status: 'Scheduled' },
];

const TaskManagement = () => {
  const { isDarkMode } = useTheme();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'Tugas' | 'UTS' | 'UAS' | 'Rekapan'>('Tugas');

  if (selectedTask) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedTask(null)}
          className={`flex items-center transition mb-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
          Kembali ke Daftar {selectedTask.type}
        </button>

        <div className={`p-8 rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${
                  selectedTask.type === 'Tugas' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  selectedTask.type === 'UTS' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  'bg-orange-500/10 text-orange-400 border-orange-500/20'
                }`}>
                  {selectedTask.type}
                </span>
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedTask.title}</h2>
              </div>
              <div className={`flex flex-wrap items-center gap-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> {selectedTask.class}</span>
                <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1.5" /> {selectedTask.subject}</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Deadline: {selectedTask.deadline}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start sm:items-center">
              <div className="text-left sm:text-right mr-0 sm:mr-4 mb-2 sm:mb-0">
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Progress Pengumpulan</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedTask.submitted} <span className="text-sm text-slate-500">/ {selectedTask.total}</span></p>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white transition shadow-lg shadow-primary/20">
                <Edit className="w-4 h-4" />
                Edit {selectedTask.type}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">File Jawaban</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nilai</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
                {mockStudents.map((student, idx) => (
                  <tr key={student.id} className={`transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 ${isDarkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{student.name}</div>
                          <div className="text-xs text-slate-500">{student.nis}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        idx % 3 === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        idx % 3 === 1 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {idx % 3 === 0 ? 'Sudah Mengumpulkan' : idx % 3 === 1 ? 'Terlambat' : 'Belum Mengumpulkan'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {idx % 3 !== 2 ? (
                        <button className="flex items-center text-blue-400 hover:text-blue-300 transition text-sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Lihat File
                        </button>
                      ) : (
                        <span className="text-slate-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="number" 
                        className={`w-16 border rounded px-2 py-1 text-sm focus:outline-none focus:border-primary text-center ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                        placeholder="0"
                        defaultValue={idx % 3 === 0 ? 85 : idx % 3 === 1 ? 75 : 0}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className={`transition p-2 rounded-lg ${isDarkMode ? 'text-primary hover:text-primary/80 hover:bg-white/10' : 'text-primary hover:text-primary/80 hover:bg-slate-100'}`} title="Simpan Nilai">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className={`flex p-1 rounded-xl border backdrop-blur-md overflow-x-auto max-w-full ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
          {['Tugas', 'UTS', 'UAS', 'Rekapan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/25' : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {activeTab !== 'Rekapan' && (
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder={`Cari ${activeTab}...`}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:border-primary/50 transition ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50'}`}
              />
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="px-4 py-2.5 rounded-xl flex items-center gap-2 bg-primary hover:bg-primary/90 text-white whitespace-nowrap shadow-lg shadow-primary/20 transition"
            >
              <Plus className="w-5 h-5" />
              Buat {activeTab}
            </button>
          </div>
        )}
      </div>

      {activeTab === 'Rekapan' ? (
        <div className={`p-6 animate-fade-in rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Rekapan Nilai Siswa</h3>
            <div className="flex gap-2 w-full md:w-auto">
                <select className={`flex-1 md:flex-none border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                    <option>XII IPA 1 - Matematika Wajib</option>
                    <option>X IPA 2 - Fisika</option>
                </select>
                <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition shadow-lg shadow-emerald-600/20 whitespace-nowrap">
                    <Download className="w-4 h-4" /> Export Excel
                </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Siswa</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Rata-rata Tugas</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Nilai UTS</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Nilai UAS</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Nilai Akhir</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
                {mockStudents.map((student, idx) => {
                    const avgTugas = 85 - (idx * 2);
                    const nilaiUTS = 80 - (idx * 3);
                    const nilaiUAS = 88 - (idx * 1);
                    const nilaiAkhir = (avgTugas * 0.3) + (nilaiUTS * 0.3) + (nilaiUAS * 0.4);
                    let grade = 'A';
                    if (nilaiAkhir < 85) grade = 'B';
                    if (nilaiAkhir < 75) grade = 'C';
                    
                    return (
                      <tr key={student.id} className={`transition ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{student.name}</div>
                            <div className="text-xs text-slate-500">{student.nis}</div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{avgTugas}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{nilaiUTS}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{nilaiUAS}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{nilaiAkhir.toFixed(1)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                grade === 'A' ? 'bg-emerald-500/20 text-emerald-400' : 
                                grade === 'B' ? 'bg-blue-500/20 text-blue-400' : 
                                'bg-amber-500/20 text-amber-400'
                            }`}>{grade}</span>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTasks.filter(t => t.type === activeTab).map((task) => (
            <div 
              key={task.id} 
              onClick={() => setSelectedTask(task)}
              className={`p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 rounded-2xl border ${isDarkMode ? 'glass-card hover:border-primary/50' : 'bg-white shadow-sm border-slate-200 hover:shadow-md hover:border-primary/50'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                  task.type === 'Tugas' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20' :
                  task.type === 'UTS' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-500/20' :
                  'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/20'
                }`}>
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                  task.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  task.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <h3 className={`text-xl font-bold mb-1 transition ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-slate-900 group-hover:text-primary'}`}>{task.title}</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{task.subject} • {task.class}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Deadline</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{task.deadline}</span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      task.type === 'Tugas' ? 'bg-blue-500' :
                      task.type === 'UTS' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${(task.submitted / task.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{task.submitted} dikumpulkan</span>
                  <span>Total {task.total} siswa</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 relative animate-scale-in rounded-2xl ${isDarkMode ? 'glass-card' : 'bg-white shadow-xl'}`}>
            <button 
              onClick={() => setIsAdding(false)}
              className={`absolute top-4 right-4 transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Buat {activeTab} Baru</h3>
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Judul {activeTab}</label>
                <input type="text" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} placeholder={`Contoh: ${activeTab} Matematika`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Mata Pelajaran</label>
                <div className="relative">
                  <select className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary appearance-none cursor-pointer border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                    <option value="" className={isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-400'}>Pilih Mata Pelajaran</option>
                    {mockCurriculum.map((item) => (
                      <option key={item.id} value={item.subject} className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>
                        {item.subject} - {item.class}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deadline / Tanggal Ujian</label>
                <input type="date" className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deskripsi / Instruksi</label>
                <textarea className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-24 resize-none border ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg mt-4 transition">
                Buat {activeTab}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ScheduleManagement = () => {
  const [schedule, setSchedule] = useState(mockSchedule);
  const [selectedDay, setSelectedDay] = useState('Senin');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  
  // Form states
  const { isDarkMode } = useContext(ThemeContext);
  const [formDay, setFormDay] = useState('Senin');
  const [formRoom, setFormRoom] = useState('');
  const [formStartTime, setFormStartTime] = useState('');
  const [formEndTime, setFormEndTime] = useState('');

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredSchedule = schedule.filter(item => item.day === selectedDay);
  const selectedCurriculum = mockCurriculum.find(c => c.id.toString() === selectedSubjectId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCurriculum || !formRoom || !formStartTime || !formEndTime) return;

    const newSchedule = {
      id: schedule.length + 1,
      day: formDay,
      time: `${formStartTime} - ${formEndTime}`,
      class: selectedCurriculum.class,
      subject: selectedCurriculum.subject,
      room: formRoom
    };

    setSchedule([...schedule, newSchedule]);
    setSelectedDay(formDay);
    setIsAdding(false);
    
    // Reset form
    setSelectedSubjectId('');
    setFormRoom('');
    setFormStartTime('');
    setFormEndTime('');
    setFormDay('Senin');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className={`flex p-1 rounded-xl border backdrop-blur-md overflow-x-auto max-w-full ${
          isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedDay === day 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="glass-button px-4 py-2.5 rounded-xl flex items-center gap-2 bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Tambah Jadwal
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item) => (
            <div key={item.id} className={`p-6 flex flex-col md:flex-row items-center justify-between group transition-all rounded-xl border ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:border-primary/50' 
                : 'bg-white border-slate-200 hover:border-primary/50 shadow-sm'
            }`}>
              <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex flex-col items-center justify-center text-primary">
                  <span className="text-xs font-bold uppercase tracking-wider">Mulai</span>
                  <span className="text-lg font-bold">{item.time.split(' - ')[0]}</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.subject}</h3>
                  <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> {item.class}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {item.room}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {item.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button className={`p-2 rounded-lg transition ${
                  isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}>
                  <Edit className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg transition ${
                  isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-red-400' : 'hover:bg-slate-100 text-slate-500 hover:text-red-600'
                }`}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-12 rounded-xl border ${
            isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tidak ada jadwal</h3>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Belum ada jadwal mata pelajaran untuk hari {selectedDay}</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 relative animate-scale-in rounded-2xl border shadow-2xl ${
            isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <button 
              onClick={() => setIsAdding(false)}
              className={`absolute top-4 right-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tambah Jadwal Pelajaran</h3>
            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mata Pelajaran</label>
                <div className="relative">
                  <select 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary appearance-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-white/10 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    value={selectedSubjectId}
                    required
                  >
                    <option value="" className={isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-500'}>Pilih Mata Pelajaran</option>
                    {mockCurriculum.map((item) => (
                      <option key={item.id} value={item.id} className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>
                        {item.subject} - {item.class}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hari</label>
                <div className="relative">
                  <select 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary appearance-none cursor-pointer ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-white/10 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    onChange={(e) => setFormDay(e.target.value)}
                    value={formDay}
                  >
                    {days.map((day) => (
                      <option key={day} value={day} className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Kelas</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary cursor-not-allowed ${
                      isDarkMode 
                        ? 'bg-slate-800/50 border-white/10 text-white' 
                        : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                    placeholder="Otomatis dari Mapel"
                    value={selectedCurriculum?.class || ''}
                    readOnly
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Ruangan</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-white/10 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="R. 101" 
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Jam Mulai</label>
                  <input 
                    type="time" 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-white/10 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Jam Selesai</label>
                  <input 
                    type="time" 
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-white/10 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg mt-4 transition">
                Simpan Jadwal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock Data for Report Cards
const mockReportData = [
  {
    studentId: 1,
    semester: 'Ganjil 2025/2026',
    grades: [
      { subject: 'Matematika Wajib', kkm: 75, knowledge: 85, skill: 88, predicate: 'B' },
      { subject: 'Fisika', kkm: 75, knowledge: 82, skill: 85, predicate: 'B' },
      { subject: 'Bahasa Indonesia', kkm: 75, knowledge: 90, skill: 92, predicate: 'A' },
      { subject: 'Bahasa Inggris', kkm: 75, knowledge: 88, skill: 89, predicate: 'A' },
      { subject: 'Kimia', kkm: 75, knowledge: 78, skill: 80, predicate: 'C' },
    ],
    extracurricular: [
      { name: 'Pramuka', grade: 'A', description: 'Sangat Baik' },
      { name: 'Basket', grade: 'B', description: 'Baik' }
    ],
    attendance: { sick: 2, permitted: 1, alpha: 0 },
    attitude: 'Baik',
    rank: 1,
    average: 85.7
  },
  {
    studentId: 2,
    semester: 'Ganjil 2025/2026',
    grades: [
      { subject: 'Matematika Wajib', kkm: 75, knowledge: 78, skill: 80, predicate: 'C' },
      { subject: 'Fisika', kkm: 75, knowledge: 75, skill: 78, predicate: 'C' },
      { subject: 'Bahasa Indonesia', kkm: 75, knowledge: 85, skill: 88, predicate: 'B' },
      { subject: 'Bahasa Inggris', kkm: 75, knowledge: 82, skill: 84, predicate: 'B' },
      { subject: 'Kimia', kkm: 75, knowledge: 76, skill: 78, predicate: 'C' },
    ],
    extracurricular: [
      { name: 'Pramuka', grade: 'B', description: 'Baik' }
    ],
    attendance: { sick: 5, permitted: 2, alpha: 1 },
    attitude: 'Cukup',
    rank: 5,
    average: 80.4
  },
  {
    studentId: 3,
    semester: 'Ganjil 2025/2026',
    grades: [
      { subject: 'Matematika Wajib', kkm: 75, knowledge: 92, skill: 94, predicate: 'A' },
      { subject: 'Fisika', kkm: 75, knowledge: 88, skill: 90, predicate: 'A' },
      { subject: 'Bahasa Indonesia', kkm: 75, knowledge: 95, skill: 96, predicate: 'A' },
      { subject: 'Bahasa Inggris', kkm: 75, knowledge: 90, skill: 92, predicate: 'A' },
      { subject: 'Kimia', kkm: 75, knowledge: 85, skill: 88, predicate: 'B' },
    ],
    extracurricular: [
      { name: 'Pramuka', grade: 'A', description: 'Sangat Baik' },
      { name: 'KIR', grade: 'A', description: 'Sangat Baik' }
    ],
    attendance: { sick: 0, permitted: 0, alpha: 0 },
    attitude: 'Sangat Baik',
    rank: 2,
    average: 91.0
  }
];

const ReportCardManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  
  // Calculate ranks dynamically (simple sort)
  const rankedStudents = mockStudents.map(student => {
    const report = mockReportData.find(r => r.studentId === student.id);
    return { ...student, report };
  }).sort((a, b) => (b.report?.average || 0) - (a.report?.average || 0));

  const selectedStudent = rankedStudents.find(s => s.id === selectedStudentId);

  if (selectedStudent && selectedStudent.report) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedStudentId(null)}
          className={`flex items-center transition mb-4 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
          Kembali ke Daftar Raport
        </button>

        <div className={`p-4 md:p-8 print:p-0 print:bg-white print:text-black rounded-2xl border ${
          isDarkMode ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`flex flex-col md:flex-row justify-between items-start gap-4 mb-8 border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                isDarkMode ? 'bg-slate-800' : 'bg-slate-600'
              }`}>
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.name}</h2>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>NIS: {selectedStudent.nis} • Kelas: {selectedStudent.class}</p>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Semester: {selectedStudent.report.semester}</p>
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/20 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">Peringkat {rankedStudents.findIndex(s => s.id === selectedStudent.id) + 1}</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Rata-rata Nilai: <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.report.average}</span></p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Academic Grades */}
            <div>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Nilai Akademik
              </h3>
              <div className={`overflow-x-auto rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <table className="w-full min-w-[600px]">
                  <thead className={isDarkMode ? 'bg-white/5' : 'bg-slate-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Mata Pelajaran</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>KKM</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pengetahuan</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Keterampilan</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Predikat</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
                    {selectedStudent.report.grades.map((grade: any, idx: number) => (
                      <tr key={idx} className={isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                        <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{grade.subject}</td>
                        <td className={`px-6 py-4 text-sm text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{grade.kkm}</td>
                        <td className={`px-6 py-4 text-sm text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{grade.knowledge}</td>
                        <td className={`px-6 py-4 text-sm text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{grade.skill}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            grade.predicate === 'A' ? 'bg-emerald-500/20 text-emerald-400' :
                            grade.predicate === 'B' ? 'bg-blue-500/20 text-blue-400' :
                            grade.predicate === 'C' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {grade.predicate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Extracurricular */}
              <div>
                <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Ekstrakurikuler
                </h3>
                <div className={`overflow-x-auto rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <table className="w-full min-w-[400px]">
                    <thead className={isDarkMode ? 'bg-white/5' : 'bg-slate-50'}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kegiatan</th>
                        <th className={`px-6 py-3 text-center text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nilai</th>
                        <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
                      {selectedStudent.report.extracurricular.map((extra: any, idx: number) => (
                        <tr key={idx}>
                          <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{extra.name}</td>
                          <td className={`px-6 py-4 text-sm text-center font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{extra.grade}</td>
                          <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{extra.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance & Attitude */}
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Ketidakhadiran
                  </h3>
                  <div className={`p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center rounded-xl border ${
                    isDarkMode ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div>
                      <div className={`text-xs uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sakit</div>
                      <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.report.attendance.sick}</div>
                    </div>
                    <div>
                      <div className={`text-xs uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Izin</div>
                      <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.report.attendance.permitted}</div>
                    </div>
                    <div>
                      <div className={`text-xs uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Alpha</div>
                      <div className="text-xl font-bold text-red-400">{selectedStudent.report.attendance.alpha}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Sikap & Kepribadian
                  </h3>
                  <div className={`p-4 rounded-xl border ${
                    isDarkMode ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Predikat Sikap</span>
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedStudent.report.attitude}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`flex justify-end pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <button className="glass-button px-6 py-2 rounded-lg flex items-center gap-2 bg-primary hover:bg-primary/90 text-white">
                <Printer className="w-5 h-5" />
                Cetak Raport
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari siswa..." 
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary/50 transition ${
              isDarkMode 
                ? 'bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm'
            }`}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition ${
            isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
          }`}>
            <Filter className="w-5 h-5" />
            Filter Kelas
          </button>
          <button className="flex-1 md:flex-none glass-button px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Download className="w-5 h-5" />
            Export Leger
          </button>
        </div>
      </div>

      <div className={`overflow-hidden rounded-xl border ${isDarkMode ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Peringkat</th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Siswa</th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Rata-rata</th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kehadiran</th>
                <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sikap</th>
                <th className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-200'}`}>
              {rankedStudents.map((student, idx) => (
                <tr key={student.id} className={`transition group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                      idx === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/50' :
                      idx === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/50' :
                      isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{student.name}</div>
                        <div className="text-xs text-slate-500">{student.nis}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{student.report?.average || '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      S: {student.report?.attendance.sick || 0} | I: {student.report?.attendance.permitted || 0} | A: {student.report?.attendance.alpha || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      student.report?.attitude === 'Sangat Baik' ? 'bg-emerald-500/20 text-emerald-400' :
                      student.report?.attitude === 'Baik' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {student.report?.attitude || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`transition p-2 rounded-lg ${
                        isDarkMode ? 'text-primary hover:text-primary/80 hover:bg-white/10' : 'text-primary hover:text-primary/80 hover:bg-slate-100'
                      }`} 
                      title="Lihat Raport"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'curriculum' | 'schedule' | 'tasks' | 'report'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`p-4 md:p-8 space-y-8 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span className="text-gradient">Dashboard Guru</span>
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Selamat datang kembali, Bapak/Ibu Guru</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className={`flex p-1 rounded-xl border backdrop-blur-md overflow-x-auto max-w-full ${
              isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'students' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manajemen Siswa
            </button>
            <button 
              onClick={() => setActiveTab('curriculum')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'curriculum' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kurikulum & LKS
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'schedule' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jadwal Pelajaran
            </button>
            <button 
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'tasks' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manajemen Tugas
            </button>
            <button 
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'report' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Raport Siswa
            </button>
          </div>
          
          <button 
            onClick={logout}
            className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Siswa" 
              value="142" 
              icon={Users} 
              color="text-blue-400" 
              gradient="from-blue-500 to-blue-600" 
            />
            <StatCard 
              title="Kelas Ajar" 
              value="4" 
              icon={BookOpen} 
              color="text-emerald-400" 
              gradient="from-emerald-500 to-emerald-600" 
            />
            <StatCard 
              title="Jadwal Hari Ini" 
              value="2 Kelas" 
              icon={Calendar} 
              color="text-amber-400" 
              gradient="from-amber-500 to-amber-600" 
            />
            <StatCard 
              title="Rata-rata Nilai" 
              value="84.5" 
              icon={Award} 
              color="text-purple-400" 
              gradient="from-purple-500 to-purple-600" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 p-6 rounded-2xl transition-all duration-300 ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
              <h3 className={`text-lg font-semibold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Statistik Kehadiran Mingguan
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barGap={8}>
                    <defs>
                      <linearGradient id="gradHadir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="gradSakit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#d97706" stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="gradIzin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}} />
                    <Bar dataKey="hadir" name="Hadir" fill="url(#gradHadir)" radius={[6, 6, 0, 0]} maxBarSize={50} animationDuration={1500} />
                    <Bar dataKey="sakit" name="Sakit" fill="url(#gradSakit)" radius={[6, 6, 0, 0]} maxBarSize={50} animationDuration={1500} />
                    <Bar dataKey="izin" name="Izin" fill="url(#gradIzin)" radius={[6, 6, 0, 0]} maxBarSize={50} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`p-6 flex flex-col h-full rounded-2xl transition-all duration-300 ${isDarkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Jadwal Mengajar
                </h3>
                <button className={`p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-0 relative">
                {/* Timeline line */}
                <div className={`absolute left-[19px] top-4 bottom-4 w-0.5 rounded-full ${isDarkMode ? 'bg-gradient-to-b from-primary/50 via-white/10 to-transparent' : 'bg-gradient-to-b from-primary/50 via-slate-200 to-transparent'}`} />

                {[
                  { time: '07:00 - 08:30', class: 'X IPA 1', subject: 'Matematika', status: 'Selesai' },
                  { time: '08:30 - 10:00', class: 'XI IPS 2', subject: 'Matematika', status: 'Sedang Berlangsung' },
                  { time: '10:15 - 11:45', class: 'XII IPA 1', subject: 'Fisika', status: 'Akan Datang' },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start group pb-6 last:pb-0">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 mt-1 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-300 ${
                      item.status === 'Sedang Berlangsung' ? 'bg-primary shadow-[0_0_20px_rgba(129,140,248,0.4)] scale-110 border-[#0f172a]' : 
                      item.status === 'Selesai' ? 'bg-emerald-500/20 border-emerald-500/20' : 
                      isDarkMode ? 'bg-slate-800 border-slate-900' : 'bg-slate-100 border-white'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        item.status === 'Sedang Berlangsung' ? 'bg-white animate-pulse' : 
                        item.status === 'Selesai' ? 'bg-emerald-500' : isDarkMode ? 'bg-slate-600' : 'bg-slate-400'
                      }`} />
                    </div>

                    <div className={`ml-14 flex-1 p-4 transition-all duration-300 group-hover:-translate-y-1 border-l-2 rounded-xl ${
                      item.status === 'Sedang Berlangsung' ? (isDarkMode ? 'bg-white/10 border-primary shadow-lg shadow-primary/5' : 'bg-primary/5 border-primary shadow-lg shadow-primary/5') : 
                      isDarkMode ? 'glass-card hover:bg-white/10 border-transparent' : 'bg-white border-slate-200 hover:shadow-md'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className={`font-bold text-lg ${item.status === 'Sedang Berlangsung' ? (isDarkMode ? 'text-white' : 'text-primary') : (isDarkMode ? 'text-slate-200' : 'text-slate-900')}`}>
                            {item.subject}
                          </h4>
                          <p className={`text-sm flex items-center mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            <Users className="w-3.5 h-3.5 mr-1.5" />
                            {item.class}
                          </p>
                        </div>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                          item.status === 'Sedang Berlangsung' ? 'bg-primary/20 text-primary border-primary/20' : 
                          item.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          isDarkMode ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {item.status === 'Sedang Berlangsung' ? 'Live' : item.status}
                        </span>
                      </div>
                      
                      <div className={`flex items-center justify-between pt-3 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className={`flex items-center text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <Clock className="w-3.5 h-3.5 mr-2 text-primary" />
                          {item.time}
                        </div>
                        {item.status === 'Sedang Berlangsung' && (
                          <button className="text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/80 transition shadow-lg shadow-primary/20">
                            Masuk Kelas
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'students' ? (
        <StudentManagement />
      ) : activeTab === 'curriculum' ? (
        <CurriculumManagement />
      ) : activeTab === 'schedule' ? (
        <ScheduleManagement />
      ) : activeTab === 'tasks' ? (
        <TaskManagement />
      ) : (
        <ReportCardManagement />
      )}
      </div>
    </ThemeContext.Provider>
  );
};

export default TeacherDashboard;
