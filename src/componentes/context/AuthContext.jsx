import { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import api  from "../../utils/axios.js"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const cookieData = Cookies.get('UsuarioContext');
    return cookieData ? JSON.parse(cookieData) : null;
  });

  // Función para iniciar sesión y guardar los datos tanto en el estado como en la cookie

  const obtenerUserLogueado = async  () =>{
    try {

      //http://127.0.0.1:8000/api/me/
      const response = await api.get("me/");
      console.log(response.data)
        setAuthData(response.data)

    }catch (e){
      console.error(e)
    }
  }

  // Función para eliminar el contexto cuando se cierra la sesion
  const cerrarSesion = () => {
    console.log('Sesion Finalizada');
    setAuthData(null);
    Cookies.remove("Token")
    Cookies.remove('UsuarioContext');
  };

  useEffect(() => {
    // Ver los datos guardados en el contexto cada vez que authData cambia
  obtenerUserLogueado()
  }, []);

  return (
    <AuthContext.Provider value={{ authData, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
  