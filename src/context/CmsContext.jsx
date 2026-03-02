import React, { createContext, useState, useEffect } from 'react';

export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const getInitialData = () => {
    const saved = localStorage.getItem('umssDataV4');
    if (saved) return JSON.parse(saved);
    
    return {
      headerTitle: "Universidad Mayor de San Simón",
      heroTitle: "Portal de Información Académica",
      heroSubtitle: "Mantente al tanto de las convocatorias, noticias y eventos de nuestra casa superior de estudios.",
      images: [
        { url: "/fondo-hero.jpg", caption: "" },
        { url: "/noticia1.jpg", caption: "Convocatoria a Charlas Informativas PTAG - Versión XLVII." },
        { url: "/noticia2.jpg", caption: "Presentación del libro: El arquero de la iconografía Tiwanaku en los valles de Cochabamba." },
        { url: "/noticia3.jpg", caption: "Feria de Comercio Justo y Alimentación Saludable - Viernes 13 de febrero." }
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
    localStorage.setItem('umssDataV4', JSON.stringify(siteData));
  }, [siteData]);

  return (
    <CmsContext.Provider value={{ siteData, setSiteData }}>
      {children}
    </CmsContext.Provider>
  );
};