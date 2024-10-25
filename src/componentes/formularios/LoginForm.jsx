import api from '../../utils/axios.js'
import { useForm } from "react-hook-form";


export const LoginForm = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const fetchData = async (data) => {
      
    try {
     const response = await api.post("auth/login/",data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  return (
    <>
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(fetchData)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="ejemplo@correo.com"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Recuérdame
            </label>
          </div>
          <a href="#" className="text-sm text-green-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Iniciar sesión
        </button>
      </form>
    </>
  );
};
