import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../services/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        setLoading(true);
        search(searchTerm.trim())
          .then(data => {
            setResults(data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Search failed:", err);
            setLoading(false);
          });
      } else {
        setResults(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

        <div className="relative mb-8">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for projects, skills, profile info..."
            className="w-full p-4 pl-12 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        {loading && <p className="text-white text-center animate-pulse">Searching...</p>}
        
        {results && !loading && (
          <div className="space-y-8">
            {/* Projects Results */}
            {results.projects?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Projects Found</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.projects.map(project => (
                    <Link to={`/projects/${project._id}`} key={project._id} className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
                      <h3 className="font-bold text-lg text-white">{project.title}</h3>
                      <p className="text-white/70 text-sm">{project.description?.substring(0, 100)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Results */}
            {results.skills?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Skills Found</h2>
                <div className="flex flex-wrap gap-2">
                  {results.skills.map(skill => (
                    <span key={skill._id} className="bg-purple-500/20 text-purple-300 text-sm font-semibold px-3 py-1 rounded-full">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Result */}
            {results.profile && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Profile Match</h2>
                <Link to="/profile" className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
                  <h3 className="font-bold text-lg text-white">{results.profile.name}</h3>
                  {results.profile.bio && <p className="text-white/70 text-sm">{results.profile.bio}</p>}
                </Link>
              </div>
            )}
            
            {/* No Results Message */}
            {searchTerm && results.projects?.length === 0 && results.skills?.length === 0 && !results.profile && (
              <p className="text-white/80 text-center text-lg">No results found for "{searchTerm}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;