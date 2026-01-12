import React, { useState, useEffect } from 'react';
import { 
  Phone, Clock, MapPin, Menu, X, Calendar, Search, 
  ChevronRight, Activity, Users, Baby, Stethoscope, 
  Syringe, Car, ShieldCheck, Award, Facebook, Youtube, 
  Mail, ArrowRight, Microscope, HeartPulse, Lock, Trash2, PlusCircle, LogOut,
  Settings, FileText, Briefcase, Layout, Edit, Globe, Newspaper, Info, Image
} from 'lucide-react';

// --- PHẦN KẾT NỐI FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// ⚠️ QUAN TRỌNG: Dán cấu hình Firebase của bạn vào đây
const firebaseConfig = {
  // apiKey: "AIzaSyCm11kZ3YojvvPWi2zdYIgm5MtgmxsWM2s",
  // authDomain: "benhvien153-web.firebaseapp.com",
  // projectId: "benhvien153-web",
};

// Khởi tạo Firebase
let db = null;
let auth = null;
if (firebaseConfig.apiKey) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

// --- BỘ ICON CHO PHÉP CHỌN TRONG ADMIN ---
const ICON_MAP = {
  "Activity": <Activity />,
  "Stethoscope": <Stethoscope />,
  "Baby": <Baby />,
  "Users": <Users />,
  "Microscope": <Microscope />,
  "Syringe": <Syringe />,
  "HeartPulse": <HeartPulse />,
  "ShieldCheck": <ShieldCheck />,
  "Car": <Car />
};

