import cajita from '../../assets/cajita.png'

export const Header = ({ contenido }) => {
  return (
    <>
      <header className="inset-x-0 top-0 h-16 bg-white border-b shadow-lg z-50 md:px-8">
        <nav
          className="flex items-center h-16 justify-between lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center h-full lg:flex-1 ">
            <figure className="h-16 w-16 flex justify-center items-center">
              <img
                src={cajita}
                className="h-full w-full object-contain cursor-pointer"
                alt="logo-sena"
              />
            </figure>
            <div className="ml-3 text-lg font-semibold text-gray-700">
              Runway Domicilios
            </div>
          </div>
          <div className="flex items-center">{ contenido }</div>
        </nav>
      </header>
    </>
  );
};
