export const PlantillaInicio = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Sección de la Imagen */}
        <div className="hidden lg:flex w-1/2 bg-green-500 items-center justify-center">
          <img
            src="https://via.placeholder.com/600x800" // Cambia esta URL por la URL de la imagen que prefieras
            alt="Imagen de bienvenida"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sección del Formulario */}
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center bg-white p-8 lg:p-16">
          {children}
        </div>
      </div>
    </>
  );
};
