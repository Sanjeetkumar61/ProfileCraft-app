import React from 'react';

const ProjectsSection = ({ projects, isLoggedIn, onEdit, onDelete }) => {
  // Helper function to create a link if the URL exists
  const renderLink = (url, text) => {
    if (!url) return null;
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-purple-400 hover:underline text-sm font-semibold"
      >
        {text}
      </a>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project._id} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 flex flex-col justify-between transition transform hover:-translate-y-1">
          {/* Project Details */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm mb-4 h-20 overflow-y-auto">{project.description}</p>
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            )}
          </div>
          
          {/* Links and Action Buttons */}
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/10">
             <div className="flex gap-4">
                {renderLink(project.link, 'Live Link')}
                {renderLink(project.repo, 'GitHub')}
             </div>
            
            {/* Edit and Delete buttons - only show if logged in */}
            {isLoggedIn && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(project)} className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-500">Edit</button>
                <button onClick={() => onDelete(project._id)} className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-500">Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;