import api from '../../utils/axios.js';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; 

export const LoginForm = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const { register: registerLogin, formState: { errors: loginErrors }, handleSubmit: handleLoginSubmit } = useForm();
  const { register: registerRegister, formState: { errors: registerErrors }, handleSubmit: handleRegisterFormSubmit } = useForm();

  const fetchData = async (data) => {
    setLoading(true); 
    try {
      const response = await api.post("auth/login/", data);
      if (response) {
        const token = response.data.access;
        localStorage.setItem('authToken', token);
        iniciarSesion(response.data); 
        navigate('/home');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoginError('Credenciales incorrectas');
    } finally {
      setLoading(false); 
    }
  };

  const handleRegisterSubmit = async (data) => {
    setLoading(true); 
    try {
      const registerData = {
        username: data.nombre,
        nombre: data.nombre,
        email: data.regEmail,
        telefono: data.telefono,
        tipo_usuario: 'cliente',
        estado: 'activo',
        contrasena: data.regPassword,
      };
      const response = await api.post("/usuarios/", registerData);
      if (response) {
        alert('¡Registro exitoso!');
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      setRegisterError('Error en el registro, intenta de nuevo.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {/* Login Form */}
      <form className="w-full max-w-md space-y-6" onSubmit={handleLoginSubmit(fetchData)}>
        {loginError && <p className="text-red-500">{loginError}</p>} {/* Error message for login */}
        <p className="text-center text-sm text-gray-600 mb-4">
          ¿No tienes cuenta?{" "}
          <a 
            href="#" 
            className="text-green-500 hover:underline"
            onClick={() => setModalOpen(true)} 
          >
            Regístrate
          </a>
        </p>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="ejemplo@correo.com"
            {...registerLogin("email", { required: true })}
          />
          {loginErrors.email && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
            {...registerLogin("password", { required: true })}
          />
          {loginErrors.password && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        <button type="submit" className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Registro</h2>
            {registerError && <p className="text-red-500">{registerError}</p>} {/* Error message for registration */}
            <form className="space-y-4" onSubmit={handleRegisterFormSubmit(handleRegisterSubmit)}>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tu nombre completo"
                  {...registerRegister("nombre", { required: true })}
                />
                {registerErrors.nombre && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div>
                <label htmlFor="regEmail" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
                <input
                  id="regEmail"
                  name="regEmail"
                  type="email"
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ejemplo@correo.com"
                  {...registerRegister("regEmail", { required: true })}
                />
                {registerErrors.regEmail && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-600">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Número de teléfono"
                  {...registerRegister("telefono", { required: true })}
                />
                {registerErrors.telefono && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div>
                <label htmlFor="regPassword" className="block text-sm font-medium text-gray-600">Contraseña</label>
                <input
                  id="regPassword"
                  name="regPassword"
                  type="password"
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="********"
                  {...registerRegister("regPassword", { required: true })}
                />
                {registerErrors.regPassword && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <button type="submit" className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" disabled={loading}>
                {loading ? 'Cargando...' : 'Registrarse'}
              </button>
              <button type="button" className="w-full py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
