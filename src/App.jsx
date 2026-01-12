import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Calendar, 
  Search, 
  ChevronRight, 
  Activity, 
  Users, 
  Baby, 
  Stethoscope, 
  Syringe, 
  Car, 
  ShieldCheck, 
  Award,
  Facebook,
  Youtube,
  Mail
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    {
      id: 1,
      title: "Khám Sức Khỏe Lái Xe",
      desc: "Cấp giấy chứng nhận sức khỏe lái xe nhanh chóng, đúng quy định Bộ Y Tế.",
      icon: <Car size={32} />,
      category: "featured"
    },
    {
      id: 2,
      title: "Trung Tâm Tiêm Chủng",
      desc: "Đầy đủ các loại vắc-xin cho trẻ em và người lớn. Quy trình an toàn 1 chiều.",
      icon: <Syringe size={32} />,
      category: "featured"
    },
    {
      id: 3,
      title: "Khám BHYT Thông Tuyến",
      desc: "Quyền lợi bảo hiểm tối đa. Thủ tục nhanh gọn, không chờ đợi lâu.",
      icon: <ShieldCheck size={32} />,
      category: "general"
    },
    {
      id: 4,
      title: "Khám Nhi Khoa",
      desc: "Đội ngũ bác sĩ nhi giàu kinh nghiệm, không gian thân thiện với trẻ nhỏ.",
      icon: <Baby size={32} />,
      category: "specialty"
    },
    {
      id: 5,
      title: "Khám Tổng Quát",
      desc: "Tầm soát ung thư và các bệnh lý nền với trang thiết bị hiện đại.",
      icon: <Activity size={32} />,
      category: "general"
    },
    {
      id: 6,
      title: "Nội Soi Tiêu Hóa",
      desc: "Công nghệ NBI chẩn đoán sớm ung thư, êm ái, không đau.",
      icon: <Stethoscope size={32} />,
      category: "specialty"
    }
  ];

  const doctors = [
    {
      name: "BS.CKI Nguyễn Văn A",
      specialty: "Trưởng Khoa Nội",
      exp: "15 năm kinh nghiệm",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "BS.CKI Trần Thị B",
      specialty: "Khoa Nhi",
      exp: "10 năm kinh nghiệm",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "ThS.BS Lê Văn C",
      specialty: "Chẩn đoán hình ảnh",
      exp: "12 năm kinh nghiệm",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "BS.CKII Phạm Thị D",
      specialty: "Khoa Sản",
      exp: "20 năm kinh nghiệm",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
    }
  ];

  return (
    <div className="font-sans text-slate-700 bg-slate-50 min-h-screen flex flex-col">
      
      {/* Top Bar - Thông tin liên hệ nhanh */}
      <div className="bg-blue-900 text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center"><Phone size={14} className="mr-2" /> Cấp cứu: 0207.388.153</span>
            <span className="flex items-center"><Clock size={14} className="mr-2" /> Giờ làm việc: 7:00 - 17:00 (T2 - CN)</span>
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-cyan-300 cursor-pointer">Tin tức y tế</span>
            <span className="hover:text-cyan-300 cursor-pointer">Tuyển dụng</span>
            <span className="hover:text-cyan-300 cursor-pointer">Liên hệ</span>
          </div>
        </div>
      </div>

      {/* Header & Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white md:bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="text-white font-bold text-2xl">153</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-none ${scrolled ? 'text-blue-900' : 'text-blue-900 md:text-blue-900'}`}>BỆNH VIỆN</span>
              <span className={`text-sm font-medium tracking-wider ${scrolled ? 'text-slate-600' : 'text-slate-600 md:text-slate-700'}`}>ĐA KHOA QUỐC TẾ</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 font-medium">
            {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Dịch vụ', 'Bảng giá', 'Tin tức'].map((item) => (
              <a key={item} href="#" className={`hover:text-blue-600 transition-colors ${scrolled ? 'text-slate-700' : 'text-slate-800'}`}>
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform flex items-center">
              <Calendar size={18} className="mr-2" />
              ĐẶT LỊCH KHÁM
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-blue-900" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="flex flex-col p-4 space-y-4 font-medium">
              {['Trang chủ', 'Giới thiệu', 'Chuyên khoa', 'Dịch vụ', 'Bảng giá', 'Tin tức'].map((item) => (
                <a key={item} href="#" className="text-slate-700 hover:text-blue-600 py-2 border-b border-slate-50">
                  {item}
                </a>
              ))}
              <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold mt-2">
                ĐẶT LỊCH NGAY
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-1/2 h-full bg-blue-50 rounded-bl-[100px] -z-10 hidden lg:block"></div>
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              🏥 Bệnh viện Đa khoa tại Tuyên Quang
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
              Chăm Sóc Sức Khỏe <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Toàn Diện</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao với đội ngũ bác sĩ tận tâm và trang thiết bị hiện đại. Nơi gửi gắm niềm tin sức khỏe cho cả gia đình bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-colors flex justify-center items-center">
                Đăng Ký Khám Bệnh
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors flex justify-center items-center">
                <Search size={20} className="mr-2" />
                Tra Cứu Kết Quả
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0674514?auto=format&fit=crop&q=80&w=800" 
                alt="Đội ngũ bác sĩ" 
                className="w-full h-auto object-cover"
              />
              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg flex items-center animate-bounce-slow">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Users className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Lượt khám mỗi năm</p>
                  <p className="text-xl font-bold text-slate-800">50.000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar - Floating over sections */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Calendar size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Đặt lịch trực tuyến</h3>
              <p className="text-slate-500 text-sm mt-1">Chọn bác sĩ và giờ khám chủ động, không chờ đợi.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600">
              <Car size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Khám sức khỏe lái xe</h3>
              <p className="text-slate-500 text-sm mt-1">Thủ tục nhanh gọn, cấp giấy ngay trong buổi.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Bảo Hiểm Y Tế</h3>
              <p className="text-slate-500 text-sm mt-1">Thanh toán BHYT đúng tuyến và thông tuyến.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Dịch vụ nổi bật</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Chuyên Khoa & Dịch Vụ</h3>
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">{service.desc}</p>
                <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Xem chi tiết <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Stats */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          alt="Hospital background"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Tại sao chọn Bệnh viện 153?</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Với phương châm "Tận tâm y đức - Vững bước tương lai", Bệnh viện 153 không ngừng nâng cao chất lượng dịch vụ, đầu tư trang thiết bị y tế hiện đại bậc nhất Tuyên Quang.
              </p>
              <ul className="space-y-4">
                {[
                  "Đội ngũ bác sĩ chuyên khoa I, II giàu kinh nghiệm.",
                  "Hệ thống máy xét nghiệm, chẩn đoán hình ảnh hiện đại.",
                  "Quy trình khám chữa bệnh khép kín, nhanh chóng.",
                  "Chi phí hợp lý, công khai minh bạch."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Award size={14} className="text-white" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-blue-100">Năm Kinh Nghiệm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">30+</div>
                <div className="text-blue-100">Bác Sĩ Chuyên Khoa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-blue-100">Cấp Cứu</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">98%</div>
                <div className="text-blue-100">Bệnh Nhân Hài Lòng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Đội Ngũ Bác Sĩ</h2>
              <div className="w-20 h-1 bg-blue-500 mt-4 rounded-full"></div>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-800">
              Xem tất cả <ChevronRight size={20} className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-96 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold text-white mb-1">{doctor.name}</h4>
                  <p className="text-cyan-300 font-medium mb-2">{doctor.specialty}</p>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-slate-200 text-sm mb-4">{doctor.exp}</p>
                    <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-cyan-50">
                      Đặt lịch khám
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 lg:p-16 bg-blue-600 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6">Đặt Lịch Khám Ngay</h3>
              <p className="mb-8 text-blue-100 text-lg">
                Điền thông tin vào biểu mẫu, nhân viên tư vấn sẽ liên hệ xác nhận lịch khám với bạn trong vòng 15 phút.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Hotline tư vấn</p>
                    <p className="text-xl font-bold">0207.388.153</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Địa chỉ</p>
                    <p className="text-lg font-bold">Tổ 13, P. Tân Hà, TP. Tuyên Quang</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-10 lg:p-16">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="09xx xxx xxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dịch vụ quan tâm</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                    <option>Khám tổng quát</option>
                    <option>Khám sức khỏe lái xe</option>
                    <option>Tiêm chủng</option>
                    <option>Khám chuyên khoa</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ngày dự kiến</label>
                    <input type="date" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Giờ dự kiến</label>
                    <input type="time" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Triệu chứng / Ghi chú</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Mô tả sơ qua về tình trạng sức khỏe..."></textarea>
                </div>
                <button type="button" className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors shadow-lg mt-4">
                  GỬI YÊU CẦU ĐẶT LỊCH
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1 */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                 <div className="bg-blue-600 p-1.5 rounded">
                  <span className="text-white font-bold text-xl">153</span>
                </div>
                <span className="text-white font-bold text-xl">BỆNH VIỆN</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Trực thuộc Công ty Cổ phần Bệnh viện Tuệ Lâm. Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất cho cộng đồng.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Liên Kết Nhanh</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Giới thiệu bệnh viện</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Đội ngũ chuyên gia</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tin tức & Sự kiện</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Dịch Vụ Chính</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Khám sức khỏe lái xe</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tiêm chủng vắc-xin</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Khám sức khỏe doanh nghiệp</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Nội soi tiêu hóa</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Xét nghiệm tổng quát</a></li>
              </ul>
            </div>

             {/* Column 4 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Liên Hệ</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 text-blue-500 mt-1" />
                  <span>Tổ 13, Phường Tân Hà, TP. Tuyên Quang, Tỉnh Tuyên Quang</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 text-blue-500" />
                  <span>0207.388.153</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 text-blue-500" />
                  <span>contact@benhvien153.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 Bệnh viện Đa khoa 153. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Thiết kế bởi Team Design</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;