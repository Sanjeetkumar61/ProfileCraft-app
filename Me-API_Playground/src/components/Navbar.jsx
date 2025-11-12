import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AUTH_TOKEN_KEY = 'meapi_token';
const AUTH_USER_KEY = 'meapi_user';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
    const userString = localStorage.getItem(AUTH_USER_KEY) || sessionStorage.getItem(AUTH_USER_KEY);
    
    if (token && userString) {
      try {
        return JSON.parse(userString);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    setUser(getUserFromStorage());
    const onAuthChanged = () => setUser(getUserFromStorage());
    window.addEventListener('auth-changed', onAuthChanged);
    return () => window.removeEventListener('auth-changed', onAuthChanged);
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event('auth-changed'));
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    // ===== YAHAN CHANGE HUA HAI =====
    <nav className="sticky top-0 z-20 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-3xl font-extrabold tracking-wide hover:text-purple-300 transition">
              ProfileCraft.
            </Link>
          </div>

          {/* Desktop Menu & Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex space-x-2">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
              <Link to="/projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
              <Link to="/search" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Search</Link>
            </div>

            {/* Auth Controls */}
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link to="/signin" className="bg-white/10 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-white/20 transition">Sign In</Link>
                <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <Link to="/profile" className="h-9 w-9 rounded-full bg-yellow-500 flex items-center justify-center text-gray-800 font-bold text-base hover:ring-2 hover:ring-white/70 transition-all cursor-pointer">
                    {user.email[0].toUpperCase()}
                  </Link>
                  <div className="absolute right-0 top-11 w-max bg-gray-800 text-white text-xs rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {user.email}
                  </div>
                </div>
                <button onClick={logout} className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-700 transition cursor-pointer">Logout</button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white focus:outline-none p-2">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> ) : ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /> )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="sm:hidden absolute w-full bg-black/80 backdrop-blur-lg z-10 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/profile" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
            <Link to="/projects" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</Link>
            <Link to="/search" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Search</Link>
          </div>
          <div className="px-4 pt-4 pb-3 border-t border-gray-700">
             {!user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/signin" onClick={closeMenu} className="flex-1 text-center text-gray-300 hover:text-white px-3 py-2">Sign In</Link>
                  <Link to="/signup" onClick={closeMenu} className="flex-1 text-center bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition">Sign Up</Link>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                   <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-yellow-500 flex items-center justify-center text-gray-800 font-bold text-base">
                        {user.email[0].toUpperCase()}
                      </div>
                      <span className="text-white ml-3 font-medium">{user.name}</span>
                   </div>
                   <button onClick={() => { logout(); closeMenu(); }} className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-700 transition">Logout</button>
                </div>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;