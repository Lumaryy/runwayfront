import React from 'react';
import { Bar } from 'react-chartjs-2';
import useFetchActividades from '../../componentes/hooks/useFetchActividades.jsx'; 

const Actividades = () => {
  const { actividades, loading, error } = useFetchActividades();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar actividades: {error.message}</div>;

  const tiposActividades = {};
  actividades.forEach(actividad => {
    tiposActividades[actividad.tipo] = (tiposActividades[actividad.tipo] || 0) + 1;
  });

  const data = {
    labels: Object.keys(tiposActividades),
    datasets: [
      {
        label: 'Actividades por Tipo',
        data: Object.values(tiposActividades),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Actividades</h2>
      <Bar data={data} />
    </div>
  );
};

export default Actividades;
