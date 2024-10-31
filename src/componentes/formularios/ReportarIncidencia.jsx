import {useForm} from "react-hook-form";
import {Textarea} from "@nextui-org/react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import api from "../../utils/axios.js";

const useAuth = () => useContext(AuthContext);
export const ReportarIncidenciaForm = () => {
    const {authData} = useAuth();
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm();
    const [incidencias, setIncidencias] = useState([]);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await api.get("solicitudes/");
                setIncidencias(response.data);
            } catch (error) {
                console.error("Error al obtener solicidtudes:", error);
            }
        };
        fetchSolicitudes();
    }, []);

    const handleSubmitDataNovedad = async (data) => {
        try {

            const prepararData = {
                usuarios: authData?.id,
                solicitud: data.solicitud,
                tipo_incidencia: data.tipo_incidencia,
                descripcion: data.descripcion,
                fecha_reporte: data.fecha_reporte,
            }

            const response = await api.post("reportes-incidencias/", prepararData);
            if (response) {
                alert("¡Incidencia registrada exitosamente!");
                reset();
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (<>
        <form action="" onSubmit={handleSubmit(handleSubmitDataNovedad)}
              className={"flex flex-col gap-5 justify-center "}>
            <div>
                <select {...register("solicitud")} >
                    <option>Seleccione una opcion</option>
                    {incidencias.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.id}
                        </option>
                    ))}
                </select>
            </div>
            <div>

            </div>

            <div className={"flex flex-col gap-9 border p-5"}>
                <label>Descripcion</label>
                <Textarea {...register("descripcion", {required: true})} placeholder={"Descripcion"}/>
                {errors.descripcion && (
                    <>
                        <span className="text-red-500">Este campo es obligatorio</span>
                    </>
                )}
            </div>
            <div className={"p-4"}>
                <input type={"date"} {...register("fecha_reporte")} className={"border"}/>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
                Registrar Incidencia
            </button>
        </form>

    </>)
}