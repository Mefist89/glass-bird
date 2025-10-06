import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const quickLinks = [
    { title: 'Главная', url: '/' },
    { title: 'Курсы', url: '/courses' },
    { title: 'О нас', url: '/about' },
    { title: 'Контакты', url: '/contact' },
  ];

  const courses = [
    { title: 'Python для начинающих', url: '/courses/python' },
    { title: 'Компьютерные сети', url: '/courses/networks' },
    { title: 'Базы данных SQL', url: '/courses/sql' },
 ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@glassbird.com', url: 'mailto:info@glassbird.com' },
    { icon: Phone, text: '+373 (0) 123 4567', url: 'tel:+37301234567' },
    { icon: MapPin, text: 'Кишинёв, Молдова', url: '#' },
  ];

  return (
    <footer className="relative z-10 backdrop-blur-md bg-slate-900/50 border-t border-white/10 mt-20">
      {/* Main Footer Content */}
      <div className="w-full px-6 py-8">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex justify-end mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Footer Grid - Hidden on mobile when menu is open */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isMobileMenuOpen ? 'hidden' : ''}`}>
            {/* Brand Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🐦</div>
                <span className="text-xl font-bold">Glass Bird</span>
              </div>
              <p className="text-slate-400 mb-4">
                Образовательная платформа для изучения современных технологий и программирования.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-slate-400 hover:text-blue-400 transition-colors block"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Наши курсы</h3>
              <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li key={index}>
                    <a
                      href={course.url}
                      className="text-slate-400 hover:text-blue-400 transition-colors block"
                    >
                      {course.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <contact.icon size={16} className="mt-0.5 text-slate-400 flex-shrink-0" />
                    <a
                      href={contact.url}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {contact.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu - Only visible on mobile when menu is open */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-6 pt-6 border-t border-white/10`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="text-slate-400 hover:text-blue-400 transition-colors block py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Наши курсы</h3>
                <ul className="space-y-2">
                  {courses.map((course, index) => (
                    <li key={index}>
                      <a
                        href={course.url}
                        className="text-slate-400 hover:text-blue-400 transition-colors block py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {course.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                <ul className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <contact.icon size={16} className="mt-0.5 text-slate-400 flex-shrink-0" />
                      <a
                        href={contact.url}
                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        {contact.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[95%] xl:max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 Glass Bird. Все права защищены.
          </div>
          <div className="text-slate-400 text-sm">
            Разработано с ❤️ для студентов
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;