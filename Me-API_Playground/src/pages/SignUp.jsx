// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../services/api'; // <-- STEP 1: API function import karein

// const SignUp = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   // remember state ki ab zaroorat nahi hai, token login par store karenge
//   // const [remember, setRemember] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateEmail = (e) => {
//     return /\S+@\S+\.\S+/.test(e);
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Client-side validation bilkul waisi hi rahegi
//     if (!fullName.trim()) return setError('Full name is required');
//     if (!email.trim() || !validateEmail(email)) return setError('Please enter a valid email');
//     if (password.length < 6) return setError('Password must be at least 6 characters');
//     if (password !== confirmPassword) return setError('Passwords do not match');

//     setLoading(true);

//     try {
//       // ===== YAHAN ASLI API CALL HO RAHA HAI =====
//       const userData = {
//         name: fullName, // Backend mein 'name' field hai
//         email: email,
//         password: password,
//       };
      
//       const data = await registerUser(userData);
      
//       console.log('Registration successful:', data);

//       // Registration ke baad, user ko login page par bhej dein ek success message ke saath
//       navigate('/signin', { state: { message: 'Registration successful! Please log in.' } });

//     } catch (err) {
//       // Backend se aaye error ko display karein
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false); // Success ya error, loading ko hamesha false karein
//     }
//   };

//   return (
//     <div className="flex items-center justify-center p-6">
//       <div className="w-full max-w-md mx-auto">
//         <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/20 rounded-xl p-8 shadow-xl text-white">
//           <h2 className="text-2xl font-bold text-center mb-6">Create account</h2>
//           <form onSubmit={submit} className="space-y-4">
//             {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-md">{error}</div>}

//             <div>
//               <label className="text-sm text-white/80">Full Name</label>
//               <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white placeholder-white/60" placeholder="Full Name" required />
//             </div>

//             <div>
//               <label className="text-sm text-white/80">Email</label>
//               <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white placeholder-white/60" placeholder="Email" required />
//             </div>

//             <div>
//               <label className="text-sm text-white/80">Password</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white placeholder-white/60" placeholder="Password" required />
//             </div>

//             <div>
//               <label className="text-sm text-white/80">Confirm Password</label>
//               <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white placeholder-white/60" placeholder="Confirm Password" required />
//             </div>
            
//             {/* Remember me checkbox ko hum login page par use karenge */}

//             <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:opacity-90 text-white py-2 rounded-full font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed cursor-pointer">
//               {loading ? 'Creating account...' : 'Register'}
//             </button>

//             <div className="text-center text-sm text-white/80">
//               Already have an account? <a href="/signin" className="underline">Login</a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ frontend validations
    if (!fullName.trim()) return setError("Full name is required");
    if (!email || !validateEmail(email)) return setError("Enter a valid email");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      // ✅ backend expects "name", not fullName
      const payload = {
        name: fullName,
        email,
        password,
      };

      const data = await registerUser(payload);

      console.log("Registration success:", data);

      // redirect after success
      navigate("/signin", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/20 rounded-xl p-8 shadow-xl text-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create account
          </h2>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-white/80">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="text-sm text-white/80">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="text-sm text-white/80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white"
                placeholder="Password"
              />
            </div>

            <div>
              <label className="text-sm text-white/80">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-white/5 border-b border-white/20 rounded-sm text-white"
                placeholder="Confirm Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:opacity-90 text-white py-2 rounded-full font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="text-center text-sm text-white/80">
              Already have an account?{" "}
              <a href="/signin" className="underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
