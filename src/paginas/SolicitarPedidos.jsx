import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../componentes/context/AuthContext.jsx"; 
import api from "../utils/axios"; 
import { useForm } from "react-hook-form";
import { Layout } from "../componentes/plantilla/Layout.jsx";

const useAuth = () => useContext(AuthContext);

export const RegistroPedido = () => {
  const { authData } = useAuth(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [domiciliarios, setDomiciliarios] = useState([]);

  useEffect(() => {
    const fetchDomiciliarios = async () => {
      try {
        const response = await api.get("/domiciliarios");
        setDomiciliarios(response.data);
      } catch (error) {
        console.error("Error al obtener domiciliarios:", error);
      }
    };
    fetchDomiciliarios();
  }, []);

  const handlePedidoSubmit = async (data) => {
    try {
      const pedidoData = {
        usuario: authData?.username, 
        domiciliario: data.domiciliario,
        direccionRecogida: data.direccionRecogida,
        direccionEntrega: data.direccionEntrega,
        estado: "PENDIENTE", // Estado predeterminado
        fechaHora: new Date().toISOString(), // Fecha y hora actual
      };

      const response = await api.post("/solicitudes/", pedidoData);
      if (response) {
        alert("¡Pedido registrado exitosamente!");
      }
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
    }
  };

  return (
    <Layout> 
      <form onSubmit={handleSubmit(handlePedidoSubmit)} className="space-y-4">
        <div>
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-600">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={authData?.username || ""}
            readOnly
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Campo para seleccionar un domiciliario */}
        <div>
          <label htmlFor="domiciliario" className="block text-sm font-medium text-gray-600">
            Domiciliario
          </label>
          <select
            id="domiciliario"
            {...register("domiciliario", { required: true })}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona un domiciliario</option>
            {domiciliarios.map((dom) => (
              <option key={dom.id} value={dom.id}>
                {dom.nombre}
              </option>
            ))}
          </select>
          {errors.domiciliario && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>

        {/* Dirección de recogida */}
        <div>
          <label htmlFor="direccionRecogida" className="block text-sm font-medium text-gray-600">
            Dirección de Recogida
          </label>
          <input
            id="direccionRecogida"
            type="text"
            {...register("direccionRecogida", { required: true })}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.direccionRecogida && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>

        {/* Dirección de entrega */}
        <div>
          <label htmlFor="direccionEntrega" className="block text-sm font-medium text-gray-600">
            Dirección de Entrega
          </label>
          <input
            id="direccionEntrega"
            type="text"
            {...register("direccionEntrega", { required: true })}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.direccionEntrega && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Registrar Pedido
        </button>
      </form>
    </Layout>
  );
};
