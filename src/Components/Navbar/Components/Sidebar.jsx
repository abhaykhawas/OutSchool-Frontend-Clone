import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const submenuRef = useRef();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      (!submenuRef.current || !submenuRef.current.contains(event.target))
    ) {
      onClose();
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setActiveSubmenu(null);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { title: 'Coding & Tech', submenu: ['Grade 1', 'Grade 2', 'Grade 3'], uri: "/online-class?categories=Coding+%26+Tech&" },
    { title: 'Math', submenu: ['Grade 1', 'Grade 2', 'Grade 3'], uri: "/online-class?categories=Math&" },
    { title: 'Arts', submenu: ['Grade 1', 'Grade 2', 'Grade 3'], uri: "/online-class?categories=Arts&" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
      )}

      {/* Main Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Subjects</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.title}
                className="mb-2 cursor-pointer text-blue-600 hover:underline"
                onClick={() => setActiveSubmenu(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submenu Sidebar */}
      <div
        ref={submenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-gray-50 border-l border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ${
          activeSubmenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">{activeSubmenu?.title}</h2>
          <ul>
            {activeSubmenu?.submenu.map((grade) => (
              <li key={grade} className="mb-2 text-gray-700" onClick={() => {
                let url = activeSubmenu?.uri + "grades=" +grade.split(' ')[1]
                console.log(url)
                return navigate(url)
              }}>
                {grade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
