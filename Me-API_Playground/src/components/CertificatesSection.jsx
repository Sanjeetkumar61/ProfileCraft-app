import React from 'react';

const CertificatesSection = ({ certificates, isLoggedIn, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <div key={cert._id} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 ">
          <img src={cert.imageUrl} alt={cert.title} className="w-full h-48 object-cover" />
          <div className="p-4 relative">
            <h3 className="text-lg font-bold text-white">{cert.title}</h3>
            <p className="text-sm text-white/80">Issued by: {cert.issuer}</p>
            {cert.date && <p className="text-xs text-white/60 mt-1">
              Date: {new Date(cert.date).toLocaleDateString()}
            </p>}
            
            {isLoggedIn && (
              // ===== YAHAN CHANGE HUA HAI =====
              <div className="absolute top-2 right-2 flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(cert)} className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-500 cursor-pointer">Edit</button>
                <button onClick={() => onDelete(cert._id)} className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-500 cursor-pointer">Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificatesSection;