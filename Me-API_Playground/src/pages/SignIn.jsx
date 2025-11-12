import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.message;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }

    setLoading(true);

    try {
      const userData = { email, password };
      const data = await loginUser(userData);

      // Determine which storage to use
      const storage = remember ? localStorage : sessionStorage;

      // ===== YAHAN CHANGE HUA HAI =====
      // Pehle hum sirf name aur email save kar rahe the.
      // Ab hum poora 'data' object save karenge.
      storage.setItem('meapi_token', data.token);
      storage.setItem('meapi_user', JSON.stringify(data));
      // ===============================
      
      window.dispatchEvent(new Event('auth-changed'));
      navigate('/profile');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/20 rounded-xl p-8 shadow-xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          
          {successMessage && <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-md mb-4">{successMessage}</div>}
          {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-md mb-4">{error}</div>}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-white/80">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/60" placeholder="Email" required />
            </div>
            <div>
              <label className="text-sm text-white/80">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/60" placeholder="Password" required />
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-white/80">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2" /> Remember Me
              </label>
              <button type="button" className="text-sm text-white/70 underline" onClick={() => alert('Forgot password not implemented')}>Forget Password?</button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:opacity-90 text-white py-2 rounded-full font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed cursor-pointer">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center text-sm text-white/80">
              Don't have an account? <a href="/signup" className="underline">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;