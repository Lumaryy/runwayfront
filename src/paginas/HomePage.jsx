// src/pages/HomePage.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import useFetchActividades from '../componentes/hooks/useFetchActividades';

const Chart = ({ title, data }) => (
    <div>
        <h2>{title}</h2>
        <Bar data={data} />
    </div>
);

export const HomePage = () => {
    const { actividades, loading: loadingActividades, error: errorActividades } = useFetchActividades();


    if (loadingActividades || loadingDomiciliarios || loadingNegocios) {
        return <p>Cargando datos...</p>;
    }


    const errors = [
        errorActividades ? `Actividades: ${errorActividades}` : null,
        errorDomiciliarios ? `Domiciliarios: ${errorDomiciliarios}` : null,
        errorNegocios ? `Negocios: ${errorNegocios}` : null,
    ].filter(Boolean);

    if (errors.length) {
        return <p>Error al cargar datos: {errors.join(', ')}</p>;
    }


    const dataActividades = {
        labels: actividades.map(act => act.nombre),
        datasets: [
            {
                label: 'Actividades',
                data: actividades.map(act => act.cantidad),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h1>Dashboard </h1>
            <Chart title="Actividades" data={dataActividades} />
        </div>
    );
};
