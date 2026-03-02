import React, { createContext, useState, useEffect } from 'react';

export const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const getInitialData = () => {
    const saved = localStorage.getItem('umssDataV2');
    if (saved) return JSON.parse(saved);
    
    return {
      headerTitle: "Universidad Mayor de San Simón",
      heroTitle: "Portal de Información Académica 2026",
      heroSubtitle: "Mantente al tanto de las convocatorias, noticias y eventos de nuestra casa superior de estudios.",
      heroButtonText: "Ver Convocatorias",
      images: [], 
      infoBlocks: [
        { title: "¿QUÉ ES ESTE PORTAL?", content: "Un espacio centralizado para la difusión de información académica y administrativa de la UMSS." },
        { title: "REQUISITOS", content: "Para participar en las convocatorias, debes estar matriculado en la gestión actual." },
        { title: "FECHAS CLAVE", content: "Inicio de semestre: 15 de marzo. Exámenes parciales: mayo." }
      ]
    };
  };

  const [siteData, setSiteData] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem('umssDataV2', JSON.stringify(siteData));
  }, [siteData]);

  return (
    <CmsContext.Provider value={{ siteData, setSiteData }}>
      {children}
    </CmsContext.Provider>
  );
};