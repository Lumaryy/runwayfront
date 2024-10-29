// src/pages/HomePage.jsx
import {Layout} from "../componentes/plantilla/Layout.jsx";
import {EstadoPedidosChart} from "../componentes/charts/EstadoPedidos.jsx";

export const HomePage = () => {

    return (
        <Layout>
            <h1>Dashboard </h1>
            <EstadoPedidosChart/>
        </Layout>
    );
};
