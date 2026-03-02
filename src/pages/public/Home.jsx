import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CmsContext } from '../../context/CmsContext';

const Home = () => {
  const { siteData } = useContext(CmsContext);

  return (
    <div>
      <nav className="navbar">
        <h2>{siteData.headerTitle}</h2>
        <Link to="/admin" className="btn-login">Panel Admin</Link>
      </nav>
      <header className="hero">
        <h1>{siteData.heroTitle}</h1>
        <p>{siteData.heroSubtitle}</p>
      </header>
      <div className="gallery">
        {siteData.images?.map((img, i) => (
          <img key={i} src={img} alt="Información UMSS" />
        ))}
      </div>
    </div>
  );
};

export default Home;