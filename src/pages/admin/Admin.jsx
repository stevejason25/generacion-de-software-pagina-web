import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';

const Admin = () => {
  const { siteData, setSiteData } = useContext(CmsContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(siteData);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="admin-container">
      <Link to="/" className="btn-inicio">Inicio</Link>
      <h2>Configuración UMSS</h2>
      <input type="text" value={formData.headerTitle} onChange={e => setFormData({...formData, headerTitle: e.target.value})} placeholder="Título Header" />
      <input type="file" multiple onChange={handleImage} />
      <button onClick={() => { setSiteData(formData); navigate('/'); }}>Guardar Cambios</button>
    </div>
  );
};
export default Admin;
