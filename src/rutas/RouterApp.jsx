import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

// paginas
import { LoginPage } from "../paginas/loginPage";
import { HomePage } from "../paginas/HomePage";
import { GestionPedidosPage } from "../paginas/GestionPedidosPage";
import { RegistroPedido } from "../paginas/SolicitarPedidos";
import { RepoteNovedades } from "../paginas/ReporteNovedades";
import { ReportarIncidencias } from "../paginas/ReportarIncidencias";
import {ControlUsuarios} from "../paginas/ControlUsuarios"
import {ControlDomiciliarios} from "../paginas/ControlDomiciliarios"
import {NovedadesIncidenciasPage} from "../paginas/NovedadesIncidencias.jsx";

export const RouterApp = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/gestionpedidos" element={<GestionPedidosPage />} />
          <Route path="/solicitarpedidos" element={<RegistroPedido />} />
          <Route path="/reportarnovedad" element={<RepoteNovedades />} />
          <Route path="/reportarincidencia" element={<ReportarIncidencias />} />
          <Route path="/usuarios" element={<ControlUsuarios />} />
          <Route path="/Domiciliarios" element={<ControlDomiciliarios />} />
          <Route path="/novedadesincidencias" element={<NovedadesIncidenciasPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
