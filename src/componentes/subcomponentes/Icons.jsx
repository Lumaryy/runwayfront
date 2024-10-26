// eslint-disable-next-line react/prop-types
export const Icons = ({ icon: Icon, onClick }) => {
  return (
    <>
      <Icon
        className="h-6 w-6 cursor-pointer"
        aria-hidden="true"
        onClick={onClick}
      />
    </>
  );
};
