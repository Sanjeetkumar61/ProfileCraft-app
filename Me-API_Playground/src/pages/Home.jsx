import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check storage for user data when component mounts
    const userString = localStorage.getItem('meapi_user') || sessionStorage.getItem('meapi_user');
    if (userString) {
      setUser(JSON.parse(userString));
    }

    // Listen for auth changes to update UI
    const handleAuthChange = () => {
      const updatedUserString = localStorage.getItem('meapi_user') || sessionStorage.getItem('meapi_user');
      setUser(updatedUserString ? JSON.parse(updatedUserString) : null);
    };
    window.addEventListener('auth-changed', handleAuthChange);
    return () => window.removeEventListener('auth-changed', handleAuthChange);
  }, []);

  return (
    <div className='pt-12'> 
    <div className=" w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* ===== LAYOUT MEIN YAHAN CHANGE HUA HAI ===== */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-10 items-center">
        
        {/* Left Column: Text Content & CTAs */}
        <div className="text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
            Craft Your Digital <span className="text-purple-400">Identity</span>.
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto md:mx-0">
            Welcome to <span className="font-semibold text-white">ProfileCraft</span>. 
            {user ? ` Manage your professional portfolio with ease, ${user.name}.` : ' The ultimate playground to build and showcase your skills, projects, and career milestones.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {!user ? (
              <Link to="/signup" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition transform hover:scale-105 shadow-lg">
                Get Started
              </Link>
            ) : (
              <Link to="/profile" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition transform hover:scale-105 shadow-lg">
                Go to Your Profile
              </Link>
            )}
            
            {user && user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition transform hover:scale-105 shadow-lg backdrop-blur-md"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Animated Graphics */}
        <div className="relative h-60 w-full md:h-80 lg:h-96">
            <div className="absolute top-0 left-1/4 h-48 w-48 bg-purple-500/20 rounded-2xl backdrop-blur-xl animate-float-slow border border-purple-400/30 shadow-2xl shadow-purple-500/10"></div>
            <div className="absolute bottom-0 left-0 h-56 w-72 bg-white/10 rounded-3xl backdrop-blur-lg animate-float border border-white/20 shadow-lg"></div>
            <div className="absolute top-1/2 right-0 h-32 w-32 bg-white/10 rounded-full backdrop-blur-md animate-float animation-delay-3000 border border-white/10 shadow-xl"></div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Home;