import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

// paginas
import { LoginPage } from "../paginas/loginPage";
import { HomePage } from "../paginas/HomePage";

export const RouterApp = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};
