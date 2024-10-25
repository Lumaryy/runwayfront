import { Suspense } from "react";
import { Header } from "../subcomponentes/Header";
import { Outlet } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden">
        <Header contenido={"aqui va algun contenido"} />

        <main className="flex flex-grow overflow-hidden">
          <aside className="hidden lg:block ">
            {/*  <SideBar
              rol={usuarioRol.trim().toLowerCase().startsWith("administrador")}
            /> */}
            aqui va el menu o el sidebar
          </aside>

          <section className="flex-grow p-2 lg:p-8 overflow-auto">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              }
            >
              <div className={`bg-white  shadow-lg h-full p-4 `}>
                <div className="lg:hidden mb-1 ">{/*  <MenuMobile /> */}</div>

                {children}
              </div>
              <Outlet />
            </Suspense>
          </section>
        </main>
      </div>
    </>
  );
};
