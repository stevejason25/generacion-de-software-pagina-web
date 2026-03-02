import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';

const Admin = () => {
  const { siteData, setSiteData } = useContext(CmsContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const navigate = useNavigate();
  const [formData, setFormData] = useState(siteData);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.user === 'admin' && loginForm.pass === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSiteData(formData);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[index][field] = value;
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <div className="admin-nav">
          <Link to="/" className="btn-inicio">Inicio</Link>
        </div>
        <div className="admin-container">
          <h2>Ingreso Administrativo</h2>
          <form onSubmit={handleLogin} className="form-group">
            <input type="text" name="user" placeholder="Usuario" onChange={e => setLoginForm({...loginForm, user: e.target.value})} required />
            <input type="password" name="pass" placeholder="Contraseña" onChange={e => setLoginForm({...loginForm, pass: e.target.value})} required />
            <button type="submit" className="btn btn-blue">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-nav">
        <Link to="/" className="btn-inicio">Inicio</Link>
      </div>
      <div className="admin-container">
        <h2>Panel de Edición UMSS</h2>
        <form onSubmit={handleSave} className="form-group">
          <label>Título de Navegación</label>
          <input type="text" name="headerTitle" value={formData.headerTitle || ''} onChange={handleChange} />

          <h3 className="admin-subtitle">Sección Principal (Banner)</h3>
          <label>Título Principal</label>
          <input type="text" name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} />
          <label>Subtítulo</label>
          <textarea rows="2" name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} />
          <label>Texto del Botón</label>
          <input type="text" name="heroButtonText" value={formData.heroButtonText || ''} onChange={handleChange} />

          <h3 className="admin-subtitle">Imágenes (La 1ra será el fondo del Banner)</h3>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          <div className="preview-gallery">
            {(formData.images || []).map((img, index) => (
              <div key={index} className="preview-item">
                <img src={img} alt={`Preview ${index}`} />
                <button type="button" className="btn-remove" onClick={() => removeImage(index)}>Quitar</button>
              </div>
            ))}
          </div>

          <h3 className="admin-subtitle">Bloques de Resumen</h3>
          {formData.infoBlocks.map((block, index) => (
            <div key={index} className="block-editor">
              <input type="text" value={block.title} onChange={(e) => handleBlockChange(index, 'title', e.target.value)} />
              <textarea rows="3" value={block.content} onChange={(e) => handleBlockChange(index, 'content', e.target.value)} />
            </div>
          ))}

          <button type="submit" className="btn btn-red mt-20">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;