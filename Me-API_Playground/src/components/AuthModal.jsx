import { useState } from 'react';

const AuthModal = ({ mode = 'signin', onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = mode === 'signin' ? 'Login' : 'Register';

  const submit = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    // simulate server delay
    await new Promise((r) => setTimeout(r, 600));
    // store fake token
    try {
      if (remember) {
        localStorage.setItem('meapi_token', 'fake-token');
        localStorage.setItem('meapi_name', username);
      } else {
        sessionStorage.setItem('meapi_token', 'fake-token');
        sessionStorage.setItem('meapi_name', username);
      }
      onSuccess && onSuccess({ name: username });
      onClose && onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/20 rounded-xl p-6 shadow-xl text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-white/80">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/60"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white/80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/60"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-white/80">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2" /> Remember me
              </label>
              <button type="button" className="text-sm text-white/70 underline" onClick={() => alert('Forgot password flow not implemented')}>Forget Password?</button>
            </div>

            <div>
              <button type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-full font-semibold">
                {loading ? 'Please wait...' : title}
              </button>
            </div>

            <div className="text-center text-sm text-white/80">
              {mode === 'signin' ? (
                <>
                  Don't have an account? <button type="button" className="underline" onClick={() => { onClose(); setTimeout(() => window.dispatchEvent(new CustomEvent('open-auth', { detail: { mode: 'signup' } })), 50); }}>Register</button>
                </>
              ) : (
                <>
                  Already have an account? <button type="button" className="underline" onClick={() => { onClose(); setTimeout(() => window.dispatchEvent(new CustomEvent('open-auth', { detail: { mode: 'signin' } })), 50); }}>Login</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
