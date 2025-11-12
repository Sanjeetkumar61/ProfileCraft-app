import { useState, useEffect } from 'react';
import { updateSkill, deleteSkill } from '../services/api';

const SkillsSection = ({ skills: initialSkills, isLoggedIn, refreshSkills }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        refreshSkills();
      } catch (error) {
        console.error("Failed to delete skill", error);
      }
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await updateSkill(id, editFormData);
      setEditingSkillId(null);
      refreshSkills();
    } catch (error) {
      console.error("Failed to update skill", error);
    }
  };

  const startEditing = (skill) => {
    setEditingSkillId(skill._id);
    setEditFormData({ name: skill.name, level: skill.level });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        editingSkillId === skill._id ? (
           <form key={skill._id} onSubmit={(e) => handleUpdate(e, skill._id)} className="bg-white/20 p-4 rounded-lg flex flex-col gap-2">
              <input value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="p-2 bg-white/5 rounded-md text-white" />
              <select value={editFormData.level} onChange={(e) => setEditFormData({...editFormData, level: e.target.value})} className="p-2 bg-white/5 rounded-md text-white">
                  <option value="intermediate" className="bg-gray-800">Intermediate</option>
                  <option value="beginner" className="bg-gray-800">Beginner</option>
                  <option value="advanced" className="bg-gray-800">Advanced</option>
              </select>
              <div className="flex gap-2">
                  <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold cursor-pointer">Update</button>
                  <button type="button" onClick={() => setEditingSkillId(null)} className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm font-semibold">Cancel</button>
              </div>
          </form>
        ) : (
          <div key={skill._id} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 transition transform hover:scale-105 relative">
            <h3 className="text-white text-lg font-semibold">{skill.name}</h3>
            <p className="text-white/70 text-sm capitalize">{skill.level}</p>
            {isLoggedIn && (
              // ===== YAHAN CHANGE HUA HAI =====
              <div className="absolute top-2 right-2 flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEditing(skill)} className="bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(skill._id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer">Delete</button>
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default SkillsSection;