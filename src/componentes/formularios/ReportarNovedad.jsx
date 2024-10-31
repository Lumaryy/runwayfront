import { useForm } from "react-hook-form";
/* import api from "../../utils/axios"; */

import { Textarea } from "@nextui-org/react";



export const ReportarNovedadForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSubmitDataNovedad = async (data) => {
    try {
      /* const response = await api.post(""); */

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(handleSubmitDataNovedad)}>
        <Textarea {...register("descripcion", { required: true })} />
        {errors.descripcion && (
          <>
            <span className="text-red-500">Este campo es obligatorio</span>
          </>
        )}
      </form>
    </>
  );
};
