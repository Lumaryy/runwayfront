import React, { useEffect, useState } from "react";
import { Layout } from "../componentes/plantilla/Layout";
import api from "../utils/axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from "react-data-table-component";
import { InputLabel, TextField } from "@mui/material";
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

export const ControlUsuarios = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState(data.id || '');
  const [name, setName] = useState(data.name || '');
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [role, setRole] = useState(data.tipo_usuario || '');
  const [password, setPassword] = useState(data.password || '');
  const [errors, setErrors] = useState({});

  const formState = false;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataSend = {
      nombre: name,
      email: email,
      telefono: phone,
      tipo_usuario: role,
      password: password,
    };

    try {
      let save;
      if (formState == false) {
        save = await api.post('usuarios/', dataSend);
      } else {
        save = await api.post('usuarios/' + { id }, dataSend);
      }

      console.log('USER SAVE: ', save);
      await fetchData()
      handleClose();
      setErrors({});

      setName('')
      setEmail('')
      setPhone('')
      setRole('')
      setPassword('')

      Swal.fire({
        title: "Registro Exitoso!",
        text: "",
        icon: "success"
      });


    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Asigna los errores a sus respectivos campos
        const errorData = error.response.data;
        const newErrors = {};
        for (const [key, value] of Object.entries(errorData)) {
          // Usa el primer mensaje de error del arreglo
          newErrors[key] = value[0]; // Captura el primer mensaje
        }
        setErrors(newErrors); // Actualiza el estado de errores
      } else {
        // Maneja otros tipos de errores si es necesario
        setErrors({ general: 'Error desconocido. Intenta de nuevo más tarde.' });
      }

      Swal.fire({
        title: "Error en Registro!",
        text: "",
        icon: "error"
      });
    }

  };

  const hadleEdit = (user) => {
    setId(user.id);
    setName(user.nombre);
    setEmail(user.email);
    setPhone(user.telefono);
    setRole(user.tipo_usuario);
    setPassword(''); // Dejar vacío para no mostrar la contraseña
    handleOpen(); // Abre el modal
  }

  const changeStatus = async (id) => {
    
    await api.patch('usuarios/' + id + '/');

    fetchData();
  }

  const fetchData = (async () => {
    const data = await api.get('usuarios/');
    setData(data.data)
    console.log('LIST USERS: ', data.data);
  })

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    // {
    //   name: 'Apellidos',
    //   selector: row => row.apellido,
    //   sortable: true,
    // }
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Télefono',
      selector: row => row.telefono,
      sortable: true,
    },
    {
      name: '',
      cell: row => (

        <div>
          <button
            onClick={() => hadleEdit(row)}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
          >
            Editar
          </button>
          <button
            onClick={() => changeStatus(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            {row.estado}
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Layout>
        <Button onClick={handleOpen}>Registrar</Button>

        <DataTable
          title="Listado de Usuarios"
          columns={columns}
          data={data}
          pagination
          selectableRows
          highlightOnHover
          striped
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Información
            </Typography>
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <Typography color="error" variant="body2" className="mb-2">
                  {errors.general}
                </Typography>
              )}
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.nombre)} // Muestra error si existe
                helperText={errors.nombre} // Muestra mensaje de error
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)} // Muestra error si existe
                helperText={errors.email} // Muestra mensaje de error
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={Boolean(errors.telefono)} // Muestra error si existe
                helperText={errors.telefono} // Muestra mensaje de error
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)} // Muestra error si existe
                helperText={errors.password} // Muestra mensaje de error
              />
              <select
                className="my-5 w-full bg-blue-100 py-4 px-2 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                <option value="admin">Administrador</option>
                <option value="cliente">Cliente</option>
                <option value="negocio">Negocio</option>
                <option value="domiciliario">Domiciliario</option>
              </select>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Actualizar
              </Button>
            </form>
          </Box>
        </Modal>

      </Layout >


    </>
  );
};
