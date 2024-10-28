import { useEffect, useState } from 'react';
import api from '../../utils/axios.js';

const usePedidosMetrics = () => {
  const [data, setData] = useState({
    enCurso: 0,
    completado: 0,
    cancelado: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/solicitudes/');
      const pedidos = response.data;


      const enCurso = pedidos.filter(pedido => pedido.estado === 'EN CURSO').length;
      const completado = pedidos.filter(pedido => pedido.estado === 'COMPLETADO').length;
      const cancelado = pedidos.filter(pedido => pedido.estado === 'CANCELADO').length;

      setData({ enCurso, completado, cancelado });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default usePedidosMetrics;
