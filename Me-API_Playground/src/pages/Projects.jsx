import { useEffect, useState } from 'react';
import ProjectsSection from '../components/ProjectsSection';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(project || { title: '', description: '', repo: '', link: '', tech: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tech') {
      setFormData(prev => ({ ...prev, tech: value.split(',').map(t => t.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-30">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-lg text-white border border-white/20">
        <h2 className="text-2xl font-bold mb-6">{project ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" className="w-full p-2 bg-white/5 rounded-md" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 bg-white/5 rounded-md" rows="3" required></textarea>
          <input name="repo" value={formData.repo} onChange={handleChange} placeholder="GitHub Repo URL" className="w-full p-2 bg-white/5 rounded-md" />
          <input name="link" value={formData.link} onChange={handleChange} placeholder="Live Project URL" className="w-full p-2 bg-white/5 rounded-md" />
          <input name="tech" value={Array.isArray(formData.tech) ? formData.tech.join(', ') : ''} onChange={handleChange} placeholder="Technologies (comma-separated, e.g., React, Node.js)" className="w-full p-2 bg-white/5 rounded-md" />
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90">Save</button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = () => {
    getProjects().then(data => setProjects(data));
  };

  useEffect(() => {
    const token = localStorage.getItem('meapi_token') || sessionStorage.getItem('meapi_token');
    setIsLoggedIn(!!token);
    fetchProjects();
  }, []);

  const handleAddNewClick = () => {
    setEditingProject(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        fetchProjects(); // Refresh list
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleSaveProject = async (formData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData);
      } else {
        await createProject(formData);
      }
      setIsFormVisible(false);
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          {isLoggedIn && (
            <button onClick={handleAddNewClick} className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition">
              Add New Project
            </button>
          )}
        </div>
        
        <ProjectsSection 
          projects={projects} 
          isLoggedIn={isLoggedIn}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {isFormVisible && (
          <ProjectForm 
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;