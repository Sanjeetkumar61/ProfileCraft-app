import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams(); // URL se project ID nikalne ke liye
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectById(id)
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch project", err);
        setLoading(false);
      });
  }, [id]);

  const renderLink = (url, text) => {
    if (!url) return null;
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
      >
        {text}
      </a>
    );
  };

  if (loading) return <p className="text-white p-8 text-center">Loading project...</p>;
  if (!project) return <p className="text-white p-8 text-center">Project not found.</p>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-white/80 mb-6">{project.description}</p>
        
        {project.tech && project.tech.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="bg-purple-500/20 text-purple-300 text-sm font-semibold px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8 border-t border-white/20 pt-6">
          {renderLink(project.link, 'View Live Project')}
          {renderLink(project.repo, 'View GitHub Repo')}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;