import { PlantillaInicio } from "../componentes/plantilla/PlantillaInicio";
import { LoginForm } from "../componentes/formularios/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <PlantillaInicio>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Iniciar sesión
        </h2>


        <LoginForm />
      </PlantillaInicio>
    </>
  );
};
