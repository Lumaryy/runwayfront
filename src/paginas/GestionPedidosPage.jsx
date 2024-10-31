import React, {useEffect, useState} from "react";
import {Layout} from "../componentes/plantilla/Layout";
import api from "../utils/axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from "react-data-table-component";
import {TextField, MenuItem} from "@mui/material";
import Swal from "sweetalert2";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const GestionPedidosPage = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [userId, setUserId] = useState('');
    const [license, setLicense] = useState('');
    const [availability, setAvailability] = useState('disponible');
    const [errors, setErrors] = useState({});
    const [formState, setFormState] = useState(false);
    const [users, setUsers] = useState([]);

    // para la fecha
    const [fecha, setFecha] = useState('');

    const [iduarios, setUsuarios] = useState('');
    const [iddomiciliarios, setIddomiciliarios] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setId('');
        setUserId('');
        setLicense('');
        setAvailability('disponible');
        setErrors({});
        setFormState(false);
    };

    const handleEdit = (solicitudes) => {
        console.log(solicitudes, "hjolallala")
        setId(solicitudes.id);

        setUserId(solicitudes.direccion_recogida);
        setLicense(solicitudes.direccion_entrega);
        setAvailability(solicitudes.estado);
        setFormState(true);
        setFecha(solicitudes.fecha_hora)
        setUsuarios(solicitudes.usuarios)
        setIddomiciliarios(solicitudes.domiciliarios)
        handleOpen();
    };

    const fetchData = async () => {
        try {
            // http://127.0.0.1:8000/api/solicitudes/
            const response = await api.get('solicitudes/');
            setData(response.data);
            console.log('LIST SOLICITUDES: ', response.data);
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataSend = {
            usuarios: iduarios,
            domiciliarios: iddomiciliarios,
            direccion_entrega: license,
            direccion_recogida: userId,
            fecha_hora: fecha

        };


        try {
            console.log(dataSend)
              let save;
              if (!formState) {
                  // http://127.0.0.1:8000/api/solicitudes/
                  save = await api.post('domiciliarios/', dataSend);
              } else {
                  //http://127.0.0.1:8000/api/solicitudes/{id}/
                  save = await api.put(`solicitudes/${id}/`, dataSend);
              }

              console.log('SOLICITUD SAVE: ', save);
              await fetchData();
              handleClose();

              Swal.fire({
                  title: formState ? "Actualización Exitosa!" : "Registro Exitoso!",
                  icon: "success",
              });
        } catch (error) {
            console.log('Error response:', error.response);
            if (error.response && error.response.status === 400) {
                const errorData = error.response.data;
                const newErrors = {};
                for (const [key, value] of Object.entries(errorData)) {
                    newErrors[key] = value[0];
                }
                setErrors(newErrors);
            } else {
                setErrors({general: 'Error desconocido. Intenta de nuevo más tarde.'});
            }

            Swal.fire({
                title: "Error en Registro!",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'domiciliarios',
            selector: row => row.domiciliarios,
            sortable: true,
        },
        {
            name: 'usuario',
            selector: row => row.usuarios,
            sortable: true,
        },
        {
            name: 'direccion recogida',
            selector: row => row.direccion_recogida,
            sortable: true,
        },
        {
            name: 'direccion entrega',
            selector: row => row.direccion_entrega,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true,
        },
        {
            name: 'fecha',
            selector: row => row.fecha_hora,
            sortable: true,
        },
        {
            name: '',
            cell: row => (
                <div>
                    <Button
                        onClick={() => handleEdit(row)}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{mr: 1}}
                    >
                        Editar
                    </Button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <Layout>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {"Editar Información de Solicitud"}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {errors.general && (
                            <Typography color="error" variant="body2" className="mb-2">
                                {errors.general}
                            </Typography>
                        )}
                        <TextField
                            label="direecion recogida"
                            fullWidth
                            margin="normal"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            error={Boolean(errors.direccion_recogida)}
                            helperText={errors.direccion_recogida}
                        >
                            {users.map(user => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="direccion entrega"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={license}
                            onChange={(e) => setLicense(e.target.value)}
                            error={Boolean(errors.direccion_entrega)}
                            helperText={errors.direccion_entrega}
                        />
                        <TextField
                            label="estado"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={availability}
                            onChange={(e) => setLicense(e.target.value)}
                            error={Boolean(errors.estado)}
                            helperText={errors.estado}
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                            {formState ? "Actualizar" : "Registrar"}
                        </Button>
                    </form>
                </Box>
            </Modal>

            <DataTable
                title="Listado de Solicitudes"
                columns={columns}
                data={data}
                pagination
                selectableRows
                highlightOnHover
                striped
            />


        </Layout>
    );
};
