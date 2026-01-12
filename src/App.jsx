import React, { useState, useEffect } from 'react';
import { 
  Phone, Clock, MapPin, Menu, X, Calendar, Search, 
  ChevronRight, Activity, Users, Baby, Stethoscope, 
  Syringe, Car, ShieldCheck, Award, Facebook, Youtube, 
  Mail, Star, ArrowRight, Microscope, HeartPulse
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dữ liệu mẫu chuyên nghiệp
  const specialties = [
    { title: "Nội Khoa Tổng Quát", icon: <Activity className="w-8 h-8" />, desc: "Chẩn đoán và điều trị các bệnh lý nội khoa với phác đồ cập nhật mới nhất." },
    { title: "Ngoại Khoa & Phẫu Thuật", icon: <Stethoscope className="w-8 h-8" />, desc: "Phẫu thuật nội soi, phẫu thuật chấn thương chỉnh hình kỹ thuật cao." },
    { title: "Sản Phụ Khoa", icon: <Baby className="w-8 h-8" />, desc: "Chăm sóc thai kỳ toàn diện, sàng lọc trước sinh và đỡ đẻ an toàn." },
    { title: "Nhi Khoa", icon: <Users className="w-8 h-8" />, desc: "Không gian thân thiện, bác sĩ tâm lý, hạn chế kháng sinh." },
    { title: "Chẩn Đoán Hình Ảnh", icon: <Microscope className="w-8 h-8" />, desc: "Hệ thống CT-Scanner, MRI, Siêu âm 4D/5D sắc nét." },
    { title: "Xét Nghiệm Y Học", icon: <Syringe className="w-8 h-8" />, desc: "Trung tâm xét nghiệm đạt chuẩn an toàn sinh học cấp II." },
  ];

  const doctors = [
    { name: "BS.CKII Nguyễn Văn A", role: "Giám Đốc Chuyên Môn", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
    { name: "ThS.BS Trần Thị B", role: "Trưởng Khoa Nội", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
    { name: "BS.CKI Lê Văn C", role: "Trưởng Khoa Ngoại", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" },
    { name: "BS.CKI Phạm Thị D", role: "Trưởng Khoa Nhi", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="font-sans text-slate-600 antialiased bg-white">
      
      {/* 1. Top Bar - Thông tin khẩn cấp & Giờ làm việc */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm border-b border-slate-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center text-red-400 font-bold animate-pulse">
              <Phone size={14} className="mr-2" /> CẤP CỨU 24/7: 0207.388.153
            </span>
            <span className="hidden md:flex items-center text-slate-400">
              <Clock size={14} className="mr-2" /> 7:00 - 17:00 (Thứ 2 - Chủ Nhật)
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Tuyển dụng</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Tin tức y tế</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
        </div>
      </div>

      {/* 2. Header & Navigation - Sticky & Modern */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-4 md:py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-lg shadow-blue-700/30">
              <span className="text-white font-extrabold text-xl md:text-2xl tracking-tighter">153</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg md:text-2xl leading-none tracking-tight">BỆNH VIỆN 153</span>
              <span className="text-[10px] md:text-xs font-semibold text-blue-600 tracking-widest uppercase mt-0.5">Đa Khoa Quốc Tế</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-slate-700">
            {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Gói khám', 'Bác sĩ', 'Tin tức'].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-blue-700 transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-full hover:bg-blue-100 transition-colors">
              <Search size={18} />
              <span className="hidden xl:inline">Tra cứu</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-700/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Calendar size={18} />
              <span>Đặt Lịch Ngay</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-slate-800" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
             {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Gói khám', 'Bác sĩ', 'Tin tức'].map((item) => (
              <a key={item} href="#" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">{item}</a>
            ))}
            <button className="w-full py-3 bg-blue-700 text-white rounded-lg font-bold mt-2">ĐẶT LỊCH KHÁM</button>
          </div>
        )}
      </header>

      {/* 3. Hero Section - Immersive & Trustworthy */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 bg-slate-50 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-100/50 rounded-bl-[200px] -z-10 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-cyan-100/50 rounded-tr-[150px] -z-10 blur-3xl opacity-60"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-100 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-800">Bệnh viện top đầu Tuyên Quang</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
              Chăm Sóc Sức Khỏe <br/>
              <span className="text-blue-700">Bằng Cả Trái Tim</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Hệ thống y tế hiện đại, đội ngũ chuyên gia đầu ngành cùng quy trình khám chữa bệnh chuẩn quốc tế. Chúng tôi cam kết mang lại sự an tâm tuyệt đối cho bạn và gia đình.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-700/30 hover:bg-blue-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" /> Đăng Ký Khám
              </button>
              <button className="px-8 py-4 bg-white text-blue-800 border-2 border-blue-100 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2">
                <Search className="w-5 h-5" /> Tra Cứu Kết Quả
              </button>
            </div>
            
            <div className="flex items-center gap-8 pt-4 border-t border-slate-200/60">
              <div>
                <p className="text-3xl font-bold text-slate-900">15+</p>
                <p className="text-sm text-slate-500">Năm hình thành</p>
              </div>
              <div className="w-px h-10 bg-slate-300"></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">50k+</p>
                <p className="text-sm text-slate-500">Bệnh nhân/năm</p>
              </div>
              <div className="w-px h-10 bg-slate-300"></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500">Hài lòng</p>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-700 delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white z-10">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800" alt="Hospital Team" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 z-20 max-w-xs hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">An Toàn Tuyệt Đối</h4>
                  <p className="text-xs text-slate-500">Quy trình 1 chiều khép kín</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Services - Floating Cards */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Khám Sức Khỏe Lái Xe", icon: <Car size={32} />, color: "bg-blue-600", desc: "Cấp giấy nhanh, thủ tục đơn giản." },
            { title: "Trung Tâm Tiêm Chủng", icon: <Syringe size={32} />, color: "bg-teal-500", desc: "Vắc-xin đầy đủ, an toàn cho bé." },
            { title: "Khám BHYT Thông Tuyến", icon: <HeartPulse size={32} />, color: "bg-indigo-600", desc: "Quyền lợi tối đa, không cần giấy chuyển." }
          ].map((item, idx) => (
            <div key={idx} className={`${item.color} text-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer group`}>
              <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-blue-700 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">{item.desc}</p>
              <span className="inline-flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform">
                Chi tiết <ArrowRight size={16} className="ml-2" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Specialties Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3">Dịch vụ toàn diện</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Chuyên Khoa Mũi Nhọn</h2>
            <p className="text-slate-500">Chúng tôi tự hào sở hữu hệ thống chuyên khoa sâu, trang thiết bị đồng bộ và đội ngũ chuyên gia giàu kinh nghiệm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((spec, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl border border-slate-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{spec.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{spec.desc}</p>
                <a href="#" className="inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                  Tìm hiểu thêm <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
              Xem tất cả chuyên khoa
            </button>
          </div>
        </div>
      </section>

      {/* 6. Facilities & Modern Tech */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385180-1ea55f9f8981?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Trang Thiết Bị Y Tế <br/><span className="text-blue-400">Tiên Tiến Bậc Nhất</span></h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Bệnh viện 153 đầu tư mạnh mẽ vào hệ thống máy móc chẩn đoán hình ảnh và xét nghiệm tự động hóa hoàn toàn từ các thương hiệu hàng đầu thế giới (GE, Siemens, Roche).
              </p>
              <ul className="space-y-4">
                {[
                  "Máy CT-Scanner đa dãy dò chụp cắt lớp vi tính.",
                  "Hệ thống nội soi tiêu hóa NBI phóng đại.",
                  "Máy siêu âm 5D Voluson E10 công nghệ cao.",
                  "Hệ thống xét nghiệm miễn dịch tự động Cobas."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Award size={14} className="text-white" />
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-10 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
                Xem chi tiết cơ sở vật chất
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-2xl translate-y-8" alt="Machine 1" />
              <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-2xl" alt="Machine 2" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Doctors Section */}
      <section className="py-24 bg-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3">Đội ngũ chuyên gia</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Bác Sĩ Của Chúng Tôi</h2>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-700 font-bold hover:underline">
              Xem toàn bộ danh sách <ArrowRight size={18} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors">Đặt lịch ngay</button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">{doc.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Booking CTA Section - High Conversion */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Bạn Cần Tư Vấn Sức Khỏe?</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Để lại thông tin để được đội ngũ y tế của Bệnh viện 153 hỗ trợ giải đáp thắc mắc và đặt lịch khám ưu tiên.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Phone className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Hotline Tư Vấn</p>
                      <p className="text-xl font-bold">0207.388.153</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <MapPin className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Địa chỉ</p>
                      <p className="text-lg font-bold">Tổ 13, P. Tân Hà, TP. Tuyên Quang</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-slate-900 text-xl font-bold mb-6">Đăng Ký Tư Vấn Miễn Phí</h3>
                <form className="space-y-4">
                  <div>
                    <input type="text" placeholder="Họ và tên của bạn" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900" />
                  </div>
                  <div>
                    <input type="tel" placeholder="Số điện thoại liên hệ" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900" />
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-500">
                      <option>Chọn dịch vụ quan tâm</option>
                      <option>Khám tổng quát</option>
                      <option>Khám lái xe</option>
                      <option>Nhi khoa</option>
                    </select>
                  </div>
                  <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                    GỬI YÊU CẦU NGAY
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-4">
                    Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer - Professional & Detailed */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">153</span>
                </div>
                <span className="text-white font-bold text-xl">BỆNH VIỆN</span>
              </div>
              <p className="text-sm leading-relaxed">
                Đơn vị y tế uy tín hàng đầu tại Tuyên Quang, cung cấp dịch vụ khám chữa bệnh chất lượng cao với chi phí hợp lý cho mọi người dân.
              </p>
              <div className="flex gap-4">
                {[Facebook, Youtube, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Về Chúng Tôi</h4>
              <ul className="space-y-3 text-sm">
                {['Giới thiệu chung', 'Ban lãnh đạo', 'Cơ sở vật chất', 'Hợp tác quốc tế', 'Tuyển dụng'].map(item => (
                  <li key={item}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Dịch Vụ Nổi Bật</h4>
              <ul className="space-y-3 text-sm">
                {['Khám sức khỏe lái xe', 'Tiêm chủng trọn gói', 'Tầm soát ung thư', 'Thai sản trọn gói', 'Nội soi tiêu hóa'].map(item => (
                  <li key={item}><a href="#" className="hover:text-blue-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Giờ Làm Việc</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between"><span>Thứ 2 - Thứ 6:</span> <span className="text-white">7:00 - 17:00</span></li>
                <li className="flex justify-between"><span>Thứ 7 - CN:</span> <span className="text-white">7:30 - 17:00</span></li>
                <li className="flex justify-between"><span>Cấp cứu:</span> <span className="text-red-400 font-bold">24/7</span></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs">Giấy phép hoạt động số: 153/SYT-GPHĐ</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-slate-800 text-sm">
            <p>&copy; 2024 Bệnh viện Đa khoa 153. Bản quyền thuộc về Công ty CP Bệnh viện Tuệ Lâm.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;