import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';

const Home = () => {
  const { siteData } = useContext(CmsContext);

  const heroStyle = siteData.images && siteData.images.length > 0
    ? { backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url(${siteData.images[0]})` }
    : { backgroundColor: 'var(--umss-blue)' };

  return (
    <div>
      <nav className="navbar">
        <h2>{siteData.headerTitle}</h2>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/admin" className="btn-login">Login</Link>
        </div>
      </nav>

      <header className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <h1>{siteData.heroTitle}</h1>
          <p>{siteData.heroSubtitle}</p>
          <button className="btn btn-red">{siteData.heroButtonText}</button>
        </div>
      </header>

      <main className="main-container">
        <h2 className="section-title">Información en Resumen</h2>
        <div className="info-grid">
          {siteData.infoBlocks.map((block, index) => (
            <div key={index} className="info-card">
              <h3>{block.title}</h3>
              <p>{block.content}</p>
            </div>
          ))}
        </div>

        {(siteData.images && siteData.images.length > 1) && (
          <div className="extra-gallery">
            <h2 className="section-title">Galería de Imágenes</h2>
            <div className="gallery-grid">
              {siteData.images.slice(1).map((img, index) => (
                <img key={index} src={img} alt={`Galería ${index}`} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;