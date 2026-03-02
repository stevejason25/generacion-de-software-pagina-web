import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';
import { ReactSortable } from "react-sortablejs";
import imageCompression from 'browser-image-compression';

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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true
    };

    for (const file of files) {
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), { url: reader.result, caption: '' }] 
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error al comprimir:", error);
      }
    }
  };

  const handleCaptionChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index].caption = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const sortableList = formData.images ? formData.images.slice(1).map((img, i) => ({ ...img, id: img.url + i })) : [];
  
  const handleSort = (newState) => {
    const cleanedList = newState.map(({ id, ...rest }) => rest);
    setFormData({ ...formData, images: [formData.images[0], ...cleanedList] });
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...formData.infoBlocks];
    newBlocks[index][field] = value;
    setFormData({ ...formData, infoBlocks: newBlocks });
  };

  const addBlock = () => {
    setFormData({ 
      ...formData, 
      infoBlocks: [...formData.infoBlocks, { title: '', content: '' }] 
    });
  };

  const removeBlock = (index) => {
    const newBlocks = formData.infoBlocks.filter((_, i) => i !== index);
    setFormData({ ...formData, infoBlocks: newBlocks });
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

          <h3 className="admin-subtitle">Sección Principal</h3>
          <label>Título Principal</label>
          <input type="text" name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} />
          <label>Subtítulo</label>
          <textarea rows="2" name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} />

          <h3 className="admin-subtitle">Imágenes y Noticias</h3>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          
          <div className="preview-gallery">
            {formData.images && formData.images.length > 0 && (
              <div className="preview-item fixed-item">
                <p style={{fontSize: '12px', fontWeight: 'bold', margin: '5px 0'}}>Fondo Principal</p>
                <img src={formData.images[0].url} alt="Fondo" />
                <button type="button" className="btn-remove" onClick={() => removeImage(0)}>Quitar</button>
              </div>
            )}

            <ReactSortable
              list={sortableList}
              setList={handleSort}
              className="preview-gallery sortable-container"
              animation={200}
            >
              {sortableList.map((img, index) => {
                const realIndex = index + 1;
                return (
                  <div key={img.id} className="preview-item draggable-item">
                    <textarea 
                      rows="3" 
                      placeholder="Texto de la noticia..." 
                      value={img.caption} 
                      onChange={(e) => handleCaptionChange(realIndex, e.target.value)} 
                      className="caption-input"
                    />
                    <img src={img.url} alt={`Preview ${realIndex}`} />
                    <button type="button" className="btn-remove" onClick={() => removeImage(realIndex)}>Quitar</button>
                  </div>
                );
              })}
            </ReactSortable>
          </div>

          <h3 className="admin-subtitle">Bloques de Resumen</h3>
          {formData.infoBlocks.map((block, index) => (
            <div key={index} className="block-editor">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                <h4 style={{margin: 0, color: '#666'}}>Bloque {index + 1}</h4>
                <button type="button" className="btn-remove" style={{width: 'auto', margin: 0, padding: '5px 10px'}} onClick={() => removeBlock(index)}>Quitar Bloque</button>
              </div>
              <input type="text" value={block.title} placeholder="Título del bloque" onChange={(e) => handleBlockChange(index, 'title', e.target.value)} />
              <textarea rows="3" value={block.content} placeholder="Contenido del bloque" onChange={(e) => handleBlockChange(index, 'content', e.target.value)} />
            </div>
          ))}

          <button type="button" className="btn btn-blue" onClick={addBlock}>+ Agregar Nuevo Bloque</button>
          <button type="submit" className="btn btn-red mt-20" style={{marginTop: '40px'}}>Guardar Todos los Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;