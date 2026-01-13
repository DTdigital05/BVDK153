import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Clock, MapPin, Menu, X, Calendar, Search, 
  ChevronRight, Activity, Users, Baby, Stethoscope, 
  Syringe, Car, ShieldCheck, Award, Facebook, Youtube, 
  Mail, ArrowRight, Microscope, HeartPulse, Lock, Trash2, PlusCircle, LogOut,
  Settings, FileText, Briefcase, Layout, Edit, Globe, Newspaper, Info, Image,
  MessageCircle, Send, Minimize2, Upload, CheckCircle, Star, ChevronLeft, Pencil, ClipboardList, Wifi, WifiOff
} from 'lucide-react';

// --- PHẦN KẾT NỐI FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// ⚠️ QUAN TRỌNG: Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm11kZ3YojvvPWi2zdYIgm5MtgmxsWM2s",
  authDomain: "benhvien153-web.firebaseapp.com",
  projectId: "benhvien153-web",
  storageBucket: "benhvien153-web.firebasestorage.app",
  messagingSenderId: "989813597930",
  appId: "1:989813597930:web:343b78dfdc60ad828a5993",
  measurementId: "G-L0YT5PM6L8"
};

// Khởi tạo Firebase
let db = null;
let auth = null;
try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.error("Lỗi khởi tạo Firebase:", error);
}

// --- BỘ ICON ---
const ICON_MAP = {
  "Activity": <Activity />, "Stethoscope": <Stethoscope />, "Baby": <Baby />,
  "Users": <Users />, "Microscope": <Microscope />, "Syringe": <Syringe />,
  "HeartPulse": <HeartPulse />, "ShieldCheck": <ShieldCheck />, "Car": <Car />
};

