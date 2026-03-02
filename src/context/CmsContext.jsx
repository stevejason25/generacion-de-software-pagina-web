import React, { createContext, useState, useEffect } from 'react';

export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const getInitialData = () => {
    // Cambiamos a V3 para forzar la recarga de las nuevas imágenes por defecto
    const saved = localStorage.getItem('umssDataV3');
    if (saved) return JSON.parse(saved);
    
    return {
      headerTitle: "Universidad Mayor de San Simón",
      heroTitle: "Portal de Información Académica",
      heroSubtitle: "Mantente al tanto de las convocatorias, noticias y eventos de nuestra casa superior de estudios.",
      // Aquí enlazamos las imágenes que pusiste en la carpeta public
      images: [
        "/fondo-hero.jpg", // Índice 0: Fondo del Banner principal
        "/noticia1.jpg",   // Índice 1: Noticia PTAG
        "/noticia2.jpg",   // Índice 2: Noticia Libro
        "/noticia3.jpg"    // Índice 3: Noticia Feria
      ], 
      infoBlocks: [
        { title: "¿QUÉ ES ESTE PORTAL?", content: "Un espacio centralizado para la difusión de información académica y administrativa de la UMSS." },
        { title: "REQUISITOS", content: "Para participar en las convocatorias, debes estar matriculado en la gestión actual." },
        { title: "FECHAS CLAVE", content: "Inicio de semestre: 15 de marzo. Exámenes parciales: mayo." }
      ]
    };
  };

  const [siteData, setSiteData] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem('umssDataV3', JSON.stringify(siteData));
  }, [siteData]);

  return (
    <CmsContext.Provider value={{ siteData, setSiteData }}>
      {children}
    </CmsContext.Provider>
  );
};