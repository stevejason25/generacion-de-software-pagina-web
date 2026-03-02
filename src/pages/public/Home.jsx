import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';

const Home = () => {
  const { siteData } = useContext(CmsContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroStyle = siteData.images && siteData.images.length > 0
    ? { backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url(${siteData.images[0].url})` }
    : { backgroundColor: 'var(--umss-blue)' };

  return (
    <div>
      <nav className="navbar">
        <h2>{siteData.headerTitle}</h2>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/">Inicio</Link>
          <Link to="/admin" className="btn-login">Login</Link>
        </div>
      </nav>

      <header className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <h1>{siteData.heroTitle}</h1>
          <p>{siteData.heroSubtitle}</p>
        </div>
      </header>

      <main className="main-container">
        {(siteData.images && siteData.images.length > 1) && (
          <div className="extra-gallery" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Apartado de Noticias</h2>
            <div className="news-list">
              {siteData.images.slice(1).map((img, index) => (
                <div key={index} className="news-card">
                  {img.caption && <p className="news-caption">{img.caption}</p>}
                  <img src={img.url} alt={`Noticia ${index}`} className="news-image" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="section-title">Información en Resumen</h2>
          <div className="info-grid">
            {siteData.infoBlocks.map((block, index) => (
              <div key={index} className="info-card">
                <h3>{block.title}</h3>
                <p>{block.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>Universidad Mayor de San Simón</p>
          <p>Cochabamba - Bolivia</p>
          <p>&copy; 2026 Portal de Información Académica</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;