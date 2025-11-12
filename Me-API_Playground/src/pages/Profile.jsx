import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import SkillsSection from '../components/SkillsSection';
import CertificatesSection from '../components/CertificatesSection';
import { 
  updateProfile, 
  getSkills, createSkill, 
  getCertificates, createCertificate, updateCertificate, deleteCertificate 
} from '../services/api';

// Certificate Form Component
const CertificateForm = ({ certificate, onSave, onCancel }) => {
  const [formData, setFormData] = useState(certificate || { title: '', issuer: '', date: '', imageUrl: '' });
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-30">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-lg text-white border border-white/20">
        <h2 className="text-2xl font-bold mb-6">{certificate ? 'Edit Certificate' : 'Add New Certificate'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Certificate Title" className="w-full p-2 bg-white/5 rounded-md" required />
          <input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Issuer (e.g., Coursera, Udemy)" className="w-full p-2 bg-white/5 rounded-md" required />
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL (upload on imgur.com)" className="w-full p-2 bg-white/5 rounded-md" required />
          <input name="date" type="date" value={formData.date ? formData.date.split('T')[0] : ''} onChange={handleChange} className="w-full p-2 bg-white/5 rounded-md" />
          <div className="flex gap-4 pt-4"> <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold">Save</button> <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold">Cancel</button> </div>
        </form>
      </div>
    </div>
  );
};

