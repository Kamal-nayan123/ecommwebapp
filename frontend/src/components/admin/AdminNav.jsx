import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '📝' }
  ];

  return (
    <nav className="w-64 bg-gray-800 min-h-screen p-4">
      <h2 className="text-white text-xl font-bold mb-8">Admin Panel</h2>
      <div className="space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-3 rounded transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
            end
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AdminNav;