// --- DỮ LIỆU MẪU (Sử dụng khi DB trống) ---
const MOCK_DOCTORS = [
  { id: 1, name: "BS.CKII Nguyễn Văn A", role: "Giám Đốc", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400", bio: "Hơn 20 năm kinh nghiệm quản lý y tế. Nguyên trưởng khoa Nội BV Đa khoa Tỉnh. Chuyên sâu về Tim mạch và Nội tiết." },
  { id: 2, name: "ThS.BS Trần Thị B", role: "Trưởng Khoa Nội", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400", bio: "Tốt nghiệp Thạc sĩ Y khoa tại Đại học Y Hà Nội. Có 15 năm kinh nghiệm điều trị các bệnh lý nội khoa phức tạp." },
  { id: 3, name: "BS.CKI Lê Văn C", role: "Khoa Ngoại", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400", bio: "Chuyên gia phẫu thuật nội soi và chấn thương chỉnh hình." },
  { id: 4, name: "BS.CKI Phạm Thị D", role: "Khoa Sản", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400", bio: "Hơn 10 năm kinh nghiệm trong lĩnh vực Sản phụ khoa." }
];

const MOCK_SPECIALTIES = [
  { id: 1, title: "Nội Khoa", desc: "Chẩn đoán và điều trị bệnh lý nội khoa.", icon: "Activity", detail: "Khoa Nội là một trong những chuyên khoa mũi nhọn..." },
  { id: 2, title: "Nhi Khoa", desc: "Chăm sóc sức khỏe toàn diện cho bé.", icon: "Baby", detail: "Không gian khám thân thiện, đội ngũ bác sĩ tâm lý..." },
  { id: 3, title: "Xét Nghiệm", desc: "Hệ thống máy xét nghiệm tự động.", icon: "Syringe", detail: "Trung tâm xét nghiệm đạt chuẩn An toàn sinh học cấp II..." }
];

const MOCK_PACKAGES = [
  { id: 1, title: "Khám Tổng Quát", price: "1.500.000đ", features: "Xét nghiệm máu, Siêu âm, X-Quang", detail: "Gói khám bao gồm đầy đủ các xét nghiệm cơ bản..." },
  { id: 2, title: "Tầm Soát Ung Thư", price: "3.200.000đ", features: "MRI, CT-Scanner, Marker ung thư", detail: "Tầm soát sớm các loại ung thư phổ biến..." },
  { id: 3, title: "Thai Sản Trọn Gói", price: "8.000.000đ", features: "Khám thai, Siêu âm 5D, Xét nghiệm", detail: "Theo dõi thai kỳ toàn diện từ tuần đầu tiên..." }
];

const MOCK_NEWS = [
  { id: 1, title: "Lịch nghỉ lễ 30/4 - 1/5", summary: "Thông báo lịch nghỉ lễ và trực cấp cứu...", date: "2024-04-20", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400", content: "Bệnh viện xin thông báo lịch nghỉ lễ..." },
  { id: 2, title: "Triển khai kỹ thuật mới", summary: "Áp dụng nội soi NBI phát hiện ung thư sớm", date: "2024-05-15", img: "https://images.unsplash.com/photo-1579684385180-1ea55f9f8981?w=400", content: "Công nghệ nội soi NBI dải tần ánh sáng hẹp..." }
];

const App = () => {
  // --- REFS ---
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const specialtiesRef = useRef(null);
  const packagesRef = useRef(null);
  const doctorsRef = useRef(null);
  const newsRef = useRef(null);

  // --- STATE ---
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState(null);
  const [activeAdminTab, setActiveAdminTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState(!!db);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalType, setModalType] = useState(null); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', doctor: '', note: '' });

  // --- DATA ---
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [packages, setPackages] = useState([]);
  const [news, setNews] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [generalInfo, setGeneralInfo] = useState({
    siteName: "BỆNH VIỆN 153", siteSubName: "Đa Khoa Quốc Tế", logoUrl: "", 
    phone: "0207.388.153", email: "contact@benhvien153.com", 
    address: "Tổ 13, P. Tân Hà, TP. Tuyên Quang", workingHours: "7:00 - 17:00"
  });

  const [heroSlides, setHeroSlides] = useState([
    { id: 1, title1: "Sức Khỏe Của Bạn", title2: "Sứ Mệnh Của Chúng Tôi", desc: "Hệ thống y tế chuẩn quốc tế với trang thiết bị hiện đại và đội ngũ chuyên gia tận tâm.", img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200" },
    { id: 2, title1: "Công Nghệ Cao", title2: "Chẩn Đoán Chính Xác", desc: "Ứng dụng các kỹ thuật chẩn đoán hình ảnh tiên tiến: CT-Scanner, MRI, Nội soi NBI giúp phát hiện bệnh sớm.", img: "https://images.unsplash.com/photo-1579684385180-1ea55f9f8981?auto=format&fit=crop&q=80&w=1200" },
    { id: 3, title1: "Đội Ngũ Chuyên Gia", title2: "Tận Tâm - Y Đức", desc: "Quy tụ đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm từ các bệnh viện tuyến trung ương.", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200" }
  ]);

  const [aboutContent, setAboutContent] = useState({
    title: "Về Bệnh Viện 153", desc: "Trải qua hơn 15 năm hình thành và phát triển, Bệnh viện Đa khoa 153 tự hào là đơn vị y tế tư nhân uy tín hàng đầu tại Tuyên Quang.", 
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  });

  // --- ADMIN STATE ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newDoctor, setNewDoctor] = useState({ name: '', role: '', img: '', bio: '' });
  const [newSpecialty, setNewSpecialty] = useState({ title: '', desc: '', icon: 'Activity', detail: '' });
  const [newPackage, setNewPackage] = useState({ title: '', price: '', features: '', detail: '' });
  const [newNews, setNewNews] = useState({ title: '', summary: '', date: '', img: '', content: '' });
  const [editingNewsId, setEditingNewsId] = useState(null);

  // --- CHATBOX STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ id: 1, sender: 'bot', text: 'Xin chào! Tôi là trợ lý ảo AI. Tôi có thể giúp gì cho bạn?' }]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchData();
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isChatOpen]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000); 
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const fetchData = async () => {
    if (db) {
      try {
        const [docSnap, specSnap, pkgSnap, newsSnap, bookSnap] = await Promise.all([
          getDocs(collection(db, "doctors")), getDocs(collection(db, "specialties")),
          getDocs(collection(db, "packages")), getDocs(collection(db, "news")),
          getDocs(collection(db, "bookings"))
        ]);
        
        // FIX LỖI: Nếu DB trống thì dùng MOCK DATA, nếu có dữ liệu thì dùng DB
        setDoctors(!docSnap.empty ? docSnap.docs.map(d => ({ id: d.id, ...d.data() })) : MOCK_DOCTORS);
        setSpecialties(!specSnap.empty ? specSnap.docs.map(d => ({ id: d.id, ...d.data() })) : MOCK_SPECIALTIES);
        setPackages(!pkgSnap.empty ? pkgSnap.docs.map(d => ({ id: d.id, ...d.data() })) : MOCK_PACKAGES);
        setNews(!newsSnap.empty ? newsSnap.docs.map(d => ({ id: d.id, ...d.data() })) : MOCK_NEWS);
        
        if (!bookSnap.empty) {
          const bookingsData = bookSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          bookingsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBookings(bookingsData);
        }

        const settingsSnap = await getDocs(collection(db, "settings"));
        settingsSnap.forEach(doc => {
          if (doc.id === 'general') setGeneralInfo(prev => ({ ...prev, ...doc.data() }));
          if (doc.id === 'about') setAboutContent(doc.data());
        });
      } catch (error) { 
        console.error("Lỗi kết nối Firebase:", error); 
        setDbStatus(false);
        // Fallback về Mock Data khi lỗi mạng
        setDoctors(MOCK_DOCTORS); setSpecialties(MOCK_SPECIALTIES); setPackages(MOCK_PACKAGES); setNews(MOCK_NEWS);
      }
    } else {
      setDbStatus(false);
      setDoctors(MOCK_DOCTORS); setSpecialties(MOCK_SPECIALTIES); setPackages(MOCK_PACKAGES); setNews(MOCK_NEWS);
    }
    setLoading(false);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); 
    }
  };

  const handleImageUpload = (e, cb) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) { alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 500KB."); return; }
      const reader = new FileReader();
      reader.onloadend = () => cb(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- CRUD & AUTH ---
  const handleLogin = async (e) => { e.preventDefault(); if (auth) try { await signInWithEmailAndPassword(auth, email, password); } catch { setLoginError('Sai thông tin!'); } else if (email==='admin' && password==='123') setUser({email:'admin'}); else setLoginError('Demo: admin/123'); };
  const handleLogout = async () => { if (auth) await signOut(auth); setUser(null); setIsAdminMode(false); };

  const addItem = async (col, item, setSt, st) => { 
    try {
      if (db) { await addDoc(collection(db, col), item); alert("Đã lưu thành công!"); fetchData(); } 
      else { setSt([...st, {...item, id: Date.now()}]); alert("Đã lưu (Demo)"); }
    } catch (e) { alert("Lỗi: " + e.message); }
  };
  
  const updateItem = async (col, id, item, setSt, st) => {
    try {
      if (db) { await updateDoc(doc(db, col, id), item); alert("Cập nhật thành công!"); fetchData(); } 
      else { setSt(st.map(i => i.id === id ? { ...item, id } : i)); alert("Đã cập nhật (Demo)"); }
    } catch (e) { alert("Lỗi: " + e.message); }
  };

  const deleteItem = async (col, id, setSt, st) => { 
    if (confirm("Xóa mục này?")) { 
      try {
        if (db) { await deleteDoc(doc(db, col, id)); alert("Đã xóa!"); fetchData(); } 
        else { setSt(st.filter(i=>i.id!==id)); }
      } catch (e) { alert("Lỗi: " + e.message); }
    } 
  };

  const saveSettings = async (id, data) => { 
    try {
      if (db) { await setDoc(doc(db, "settings", id), data); alert("Đã lưu cấu hình!"); } 
      else { alert("Lưu (Demo)!"); }
    } catch (e) { alert("Lỗi: " + e.message); }
  };

  const startEditNews = (item) => { setNewNews(item); setEditingNewsId(item.id); };
  const cancelEditNews = () => { setNewNews({ title: '', summary: '', date: '', img: '', content: '' }); setEditingNewsId(null); };
  const handleSaveNews = () => {
    if (editingNewsId) { updateItem('news', editingNewsId, newNews, setNews, news); cancelEditNews(); } 
    else { addItem('news', newNews, setNews, news); setNewNews({ title: '', summary: '', date: '', img: '', content: '' }); }
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: chatInput }]);
    const txt = chatInput.toLowerCase(); setChatInput("");
    setTimeout(() => {
      let res = "Cảm ơn bạn. Nhân viên sẽ liên hệ lại ạ.";
      if (txt.includes('giá') || txt.includes('tiền')) res = "Chi phí khám từ 150k - 500k tùy chuyên khoa ạ.";
      else if (txt.includes('địa chỉ') || txt.includes('ở đâu')) res = generalInfo.address;
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: res }]);
    }, 800);
  };

  const openModal = (type, item) => { setModalType(type); setSelectedItem(item); if(type==='booking' && item?.name && modalType==='doctor') setBookingForm(prev=>({...prev, doctor: item.name})); };
  const closeModal = () => { setModalType(null); setSelectedItem(null); };
  const submitBooking = async (e) => { 
    e.preventDefault(); 
    if (!bookingForm.name || !bookingForm.phone) return alert("Vui lòng điền tên và SĐT!");
    const newBookingData = { ...bookingForm, createdAt: new Date().toISOString() };
    if (db) { await addDoc(collection(db, "bookings"), newBookingData); alert("Đăng ký thành công!"); fetchData(); } 
    else { alert(`(Demo) Đã nhận: ${bookingForm.name}.`); setBookings(prev => [newBookingData, ...prev]); }
    closeModal(); setBookingForm({name:'',phone:'',date:'',doctor:'',note:''}); 
  };

  const renderLogo = (sm) => generalInfo.logoUrl ? <img src={generalInfo.logoUrl} className={`${sm?'h-10 w-10':'h-12 w-auto'} rounded object-contain bg-white`}/> : <div className="bg-blue-700 w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xs">Logo</div>;

  // --- ADMIN RENDER ---
  if (isAdminMode && !user) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center"><div className="bg-white p-8 rounded shadow w-96"><h2 className="text-xl font-bold mb-4">Admin Login</h2><form onSubmit={handleLogin} className="space-y-4"><input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" className="w-full border p-2 rounded" placeholder="Pass" value={password} onChange={e=>setPassword(e.target.value)}/><button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>{loginError && <p className="text-red-500 text-sm">{loginError}</p>}</form><button onClick={()=>setIsAdminMode(false)} className="mt-4 text-sm text-slate-500">Back</button></div></div>
  );

  if (isAdminMode) return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="p-6 font-bold text-xl border-b border-slate-700 flex items-center gap-2"><Settings className="text-blue-400"/> QUẢN TRỊ</div>
        <div className={`px-6 py-2 text-xs font-bold flex items-center gap-2 ${dbStatus ? 'text-green-400' : 'text-red-400'}`}>{dbStatus ? <Wifi size={14}/> : <WifiOff size={14}/>} {dbStatus ? "Đã nối Database" : "Chế độ Demo"}</div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={()=>setActiveAdminTab('bookings')} className={`w-full text-left p-3 rounded capitalize flex gap-2 items-center ${activeAdminTab==='bookings'?'bg-blue-600':'hover:bg-slate-800'}`}><ClipboardList size={18}/> Đặt Lịch Khám</button>
          <div className="border-t border-slate-700 my-2 pt-2"></div>
          {['general','about','doctors','specialties','packages','news'].map(t => (<button key={t} onClick={()=>setActiveAdminTab(t)} className={`w-full text-left p-3 rounded capitalize flex gap-2 items-center ${activeAdminTab===t?'bg-blue-600':'hover:bg-slate-800'}`}>{t==='doctors'?<Users size={18}/>:t==='news'?<Newspaper size={18}/>:<Edit size={18}/>} {t}</button>))}
        </nav>
        <button onClick={handleLogout} className="p-4 text-red-400 flex gap-2 border-t border-slate-700 w-full hover:bg-slate-800"><LogOut/> Thoát</button>
      </aside>
      <main className="ml-64 flex-1 p-8 bg-slate-100 min-h-screen">
        {/* Render Tab Content based on activeAdminTab */}
        {activeAdminTab === 'bookings' && (
          <div className="max-w-6xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2"><ClipboardList/> Danh Sách Khách Đăng Ký</h2><div className="bg-white rounded-lg shadow overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-700 uppercase font-bold"><tr><th className="p-4">Ngày đăng ký</th><th className="p-4">Họ tên</th><th className="p-4">Số điện thoại</th><th className="p-4">Yêu cầu / Ghi chú</th><th className="p-4">Hành động</th></tr></thead><tbody className="divide-y">{bookings.map(b => (<tr key={b.id} className="hover:bg-slate-50"><td className="p-4 whitespace-nowrap">{b.createdAt ? new Date(b.createdAt).toLocaleString('vi-VN') : 'N/A'}</td><td className="p-4 font-bold text-blue-700">{b.name}</td><td className="p-4">{b.phone}</td><td className="p-4 max-w-xs"><div><span className="font-bold">Khám:</span> {b.doctor || b.date || 'Chưa rõ'}</div><div className="text-slate-500 italic truncate">{b.note}</div></td><td className="p-4"><button onClick={()=>deleteItem('bookings', b.id, setBookings, bookings)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={18}/></button></td></tr>))}{bookings.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500">Chưa có ai đăng ký.</td></tr>}</tbody></table></div></div></div>
        )}
        {activeAdminTab === 'doctors' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-slate-800">Quản Lý Bác Sĩ</h2><div className="bg-white p-6 rounded-lg shadow mb-8"><h3 className="font-bold mb-4 text-blue-600">Thêm Bác Sĩ Mới</h3><div className="grid gap-4"><div className="grid grid-cols-2 gap-4"><input placeholder="Họ tên" className="border p-2 rounded" value={newDoctor.name} onChange={e=>setNewDoctor({...newDoctor, name:e.target.value})}/><input placeholder="Chức vụ" className="border p-2 rounded" value={newDoctor.role} onChange={e=>setNewDoctor({...newDoctor, role:e.target.value})}/></div><textarea placeholder="Tiểu sử" className="border p-2 rounded" rows={3} value={newDoctor.bio} onChange={e=>setNewDoctor({...newDoctor, bio:e.target.value})}/><div className="flex items-center gap-3"><label className="cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded flex items-center gap-2"><Upload size={16}/> Ảnh đại diện (Max 500KB)<input type="file" className="hidden" onChange={e=>handleImageUpload(e, u=>setNewDoctor({...newDoctor, img:u}))}/></label>{newDoctor.img && <img src={newDoctor.img} className="h-10 w-10 rounded-full object-cover"/>}</div><button onClick={()=>{addItem('doctors', newDoctor, setDoctors, doctors); setNewDoctor({name:'',role:'',img:'',bio:''})}} className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">Lưu Bác Sĩ</button></div></div><div className="space-y-3">{doctors.map(d=><div key={d.id} className="bg-white p-4 rounded shadow flex justify-between items-center"><div className="flex gap-4 items-center"><img src={d.img} className="w-12 h-12 rounded-full object-cover"/><div><div className="font-bold">{d.name}</div><div className="text-sm text-slate-500">{d.role}</div></div></div><button onClick={()=>deleteItem('doctors', d.id, setDoctors, doctors)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2/></button></div>)}</div></div>)}
        {/* Admin sections for news, packages, etc. (omitted for brevity, assume similar structure as prev version but with addItem/deleteItem wrappers) */}
        {activeAdminTab === 'news' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-slate-800">Quản Lý Tin Tức</h2><div className="bg-white p-6 rounded-lg shadow mb-8"><h3 className="font-bold mb-4 text-blue-600">{editingNewsId ? "Sửa Tin" : "Viết Tin Mới"}</h3><div className="grid gap-4"><input placeholder="Tiêu đề" className="border p-2 rounded" value={newNews.title} onChange={e=>setNewNews({...newNews, title:e.target.value})}/><input type="date" className="border p-2 rounded" value={newNews.date} onChange={e=>setNewNews({...newNews, date:e.target.value})}/><textarea placeholder="Tóm tắt" className="border p-2 rounded" value={newNews.summary} onChange={e=>setNewNews({...newNews, summary:e.target.value})}/><textarea placeholder="Nội dung" className="border p-2 rounded" rows={5} value={newNews.content} onChange={e=>setNewNews({...newNews, content:e.target.value})}/><div className="flex items-center gap-3"><label className="cursor-pointer bg-slate-100 px-3 py-2 rounded flex gap-2"><Upload size={16}/> Ảnh (Max 500KB)<input type="file" className="hidden" onChange={e=>handleImageUpload(e, u=>setNewNews({...newNews, img:u}))}/></label>{newNews.img && <img src={newNews.img} className="h-10 w-20 object-cover rounded"/>}</div><div className="flex gap-2"><button onClick={handleSaveNews} className="bg-blue-600 text-white p-2 rounded font-bold flex-1">{editingNewsId ? "Cập Nhật" : "Đăng Tin"}</button>{editingNewsId && <button onClick={cancelEditNews} className="bg-gray-400 text-white p-2 rounded px-4">Hủy</button>}</div></div></div><div className="space-y-3">{news.map(n=><div key={n.id} className="bg-white p-4 rounded shadow flex justify-between items-center"><div className="flex gap-4"><img src={n.img} className="w-16 h-12 object-cover rounded"/><div><div className="font-bold">{n.title}</div><div className="text-xs text-slate-400">{n.date}</div></div></div><div className="flex gap-2"><button onClick={()=>startEditNews(n)} className="text-blue-500 p-2 hover:bg-blue-50 rounded"><Pencil size={18}/></button><button onClick={()=>deleteItem('news', n.id, setNews, news)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={18}/></button></div></div>)}</div></div>)}
        {activeAdminTab === 'general' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6">Thông Tin & Logo</h2><div className="bg-white p-6 rounded shadow space-y-4"><label className="cursor-pointer bg-blue-50 px-4 py-2 rounded flex gap-2"><Upload size={18}/> Logo <input type="file" className="hidden" onChange={e=>handleImageUpload(e, u=>setGeneralInfo({...generalInfo, logoUrl:u}))}/></label>{generalInfo.logoUrl && <img src={generalInfo.logoUrl} className="h-10"/>}<div className="grid grid-cols-2 gap-4"><input className="border p-2 rounded" value={generalInfo.siteName} onChange={e=>setGeneralInfo({...generalInfo, siteName:e.target.value})}/><input className="border p-2 rounded" value={generalInfo.siteSubName} onChange={e=>setGeneralInfo({...generalInfo, siteSubName:e.target.value})}/><input className="border p-2 rounded" value={generalInfo.phone} onChange={e=>setGeneralInfo({...generalInfo, phone:e.target.value})}/><input className="border p-2 rounded" value={generalInfo.email} onChange={e=>setGeneralInfo({...generalInfo, email:e.target.value})}/></div><button onClick={()=>saveSettings('general', generalInfo)} className="bg-green-600 text-white px-6 py-2 rounded w-full">Lưu Cấu Hình</button></div></div>)}
        {activeAdminTab === 'about' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6">Trang Giới Thiệu</h2><div className="bg-white p-6 rounded shadow space-y-4"><input className="border w-full p-2 rounded" value={aboutContent.title} onChange={e=>setAboutContent({...aboutContent, title:e.target.value})}/><textarea className="border w-full p-2 rounded" rows={5} value={aboutContent.desc} onChange={e=>setAboutContent({...aboutContent, desc:e.target.value})}/><label className="cursor-pointer bg-slate-100 px-4 py-2 rounded block w-fit"><Upload size={16}/> Ảnh <input type="file" className="hidden" onChange={e=>handleImageUpload(e, u=>setAboutContent({...aboutContent, img:u}))}/></label>{aboutContent.img && <img src={aboutContent.img} className="h-20"/>}<button onClick={()=>saveSettings('about', aboutContent)} className="bg-green-600 text-white px-6 py-2 rounded w-full">Lưu Giới Thiệu</button></div></div>)}
        {activeAdminTab === 'packages' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-slate-800">Quản Lý Gói Khám</h2><div className="bg-white p-6 rounded-lg shadow mb-8"><h3 className="font-bold mb-4 text-blue-600">Thêm Gói Khám</h3><div className="grid gap-4"><div className="grid grid-cols-2 gap-4"><input placeholder="Tên gói" className="border p-2 rounded" value={newPackage.title} onChange={e=>setNewPackage({...newPackage, title:e.target.value})}/><input placeholder="Giá tiền" className="border p-2 rounded" value={newPackage.price} onChange={e=>setNewPackage({...newPackage, price:e.target.value})}/></div><textarea placeholder="Dịch vụ" className="border p-2 rounded" value={newPackage.features} onChange={e=>setNewPackage({...newPackage, features:e.target.value})}/><textarea placeholder="Chi tiết" className="border p-2 rounded" rows={4} value={newPackage.detail} onChange={e=>setNewPackage({...newPackage, detail:e.target.value})}/><button onClick={()=>{addItem('packages', newPackage, setPackages, packages); setNewPackage({title:'',price:'',features:'',detail:''})}} className="bg-blue-600 text-white p-2 rounded font-bold">Lưu Gói</button></div></div><div className="grid grid-cols-2 gap-4">{packages.map(p=><div key={p.id} className="bg-white p-4 rounded shadow relative"><div className="font-bold text-blue-800">{p.title}</div><div className="text-red-500 font-bold">{p.price}</div><button onClick={()=>deleteItem('packages', p.id, setPackages, packages)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button></div>)}</div></div>)}
        {activeAdminTab === 'specialties' && (<div className="max-w-4xl mx-auto"><h2 className="text-2xl font-bold mb-6 text-slate-800">Quản Lý Chuyên Khoa</h2><div className="bg-white p-6 rounded-lg shadow mb-8"><h3 className="font-bold mb-4 text-blue-600">Thêm Chuyên Khoa</h3><div className="grid gap-4"><div className="grid grid-cols-2 gap-4"><input placeholder="Tên khoa" className="border p-2 rounded" value={newSpecialty.title} onChange={e=>setNewSpecialty({...newSpecialty, title:e.target.value})}/><select className="border p-2 rounded" value={newSpecialty.icon} onChange={e=>setNewSpecialty({...newSpecialty, icon:e.target.value})}>{Object.keys(ICON_MAP).map(k=><option key={k} value={k}>{k}</option>)}</select></div><textarea placeholder="Mô tả" className="border p-2 rounded" value={newSpecialty.desc} onChange={e=>setNewSpecialty({...newSpecialty, desc:e.target.value})}/><textarea placeholder="Chi tiết" className="border p-2 rounded" rows={4} value={newSpecialty.detail} onChange={e=>setNewSpecialty({...newSpecialty, detail:e.target.value})}/><button onClick={()=>{addItem('specialties', newSpecialty, setSpecialties, specialties); setNewSpecialty({title:'',desc:'',icon:'Activity',detail:''})}} className="bg-blue-600 text-white p-2 rounded font-bold">Lưu Khoa</button></div></div><div className="grid grid-cols-2 gap-4">{specialties.map(s=><div key={s.id} className="bg-white p-4 rounded shadow relative flex items-center gap-2"><div className="text-blue-600">{ICON_MAP[s.icon]}</div><div><div className="font-bold">{s.title}</div></div><button onClick={()=>deleteItem('specialties', s.id, setSpecialties, specialties)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button></div>)}</div></div>)}
      </main>
    </div>
  );

  // --- PUBLIC VIEW ---
  return (
    <div className="font-sans text-slate-600 antialiased bg-white relative">
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm border-b border-slate-800"><div className="container mx-auto px-4 flex justify-between items-center"><div className="flex gap-4"><span className="text-red-400 font-bold animate-pulse"><Phone size={14} className="inline"/> {generalInfo.phone}</span><span className="hidden md:inline"><Clock size={14} className="inline"/> {generalInfo.workingHours}</span></div><button onClick={()=>setIsAdminMode(true)} className="flex gap-1 hover:text-white"><Lock size={12}/> Admin</button></div></div>
      <header className="sticky top-0 z-40 bg-white py-4 shadow-sm"><div className="container mx-auto px-4 flex justify-between items-center"><div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(homeRef)}>{renderLogo()}<div><span className="font-bold text-slate-900 text-lg block leading-none">{generalInfo.siteName}</span><span className="text-[10px] font-bold text-blue-600 uppercase">{generalInfo.siteSubName}</span></div></div><nav className="hidden lg:flex gap-8 font-medium"><button onClick={() => scrollToSection(homeRef)} className="hover:text-blue-700 py-2">Trang chủ</button><button onClick={() => scrollToSection(aboutRef)} className="hover:text-blue-700 py-2">Giới thiệu</button><button onClick={() => scrollToSection(specialtiesRef)} className="hover:text-blue-700 py-2">Chuyên khoa</button><button onClick={() => scrollToSection(packagesRef)} className="hover:text-blue-700 py-2">Gói khám</button><button onClick={() => scrollToSection(doctorsRef)} className="hover:text-blue-700 py-2">Bác sĩ</button><button onClick={() => scrollToSection(newsRef)} className="hover:text-blue-700 py-2">Tin tức</button></nav><div className="flex gap-4"><button onClick={()=>openModal('booking')} className="hidden md:flex bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold shadow hover:bg-blue-700 items-center gap-2"><Calendar size={18}/> Đặt Lịch</button><button className="lg:hidden" onClick={()=>setIsMenuOpen(!isMenuOpen)}>{isMenuOpen?<X/>:<Menu/>}</button></div></div>{isMenuOpen && <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-4"><button onClick={() => scrollToSection(homeRef)} className="font-bold text-left">Trang chủ</button><button onClick={() => scrollToSection(aboutRef)} className="font-bold text-left">Giới thiệu</button><button onClick={() => scrollToSection(specialtiesRef)} className="font-bold text-left">Chuyên khoa</button><button onClick={() => scrollToSection(packagesRef)} className="font-bold text-left">Gói khám</button><button onClick={() => scrollToSection(doctorsRef)} className="font-bold text-left">Bác sĩ</button><button onClick={() => scrollToSection(newsRef)} className="font-bold text-left">Tin tức</button></div>}</header>
      
      {/* HERO SECTION FIX LAYOUT SHIFT */}
      <section ref={homeRef} className="relative bg-slate-50 min-h-[600px] flex items-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.img})`, filter: 'brightness(0.9)' }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
          </div>
        ))}
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-sm animate-in slide-in-from-left fade-in duration-700">🏥 {generalInfo.siteName}</div>
            <div className="min-h-[200px]"> {/* Fixed height text container */}
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4 transition-all duration-500">{heroSlides[currentSlide].title1} <br/><span className="text-blue-700">{heroSlides[currentSlide].title2}</span></h1>
              <p className="text-lg text-slate-700 font-medium">{heroSlides[currentSlide].desc}</p>
            </div>
            <div className="flex gap-4 pt-4"><button onClick={()=>openModal('booking')} className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all">Đăng Ký Khám Ngay</button><button onClick={()=>scrollToSection(newsRef)} className="px-8 py-4 bg-white text-blue-700 border border-blue-100 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-all">Xem Tin Tức</button></div>
          </div>
          {/* Right side blank for background image to show */}
        </div>
      </section>

      <section ref={aboutRef} className="py-20 bg-white scroll-mt-20"><div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"><div><img src={aboutContent.img} className="rounded-2xl shadow-xl w-full object-cover h-96"/></div><div><h2 className="text-3xl font-extrabold text-slate-900 mb-6">{aboutContent.title}</h2><p className="text-lg text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{aboutContent.desc}</p><ul className="space-y-3 mb-8"><li className="flex gap-3"><ShieldCheck className="text-green-500"/> Quy trình 1 chiều</li><li className="flex gap-3"><Award className="text-green-500"/> Chất lượng quốc tế</li></ul></div></div></section>
      <section ref={specialtiesRef} className="py-20 bg-slate-50 scroll-mt-20"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl font-extrabold">Chuyên Khoa Mũi Nhọn</h2><p>Bấm vào từng khoa để xem chi tiết</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{specialties.map(s => (<div key={s.id} onClick={()=>openModal('specialty', s)} className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all cursor-pointer group"><div className="w-12 h-12 bg-blue-50 text-blue-600 rounded flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">{ICON_MAP[s.icon]||<Activity/>}</div><h3 className="text-xl font-bold mb-2">{s.title}</h3><p className="text-slate-500 text-sm line-clamp-3">{s.desc}</p></div>))}</div></div></section>
      <section ref={packagesRef} className="py-20 bg-white scroll-mt-20"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl font-extrabold">Gói Khám Sức Khỏe</h2><p>Bấm vào gói để xem chi tiết hạng mục</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{packages.map(p => (<div key={p.id} onClick={()=>openModal('package', p)} className="border border-slate-200 p-8 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"><h3 className="text-xl font-bold mb-2">{p.title}</h3><div className="text-2xl font-bold text-blue-600 mb-4">{p.price}</div><p className="text-slate-500 text-sm mb-4 line-clamp-2">{p.features}</p><span className="text-blue-600 text-sm font-bold flex items-center gap-1">Xem chi tiết <ArrowRight size={14}/></span></div>))}</div></div></section>
      <section ref={doctorsRef} className="py-20 bg-slate-50 scroll-mt-20"><div className="container mx-auto px-4"><div className="text-center mb-16"><h2 className="text-3xl font-extrabold text-slate-900">Đội Ngũ Bác Sĩ</h2><p>Bấm vào ảnh bác sĩ để xem tiểu sử</p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{doctors.map(d => (<div key={d.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all group cursor-pointer" onClick={() => openModal('doctor', d)}><div className="relative aspect-[3/4] overflow-hidden"><img src={d.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-bold text-sm">Xem hồ sơ</span></div></div><div className="p-6 text-center"><h3 className="text-lg font-bold text-slate-900 mb-1">{d.name}</h3><p className="text-blue-600 text-sm font-medium mb-3">{d.role}</p><button onClick={(e)=>{e.stopPropagation();openModal('booking', d)}} className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded hover:bg-blue-600 hover:text-white transition-colors">Đăng ký khám</button></div></div>))}</div></div></section>
      <section ref={newsRef} className="py-20 bg-white scroll-mt-20"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-3xl font-extrabold">Tin Tức Y Tế</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{news.map(n => (<div key={n.id} className="group cursor-pointer" onClick={() => openModal('news', n)}><div className="overflow-hidden rounded-2xl mb-4 h-48"><img src={n.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div><div className="text-xs text-blue-600 font-bold mb-2">{n.date}</div><h3 className="font-bold text-lg mb-2 group-hover:text-blue-700">{n.title}</h3><p className="text-slate-500 text-sm line-clamp-2">{n.summary}</p></div>))}</div></div></section>
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeModal}><div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200" onClick={e=>e.stopPropagation()}><button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 z-10"><X size={24}/></button>
            {modalType === 'doctor' && selectedItem && (<div className="grid md:grid-cols-2"><div className="h-64 md:h-auto"><img src={selectedItem.img} className="w-full h-full object-cover"/></div><div className="p-8"><div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">{selectedItem.role}</div><h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedItem.name}</h2><div className="prose text-slate-600 mb-8 max-h-60 overflow-y-auto"><h4 className="font-bold text-slate-800 mb-2">Giới thiệu:</h4><p className="whitespace-pre-line">{selectedItem.bio || "Bác sĩ chuyên khoa với nhiều năm kinh nghiệm..."}</p></div><button onClick={() => openModal('booking', selectedItem)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg flex justify-center items-center gap-2"><Calendar/> Đặt Lịch Với Bác Sĩ</button></div></div>)}
            {modalType === 'news' && selectedItem && (<div><div className="h-64 w-full"><img src={selectedItem.img} className="w-full h-full object-cover"/></div><div className="p-8"><span className="text-blue-600 font-bold text-sm">{selectedItem.date}</span><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-6">{selectedItem.title}</h2><div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-line">{selectedItem.content || selectedItem.summary}</div></div></div>)}
            {modalType === 'package' && selectedItem && (<div className="p-8"><div className="text-center mb-6"><h2 className="text-3xl font-bold text-blue-800 mb-2">{selectedItem.title}</h2><div className="text-2xl font-bold text-red-500">{selectedItem.price}</div></div><div className="bg-blue-50 p-6 rounded-xl mb-6"><h4 className="font-bold mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-green-600"/> Dịch vụ bao gồm:</h4><p className="text-slate-700">{selectedItem.features}</p></div><div className="mb-8 text-slate-600 whitespace-pre-line"><h4 className="font-bold text-slate-800 mb-2">Chi tiết gói khám:</h4>{selectedItem.detail || "Chưa có thông tin chi tiết."}</div><button onClick={() => openModal('booking', selectedItem)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Đăng Ký Gói Này</button></div>)}
            {modalType === 'specialty' && selectedItem && (<div className="p-8"><div className="flex items-center gap-4 mb-6"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">{ICON_MAP[selectedItem.icon]}</div><h2 className="text-3xl font-bold text-slate-900">{selectedItem.title}</h2></div><div className="prose text-slate-600 leading-relaxed whitespace-pre-line mb-8">{selectedItem.detail || selectedItem.desc}</div><button onClick={() => openModal('booking')} className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50">Liên hệ tư vấn khoa này</button></div>)}
            {modalType === 'booking' && (<div className="p-8"><div className="text-center mb-8"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar size={32}/></div><h2 className="text-2xl font-bold text-slate-900">Đăng Ký Khám Bệnh</h2><p className="text-slate-500">Vui lòng điền thông tin, chúng tôi sẽ gọi lại ngay.</p></div><form onSubmit={submitBooking} className="space-y-4 max-w-lg mx-auto"><div><label className="block text-sm font-medium mb-1">Họ tên *</label><input required className="w-full border p-3 rounded-lg" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} /></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">SĐT *</label><input required className="w-full border p-3 rounded-lg" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} /></div><div><label className="block text-sm font-medium mb-1">Ngày khám</label><input type="date" className="w-full border p-3 rounded-lg" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} /></div></div><div><label className="block text-sm font-medium mb-1">Bác sĩ / Gói khám</label><input className="w-full border p-3 rounded-lg bg-slate-50" value={bookingForm.doctor} onChange={e => setBookingForm({...bookingForm, doctor: e.target.value})} placeholder="Chọn hoặc để trống..." /></div><div><label className="block text-sm font-medium mb-1">Ghi chú</label><textarea className="w-full border p-3 rounded-lg" rows={3} value={bookingForm.note} onChange={e => setBookingForm({...bookingForm, note: e.target.value})} /></div><button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg">GỬI ĐĂNG KÝ</button></form></div>)}
          </div></div>
      )}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">{isChatOpen && (<div className="bg-white w-80 h-96 rounded-2xl shadow-2xl mb-4 border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300"><div className="bg-blue-600 p-4 flex justify-between items-center text-white"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span className="font-bold">Trợ Lý AI</span></div><button onClick={() => setIsChatOpen(false)}><Minimize2 size={18}/></button></div><div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3">{messages.map(msg=><div key={msg.id} className={`flex ${msg.sender==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender==='user'?'bg-blue-600 text-white':'bg-white text-slate-700 shadow-sm'}`}>{msg.text}</div></div>)}<div ref={messagesEndRef}/></div><form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 border rounded-full px-4 py-2 text-sm" placeholder="Nhập câu hỏi..." value={chatInput} onChange={e=>setChatInput(e.target.value)}/><button className="bg-blue-600 text-white p-2 rounded-full"><Send size={18}/></button></form></div>)}<button onClick={()=>setIsChatOpen(!isChatOpen)} className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">{isChatOpen?<X/>:<MessageCircle size={28}/>}</button></div>
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12"><div className="container mx-auto px-4 text-center"><p>&copy; 2024 {generalInfo.siteName}. All rights reserved.</p></div></footer>
    </div>
  );
};

export default App;