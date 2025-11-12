const ProfileCard = ({ profile }) => {
  const renderLink = (url, text) => {
    if (!url) return null;
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-400 hover:text-blue-300 underline"
      >
        {text}
      </a>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
      
      {/* ===== YEH NAYI LINE ADD HUI HAI ===== */}
      {profile.bio && <p className="text-white/90 my-4 text-base">{profile.bio}</p>}
      {/* ===================================== */}

      {profile.email && <p className="text-white mb-2"><span className="font-semibold">Email:</span> {profile.email}</p>}
      {profile.education && <p className="text-white mb-4"><span className="font-semibold">Education:</span> {profile.education}</p>}
      
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {renderLink(profile.social?.github, 'GitHub')}
        {renderLink(profile.social?.linkedin, 'LinkedIn')}
        {renderLink(profile.social?.portfolio, 'Portfolio')}
        
      </div>
    </div>
  );
};

export default ProfileCard;