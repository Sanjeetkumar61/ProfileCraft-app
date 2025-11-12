import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Axios Interceptor to automatically send the token with requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('meapi_token') || sessionStorage.getItem('meapi_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// =================== AUTH ROUTES ===================
export const registerUser = async (userData) => {
  const { data } = await API.post('/users/register', userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await API.post('/users/login', userData);
  return data;
};


// =================== USER PROFILE ROUTE ===================
// NOTE: getProfile no longer exists, profile data comes from login/storage
export const updateProfile = async (profileData) => {
  // YEH URL AB THEEK KAR DIYA GAYA HAI
  const { data } = await API.put('/users/profile', profileData);
  return data;
};


// =================== SKILLS ROUTES ===================
export const getSkills = async () => {
  const { data } = await API.get('/skills');
  return data;
};

export const createSkill = async (skillData) => {
  const { data } = await API.post('/skills', skillData);
  return data;
};

export const updateSkill = async (id, skillData) => {
  const { data } = await API.put(`/skills/${id}`, skillData);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await API.delete(`/skills/${id}`);
  return data;
};


// =================== PROJECTS ROUTES ===================
export const getProjects = async (skill = '') => {
  const { data } = await API.get('/projects', { params: { skill: skill || undefined } });
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await API.get(`/projects/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await API.post('/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await API.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await API.delete(`/projects/${id}`);
  return data;
};


// =================== CERTIFICATES ROUTES ===================
export const getCertificates = async () => {
  const { data } = await API.get('/certificates');
  return data;
};

export const createCertificate = async (certData) => {
  const { data } = await API.post('/certificates', certData);
  return data;
};

export const updateCertificate = async (id, certData) => {
  const { data } = await API.put(`/certificates/${id}`, certData);
  return data;
};

export const deleteCertificate = async (id) => {
  const { data } = await API.delete(`/certificates/${id}`);
  return data;
};


// =================== SEARCH ROUTE ===================
export const search = async (query) => {
  const { data } = await API.get('/search', { params: { q: query } });
  return data;
};