// Skill Form Component (Responsive)
const SkillForm = ({ onSave, onCancel }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate' });
  const handleSubmit = (e) => { e.preventDefault(); if (!newSkill.name) return; onSave(newSkill); };
  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-4">
      <input value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} placeholder="Skill Name (e.g., React)" className="flex-grow p-2 bg-white/5 rounded-md text-white" />
      <select value={newSkill.level} onChange={(e) => setNewSkill({...newSkill, level: e.target.value})} className="p-2 bg-white/5 rounded-md text-white">
        <option value="intermediate" className="bg-gray-800">Intermediate</option>
        <option value="beginner" className="bg-gray-800">Beginner</option>
        <option value="advanced" className="bg-gray-800">Advanced</option>
      </select>
      <div className="flex gap-2 justify-end">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold">Cancel</button>
      </div>
    </form>
  );
};


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isCertFormVisible, setIsCertFormVisible] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const fetchAllData = () => {
    const token = localStorage.getItem('meapi_token') || sessionStorage.getItem('meapi_token');
    const userString = localStorage.getItem('meapi_user') || sessionStorage.getItem('meapi_user');

    if (token && userString) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(userString);
        setProfile(userData); 
        setProfileFormData(userData);
        getSkills().then(data => setSkills(data));
        getCertificates().then(data => setCertificates(data));
      } catch (error) {
        console.error("Failed to parse user data", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    window.addEventListener('auth-changed', fetchAllData);
    return () => window.removeEventListener('auth-changed', fetchAllData);
  }, []);
  
  const handleProfileEditClick = () => { setIsEditingProfile(true); setProfileError(''); };
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setProfileFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    try {
      const updatedUser = await updateProfile(profileFormData);
      const storage = localStorage.getItem('meapi_token') ? localStorage : sessionStorage;
      storage.setItem('meapi_user', JSON.stringify(updatedUser));
      setProfile(updatedUser);
      setIsEditingProfile(false);
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };
  const handleSaveSkill = async (skillData) => { try { await createSkill(skillData); setIsAddingSkill(false); fetchAllData(); } catch (error) { console.error("Failed to create skill", error); } };
  const handleAddCertClick = () => { setEditingCertificate(null); setIsCertFormVisible(true); };
  const handleEditCertClick = (cert) => { setEditingCertificate(cert); setIsCertFormVisible(true); };
  const handleDeleteCertClick = async (id) => { if (window.confirm('Are you sure you want to delete this certificate?')) { await deleteCertificate(id); fetchAllData(); } };
  const handleSaveCertificate = async (formData) => { if (editingCertificate) { await updateCertificate(editingCertificate._id, formData); } else { await createCertificate(formData); } setIsCertFormVisible(false); fetchAllData(); };

  if (!isLoggedIn) { return ( <div className="text-white p-8 text-center min-h-screen"> <h1 className="text-2xl font-bold">Please log in to view your profile.</h1> </div> ); }
  if (!profile) return <div className="text-white p-8 animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Profile</h2>
        {isLoggedIn && !isEditingProfile && ( <div className="flex justify-end mb-4 -mt-12"> <button onClick={handleProfileEditClick} className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition cursor-pointer">Edit Profile</button> </div> )}
        {isEditingProfile ? (
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg text-white border border-white/20">
            <h2 className="text-3xl font-bold mb-6">Edit Your Profile</h2>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Name</label> <input name="name" value={profileFormData.name || ''} onChange={handleProfileChange} placeholder="Full Name" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Bio</label> <textarea name="bio" value={profileFormData.bio || ''} onChange={handleProfileChange} placeholder="Your Bio" className="w-full p-2 bg-white/5 rounded-md" rows="3"></textarea> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Email</label> <input name="email" value={profileFormData.email || ''} onChange={handleProfileChange} placeholder="Display Email" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Education</label> <input name="education" value={profileFormData.education || ''} onChange={handleProfileChange} placeholder="Education" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Location</label> <input name="location" value={profileFormData.location || ''} onChange={handleProfileChange} placeholder="Location" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Resume Link</label> <input name="resumeUrl" value={profileFormData.resumeUrl || ''} onChange={handleProfileChange} placeholder="Resume Link (Google Drive, etc.)" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <h3 className="text-lg font-semibold pt-2">Social Links</h3>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">GitHub URL</label> <input name="social.github" value={profileFormData.social?.github || ''} onChange={handleProfileChange} placeholder="https://github.com/username" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">LinkedIn URL</label> <input name="social.linkedin" value={profileFormData.social?.linkedin || ''} onChange={handleProfileChange} placeholder="https://linkedin.com/in/username" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              <div> <label className="block text-sm font-medium text-white/80 mb-1">Portfolio URL</label> <input name="social.portfolio" value={profileFormData.social?.portfolio || ''} onChange={handleProfileChange} placeholder="https://your-portfolio.com" className="w-full p-2 bg-white/5 rounded-md" /> </div>
              {profileError && <div className="text-red-400 text-sm">{profileError}</div>}
              <div className="flex gap-4 pt-4"> <button type="submit" disabled={profileLoading} className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 disabled:bg-green-400 cursor-pointer"> {profileLoading ? 'Saving...' : 'Save Changes'} </button> <button type="button" onClick={() => setIsEditingProfile(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 cursor-pointer"> Cancel </button> </div>
            </form>
          </div>
        ) : (
          <ProfileCard profile={profile} />
        )}
        <div className="flex justify-between items-center mt-12 mb-6">
          <h2 className="text-3xl font-bold text-white">Skills</h2>
          {isLoggedIn && !isAddingSkill && ( <button onClick={() => setIsAddingSkill(true)} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition cursor-pointer">Add New Skill</button> )}
        </div>
        {isAddingSkill && <SkillForm onSave={handleSaveSkill} onCancel={() => setIsAddingSkill(false)} />}
        <SkillsSection skills={skills} isLoggedIn={isLoggedIn} refreshSkills={fetchAllData} />
        <div className="flex justify-between items-center mt-12 mb-6">
          <h2 className="text-3xl font-bold text-white">Certificates</h2>
          {isLoggedIn && (<button onClick={handleAddCertClick} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition cursor-pointer">Add Certificate</button>)}
        </div>
        <CertificatesSection certificates={certificates} isLoggedIn={isLoggedIn} onEdit={handleEditCertClick} onDelete={handleDeleteCertClick} />
        {isCertFormVisible && <CertificateForm certificate={editingCertificate} onSave={handleSaveCertificate} onCancel={() => setIsCertFormVisible(false)} />}
      </div>
    </div>
  );
};

export default Profile;