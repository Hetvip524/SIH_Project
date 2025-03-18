import React, { useState } from 'react';
import { 
  Home, 
  FileText,
  Users, 
  CheckCircle,
  Settings, 
  HelpCircle,
  Menu,
} from 'lucide-react';
import Footer from './Footer'
import '../Design/FacultyHomePage.css';
import Request from './Request';
import FacultyList from './FacultyList'
import Evaluation from './Evaluation';
import AddStudent from './AddStudent';

const Help = () => <div className="page"><h1>Help & Support Page</h1></div>;
const AdminDashBoard = () => <div className="page"><h1>DashBoard Page</h1></div>;

const AdminHomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('faculties');
  
    const navItems = [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { icon: Users, label: 'FacultyList', id: 'faculties' },
      { icon: FileText, label: 'Request', id: 'requests' },
      { icon: CheckCircle, label: 'Evaluation', id: 'evaluation' },
      { icon: Settings, label: 'Students', id: 'studentlist' },
      { icon: HelpCircle, label: 'Help & Support', id: 'help' },
    ];
  
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard': return <AdminDashBoard />;
        case 'faculties': return <FacultyList />;
        case 'requests': return <Request />;
        case 'evaluation': return <Evaluation />;
        case 'studentlist': return <AddStudent />;
        case 'help': return <Help />;
        default: return <FacultyList />;
      }
    };
  
    return (
      <>
      <div className="app">
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          {/* Header */}
          <div className="sidebar-header">
            {!collapsed && <span className="company-name">AppraisePro</span>}
            <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              <Menu size={20} />
            </button>
          </div>
  
          {/* Navigation */}
          <nav className="nav-items">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
  
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
      <Footer />
      </>
    );
}

export default AdminHomePage