const App = () => {
  // --- STATE QUẢN LÝ CHUNG ---
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState(null);
  const [activeAdminTab, setActiveAdminTab] = useState('doctors');
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- DATA TỪ DATABASE ---
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [packages, setPackages] = useState([]);
  const [news, setNews] = useState([]);
  
  const [heroContent, setHeroContent] = useState({
    title1: "Sức Khỏe Của Bạn",
    title2: "Sứ Mệnh Của Chúng Tôi",
    desc: "Hệ thống y tế chuẩn quốc tế với trang thiết bị hiện đại và đội ngũ chuyên gia tận tâm."
  });
  
  // Cập nhật state General để chứa Logo và Tên trang
  const [generalInfo, setGeneralInfo] = useState({
    siteName: "BỆNH VIỆN 153", // Tên chính
    siteSubName: "Đa Khoa Quốc Tế", // Tên phụ
    logoUrl: "", // Link logo (nếu có)
    phone: "0207.388.153",
    email: "contact@benhvien153.com",
    address: "Tổ 13, P. Tân Hà, TP. Tuyên Quang",
    workingHours: "7:00 - 17:00"
  });

  const [aboutContent, setAboutContent] = useState({
    title: "Về Bệnh Viện 153",
    desc: "Trải qua hơn 15 năm hình thành và phát triển, Bệnh viện Đa khoa 153 tự hào là đơn vị y tế tư nhân uy tín hàng đầu tại Tuyên Quang.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  });

  // --- STATE CHO FORM ADMIN ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [newDoctor, setNewDoctor] = useState({ name: '', role: '', img: '' });
  const [newSpecialty, setNewSpecialty] = useState({ title: '', desc: '', icon: 'Activity' });
  const [newPackage, setNewPackage] = useState({ title: '', price: '', features: '' });
  const [newNews, setNewNews] = useState({ title: '', summary: '', date: '', img: '' });

  // --- KHỞI TẠO & FETCH DATA ---
  useEffect(() => {
    fetchData();

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, []);

  const fetchData = async () => {
    if (db) {
      try {
        const [docSnap, specSnap, pkgSnap, newsSnap] = await Promise.all([
          getDocs(collection(db, "doctors")),
          getDocs(collection(db, "specialties")),
          getDocs(collection(db, "packages")),
          getDocs(collection(db, "news"))
        ]);

        setDoctors(docSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setSpecialties(specSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setPackages(pkgSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setNews(newsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const settingsSnap = await getDocs(collection(db, "settings"));
        settingsSnap.forEach(doc => {
          if (doc.id === 'hero') setHeroContent(doc.data());
          if (doc.id === 'general') {
            // Merge với default để tránh lỗi nếu DB thiếu trường mới
            setGeneralInfo(prev => ({ ...prev, ...doc.data() }));
          }
          if (doc.id === 'about') setAboutContent(doc.data());
        });

      } catch (error) {
        console.error("Lỗi tải data:", error);
      }
    } else {
      // DỮ LIỆU MẪU (DEMO)
      setDoctors([
        { id: 1, name: "BS.CKII Nguyễn Văn A", role: "Giám Đốc", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" },
        { id: 2, name: "ThS.BS Trần Thị B", role: "Trưởng Khoa Nội", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" }
      ]);
      setSpecialties([
        { id: 1, title: "Nội Khoa", desc: "Chẩn đoán bệnh lý nội khoa.", icon: "Activity" },
        { id: 2, title: "Nhi Khoa", desc: "Chăm sóc sức khỏe trẻ em.", icon: "Baby" },
        { id: 3, title: "Xét Nghiệm", desc: "Phân tích máu, sinh hóa.", icon: "Syringe" }
      ]);
      setPackages([
        { id: 1, title: "Khám Tổng Quát", price: "1.500.000đ", features: "Xét nghiệm máu, Siêu âm, X-Quang" },
        { id: 2, title: "Tầm Soát Ung Thư", price: "3.200.000đ", features: "MRI, CT-Scanner, Marker ung thư" }
      ]);
      setNews([
        { id: 1, title: "Lịch nghỉ lễ 30/4 - 1/5", summary: "Bệnh viện thông báo lịch nghỉ lễ...", date: "2024-04-20", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400" }
      ]);
    }
    setLoading(false);
  };

  // --- HÀM XỬ LÝ ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (auth) {
      try { await signInWithEmailAndPassword(auth, email, password); setLoginError(''); } 
      catch { setLoginError('Sai thông tin đăng nhập'); }
    } else {
      if (email === 'admin' && password === '123') setUser({ email: 'admin@demo.com' });
      else setLoginError('Demo: admin / 123');
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    setUser(null);
    setIsAdminMode(false);
  };

  const addItem = async (collName, item, setState, state) => {
    if (db) { await addDoc(collection(db, collName), item); fetchData(); }
    else { setState([...state, { ...item, id: Date.now() }]); }
  };
  const deleteItem = async (collName, id, setState, state) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;
    if (db) { await deleteDoc(doc(db, collName, id)); fetchData(); }
    else { setState(state.filter(item => item.id !== id)); }
  };
  const saveSettings = async (docId, data, successMsg) => {
    if (db) {
      await setDoc(doc(db, "settings", docId), data); 
      alert(successMsg + " (Đã lưu vào Database)");
    } else {
      alert(successMsg + " (Chế độ Demo - F5 sẽ mất)");
    }
  };

  // Helper render Logo
  const renderLogo = (isSmall = false) => {
    if (generalInfo.logoUrl) {
      return <img src={generalInfo.logoUrl} alt="Logo" className={`${isSmall ? 'h-8' : 'h-10 md:h-12'} w-auto object-contain rounded-lg`} />;
    }
    return (
      <div className={`bg-blue-700 ${isSmall ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg flex items-center justify-center shadow-lg`}>
        <span className="text-white font-extrabold text-sm">Logo</span>
      </div>
    );
  };

  // --- ADMIN VIEW ---
  if (isAdminMode) {
    if (!user) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input className="w-full p-2 border rounded" placeholder="Email (admin)" value={email} onChange={e=>setEmail(e.target.value)} />
              <input className="w-full p-2 border rounded" type="password" placeholder="Pass (123)" value={password} onChange={e=>setPassword(e.target.value)} />
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Đăng nhập</button>
            </form>
            <button onClick={() => setIsAdminMode(false)} className="w-full mt-2 text-sm text-slate-500">Quay lại Web khách</button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 overflow-y-auto">
          <div className="p-6 font-bold text-xl border-b border-slate-700 flex items-center gap-2">
            <Settings className="text-blue-400" /> QUẢN TRỊ
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <div className="text-xs text-slate-500 font-bold uppercase mt-2 mb-1 px-2">Cấu hình chung</div>
            <button onClick={() => setActiveAdminTab('general')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'general' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Globe size={18}/> Thông tin & Logo
            </button>
            
            <div className="text-xs text-slate-500 font-bold uppercase mt-6 mb-1 px-2">Nội dung</div>
            <button onClick={() => setActiveAdminTab('content')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'content' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <FileText size={18}/> Trang Chủ (Hero)
            </button>
            <button onClick={() => setActiveAdminTab('about')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'about' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Info size={18}/> Trang Giới Thiệu
            </button>

            <div className="text-xs text-slate-500 font-bold uppercase mt-6 mb-1 px-2">Danh mục</div>
            <button onClick={() => setActiveAdminTab('doctors')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'doctors' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Users size={18}/> Bác sĩ
            </button>
            <button onClick={() => setActiveAdminTab('specialties')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'specialties' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Layout size={18}/> Chuyên khoa
            </button>
            <button onClick={() => setActiveAdminTab('packages')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'packages' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Briefcase size={18}/> Gói khám
            </button>
            <button onClick={() => setActiveAdminTab('news')} className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${activeAdminTab === 'news' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <Newspaper size={18}/> Tin tức
            </button>
          </nav>
          <div className="p-4 border-t border-slate-700">
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full">
              <LogOut size={16}/> Đăng xuất
            </button>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          {/* TAB: THÔNG TIN CHUNG (Updated) */}
          {activeAdminTab === 'general' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông Tin & Cấu Hình Logo</h2>
              <div className="bg-white p-6 rounded shadow max-w-2xl">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Image size={18}/> Cấu hình Nhận diện</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-sm font-medium">Link Logo (URL ảnh)</label>
                        <input className="w-full border p-2 rounded bg-white" placeholder="https://..." value={generalInfo.logoUrl || ''} onChange={e => setGeneralInfo({...generalInfo, logoUrl: e.target.value})} />
                        <p className="text-xs text-slate-500 mt-1">Nên dùng ảnh PNG nền trong suốt.</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Tên Trang Web (Chính)</label>
                        <input className="w-full border p-2 rounded bg-white" value={generalInfo.siteName || ''} onChange={e => setGeneralInfo({...generalInfo, siteName: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Tên Phụ (Slogan)</label>
                        <input className="w-full border p-2 rounded bg-white" value={generalInfo.siteSubName || ''} onChange={e => setGeneralInfo({...generalInfo, siteSubName: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-700 mt-6 mb-2">Thông tin liên hệ</h4>
                  <div><label className="text-sm font-medium">Hotline</label><input className="w-full border p-2 rounded" value={generalInfo.phone} onChange={e => setGeneralInfo({...generalInfo, phone: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Email</label><input className="w-full border p-2 rounded" value={generalInfo.email} onChange={e => setGeneralInfo({...generalInfo, email: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Địa chỉ</label><input className="w-full border p-2 rounded" value={generalInfo.address} onChange={e => setGeneralInfo({...generalInfo, address: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Giờ làm việc</label><input className="w-full border p-2 rounded" value={generalInfo.workingHours} onChange={e => setGeneralInfo({...generalInfo, workingHours: e.target.value})} /></div>
                  
                  <button onClick={() => saveSettings('general', generalInfo, "Đã lưu thông tin chung")} className="bg-blue-600 text-white px-6 py-2 rounded font-bold w-full mt-4">Lưu Cấu Hình</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BÁC SĨ */}
          {activeAdminTab === 'doctors' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Quản Lý Bác Sĩ</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded shadow h-fit">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><PlusCircle size={18}/> Thêm mới</h3>
                  <form onSubmit={(e) => { e.preventDefault(); addItem('doctors', newDoctor, setDoctors, doctors); setNewDoctor({name:'', role:'', img:''}); }} className="space-y-3">
                    <input placeholder="Tên bác sĩ" required className="w-full border p-2 rounded" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} />
                    <input placeholder="Chức vụ" required className="w-full border p-2 rounded" value={newDoctor.role} onChange={e => setNewDoctor({...newDoctor, role: e.target.value})} />
                    <input placeholder="Link ảnh" className="w-full border p-2 rounded" value={newDoctor.img} onChange={e => setNewDoctor({...newDoctor, img: e.target.value})} />
                    <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Lưu</button>
                  </form>
                </div>
                <div className="lg:col-span-2 space-y-2">
                  {doctors.map(d => (
                    <div key={d.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                      <div className="flex items-center gap-3"><img src={d.img||"https://via.placeholder.com/50"} className="w-10 h-10 rounded-full object-cover"/><div><b>{d.name}</b><br/><span className="text-sm text-slate-500">{d.role}</span></div></div>
                      <button onClick={() => deleteItem('doctors', d.id, setDoctors, doctors)} className="text-red-500 bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CHUYÊN KHOA */}
          {activeAdminTab === 'specialties' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Quản Lý Chuyên Khoa</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded shadow h-fit">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><PlusCircle size={18}/> Thêm mới</h3>
                  <form onSubmit={(e) => { e.preventDefault(); addItem('specialties', newSpecialty, setSpecialties, specialties); setNewSpecialty({title:'', desc:'', icon:'Activity'}); }} className="space-y-3">
                    <input placeholder="Tên khoa" required className="w-full border p-2 rounded" value={newSpecialty.title} onChange={e => setNewSpecialty({...newSpecialty, title: e.target.value})} />
                    <textarea placeholder="Mô tả" className="w-full border p-2 rounded" value={newSpecialty.desc} onChange={e => setNewSpecialty({...newSpecialty, desc: e.target.value})} />
                    <select className="w-full border p-2 rounded" value={newSpecialty.icon} onChange={e => setNewSpecialty({...newSpecialty, icon: e.target.value})}>
                      {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Lưu</button>
                  </form>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  {specialties.map(s => (
                    <div key={s.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500 relative">
                      <div className="flex items-center gap-2 mb-2 text-blue-600">{ICON_MAP[s.icon]||<Activity/>} <b>{s.title}</b></div>
                      <p className="text-sm text-slate-600">{s.desc}</p>
                      <button onClick={() => deleteItem('specialties', s.id, setSpecialties, specialties)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: GÓI KHÁM */}
          {activeAdminTab === 'packages' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Quản Lý Gói Khám</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded shadow h-fit">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><PlusCircle size={18}/> Thêm mới</h3>
                  <form onSubmit={(e) => { e.preventDefault(); addItem('packages', newPackage, setPackages, packages); setNewPackage({title:'', price:'', features:''}); }} className="space-y-3">
                    <input placeholder="Tên gói" required className="w-full border p-2 rounded" value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} />
                    <input placeholder="Giá tiền" required className="w-full border p-2 rounded" value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} />
                    <textarea placeholder="Dịch vụ (phẩy để ngăn cách)" className="w-full border p-2 rounded" value={newPackage.features} onChange={e => setNewPackage({...newPackage, features: e.target.value})} />
                    <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Lưu</button>
                  </form>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  {packages.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between">
                      <div><div className="font-bold text-blue-800">{p.title}</div><div className="text-red-500 font-bold">{p.price}</div></div>
                      <button onClick={() => deleteItem('packages', p.id, setPackages, packages)} className="text-red-500 bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: TIN TỨC */}
          {activeAdminTab === 'news' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Quản Lý Tin Tức</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded shadow h-fit">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><PlusCircle size={18}/> Thêm tin mới</h3>
                  <form onSubmit={(e) => { e.preventDefault(); addItem('news', newNews, setNews, news); setNewNews({title:'', summary:'', date:'', img:''}); }} className="space-y-3">
                    <input placeholder="Tiêu đề" required className="w-full border p-2 rounded" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
                    <textarea placeholder="Tóm tắt" className="w-full border p-2 rounded" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} />
                    <input type="date" className="w-full border p-2 rounded" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} />
                    <input placeholder="Link ảnh" className="w-full border p-2 rounded" value={newNews.img} onChange={e => setNewNews({...newNews, img: e.target.value})} />
                    <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Đăng bài</button>
                  </form>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {news.map(n => (
                    <div key={n.id} className="bg-white p-4 rounded shadow flex gap-4">
                      <img src={n.img || "https://via.placeholder.com/100"} className="w-24 h-24 object-cover rounded bg-slate-200 flex-shrink-0"/>
                      <div className="flex-1">
                        <div className="font-bold">{n.title}</div>
                        <div className="text-xs text-slate-400 mb-2">{n.date}</div>
                        <p className="text-sm text-slate-600 line-clamp-2">{n.summary}</p>
                      </div>
                      <button onClick={() => deleteItem('news', n.id, setNews, news)} className="text-red-500 h-fit"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO CONTENT */}
          {activeAdminTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Nội Dung Trang Chủ (Hero)</h2>
              <div className="bg-white p-6 rounded shadow max-w-2xl">
                <div className="space-y-4">
                  <div><label className="text-sm font-medium">Tiêu đề 1 (Đen)</label><input className="w-full border p-2 rounded" value={heroContent.title1} onChange={e => setHeroContent({...heroContent, title1: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Tiêu đề 2 (Xanh)</label><input className="w-full border p-2 rounded" value={heroContent.title2} onChange={e => setHeroContent({...heroContent, title2: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Mô tả ngắn</label><textarea rows={3} className="w-full border p-2 rounded" value={heroContent.desc} onChange={e => setHeroContent({...heroContent, desc: e.target.value})} /></div>
                  <button onClick={() => saveSettings('hero', heroContent, "Đã lưu nội dung Hero")} className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Lưu Nội Dung</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT CONTENT */}
          {activeAdminTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Nội Dung Trang Giới Thiệu</h2>
              <div className="bg-white p-6 rounded shadow max-w-2xl">
                <div className="space-y-4">
                  <div><label className="text-sm font-medium">Tiêu đề phần Giới thiệu</label><input className="w-full border p-2 rounded" value={aboutContent.title} onChange={e => setAboutContent({...aboutContent, title: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Nội dung chi tiết</label><textarea rows={5} className="w-full border p-2 rounded" value={aboutContent.desc} onChange={e => setAboutContent({...aboutContent, desc: e.target.value})} /></div>
                  <div><label className="text-sm font-medium">Link ảnh minh họa</label><input className="w-full border p-2 rounded" value={aboutContent.img} onChange={e => setAboutContent({...aboutContent, img: e.target.value})} /></div>
                  <button onClick={() => saveSettings('about', aboutContent, "Đã lưu nội dung Giới thiệu")} className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Lưu Nội Dung</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // --- PUBLIC VIEW (Updated) ---
  return (
    <div className="font-sans text-slate-600 antialiased bg-white">
      {/* 1. Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm border-b border-slate-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-bold animate-pulse"><Phone size={14} className="inline mr-1"/> {generalInfo.phone}</span>
            <span className="hidden md:inline"><Clock size={14} className="inline mr-1"/> {generalInfo.workingHours}</span>
          </div>
          <button onClick={() => setIsAdminMode(true)} className="flex items-center gap-1 hover:text-white transition-colors text-xs font-medium">
            <Lock size={12}/> Admin
          </button>
        </div>
      </div>

      {/* 2. Header (Dynamic Logo & Name) */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white py-4 shadow-sm`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {renderLogo()}
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg leading-none">{generalInfo.siteName}</span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase">{generalInfo.siteSubName}</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-700">
            {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Gói khám', 'Bác sĩ', 'Tin tức'].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-blue-700 transition-colors py-2">{item}</a>
            ))}
          </nav>
          <div className="flex gap-4">
             <button className="hidden md:flex bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all items-center gap-2">
              <Calendar size={18} /> Đặt Lịch
            </button>
             <button className="lg:hidden text-slate-800" onClick={()=>setIsMenuOpen(!isMenuOpen)}>{isMenuOpen?<X/>:<Menu/>}</button>
          </div>
        </div>
         {isMenuOpen && (
          <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-4">
            {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Gói khám', 'Bác sĩ', 'Tin tức'].map(item => <a key={item} href="#" className="font-bold">{item}</a>)}
          </div>
        )}
      </header>

      {/* 3. Hero */}
      <section className="pt-12 pb-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-white border border-blue-100 rounded-full text-sm font-semibold text-blue-800 shadow-sm">
              🏥 {generalInfo.siteName}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              {heroContent.title1} <br/><span className="text-blue-700">{heroContent.title2}</span>
            </h1>
            <p className="text-lg text-slate-600">{heroContent.desc}</p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all">Đăng Ký Khám</button>
            </div>
          </div>
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl border-4 border-white" alt="Team" />
          </div>
        </div>
      </section>

      {/* 4. Giới thiệu */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div><img src={aboutContent.img} className="rounded-2xl shadow-xl w-full object-cover h-96" alt="About"/></div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{aboutContent.title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">{aboutContent.desc}</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3"><ShieldCheck className="text-green-500"/> Quy trình khám 1 chiều khép kín</li>
              <li className="flex items-center gap-3"><Award className="text-green-500"/> Đạt chuẩn chất lượng Bộ Y Tế</li>
            </ul>
            <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">Xem chi tiết <ArrowRight/></button>
          </div>
        </div>
      </section>

      {/* 5. Chuyên khoa */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl font-extrabold">Chuyên Khoa Mũi Nhọn</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((spec) => (
              <div key={spec.id} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl border border-slate-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {ICON_MAP[spec.icon] || <Activity />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{spec.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gói Khám */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Các Gói Khám Nổi Bật</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-blue-700">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">{pkg.price}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{pkg.features}</p>
                <button className="w-full py-2 border border-blue-600 text-blue-600 rounded font-bold hover:bg-blue-600 hover:text-white transition-colors">Xem chi tiết</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bác sĩ */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Đội Ngũ Bác Sĩ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={doc.img || "https://via.placeholder.com/400x500"} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-blue-600 text-sm font-medium">{doc.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Tin tức */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl font-extrabold">Tin Tức Y Tế</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(n => (
              <div key={n.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4">
                  <img src={n.img||"https://via.placeholder.com/400"} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="text-xs text-blue-600 font-bold mb-2">{n.date}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">{n.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{n.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              {renderLogo(true)} {generalInfo.siteName}
            </div>
            <p className="text-sm">Đơn vị y tế uy tín hàng đầu.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Liên Hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>{generalInfo.address}</li>
              <li>{generalInfo.phone}</li>
              <li>{generalInfo.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Dịch Vụ</h4>
            <ul className="space-y-2 text-sm">
              <li>Khám tổng quát</li>
              <li>Tầm soát ung thư</li>
              <li>Tiêm chủng</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Giờ Làm Việc</h4>
            <p className="text-sm">{generalInfo.workingHours}</p>
            <p className="text-sm text-red-400 font-bold mt-2">Cấp cứu 24/7</p>
          </div>
        </div>
        <div className="text-center text-sm border-t border-slate-800 pt-8">&copy; 2024 {generalInfo.siteName}. Hệ thống quản lý bởi Team IT.</div>
      </footer>
    </div>
  );

  return isAdminMode ? null : <PublicView />;
};

export default App;