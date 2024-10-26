import api from '../../utils/axios.js';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal de registro

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const fetchData = async (data) => {
    try {
      const response = await api.post("auth/login/", data);
      if (response) {
        const token = response.data.access;
        localStorage.setItem('authToken', token);
        navigate('/home');
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleRegisterSubmit = async (data) => {
    try {
      const registerData = {
        ...data,
        tipo_usuario: 'cliente', 
      };
      const response = await api.post("auth/register/", registerData);
      if (response) {
        alert('¡Registro exitoso!');
        setModalOpen(false); 
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <>
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(fetchData)}>
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
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">Este campo es obligatorio</span>}
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
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Recuérdame</label>
          </div>
          <a href="#" className="text-sm text-green-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Modal de registro */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Registro</h2>
            <form className="space-y-4" onSubmit={handleSubmit(handleRegisterSubmit)}>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tu nombre completo"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && <span className="text-red-500">Este campo es obligatorio</span>}
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
                  {...register("regEmail", { required: true })}
                />
                {errors.regEmail && <span className="text-red-500">Este campo es obligatorio</span>}
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
                  {...register("telefono", { required: true })}
                />
                {errors.telefono && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <div>
                <label htmlFor="tipo_usuario" className="block text-sm font-medium text-gray-600">Tipo de Usuario</label>
                <input
                  id="tipo_usuario"
                  name="tipo_usuario"
                  type="text"
                  value="Cliente" 
                  readOnly 
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md bg-gray-200"
                />
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
                  {...register("regPassword", { required: true })}
                />
                {errors.regPassword && <span className="text-red-500">Este campo es obligatorio</span>}
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Registrarse
              </button>
              <button
                type="button"
                className="w-full py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setModalOpen(false)} 
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
