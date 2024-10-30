import React, { useEffect, useState } from "react";
import { Layout } from "../componentes/plantilla/Layout";
import api from "../utils/axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DataTable from "react-data-table-component";
import { TextField, MenuItem } from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState(''); // Nuevo estado para la contraseña
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm(); // Reinicia el formulario al cerrar
  };

  const resetForm = () => {
    setId('');
    setName('');
    setEmail('');
    setPhone('');
    setRole('');
    setPassword('');
    setErrors({});
    setFormState(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Datos a enviar
    const dataSend = {
      nombre: name,
      email: email,
      telefono: phone,
      tipo_usuario: role,
      ...(formState === false && { password: password }) // Incluye contraseña solo en registro
    };

    try {
      let save;
      if (!formState) { // Registro
        save = await api.post('usuarios/', dataSend);
      } else { // Edición
        save = await api.put(`usuarios/${id}/`, dataSend);
      }

      console.log('USER SAVE: ', save);
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
        setErrors({ general: 'Error desconocido. Intenta de nuevo más tarde.' });
      }

      Swal.fire({
        title: "Error en Registro!",
        icon: "error",
      });
    }
  };

  const handleEdit = (user) => {
    setId(user.id);
    setName(user.nombre);
    setEmail(user.email);
    setPhone(user.telefono);
    setRole(user.tipo_usuario);
    setFormState(true); // Cambiar a modo edición
    handleOpen();
  };

  const changeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "inactivo" ?  "activo": "inactivo";
    
    try {
      await api.patch(`usuarios/${id}/`, { estado: newStatus });
      await fetchData();
      Swal.fire({
        title: "Estado actualizado!",
        icon: "success",
      });
    } catch (error) {
      console.error('Error al cambiar el estado:', error.response?.data || error.message);
      Swal.fire({
        title: "Error al cambiar el estado!",
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get('usuarios/');
      setData(response.data);
      console.log('LIST USERS: ', response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
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
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Teléfono',
      selector: row => row.telefono,
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
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            onClick={() => changeStatus(row.id, row.estado)}
            variant="contained"
            color={row.estado === "Activo" ? "error" : "success"}
            size="small"
          >
            {row.estado}
          </Button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <Layout>
      <Button onClick={handleOpen} variant="contained" color="primary" sx={{ mb: 2 }}>
        Registrar
      </Button>

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
            {formState ? "Editar Información" : "Registrar Usuario"}
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
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(errors.telefono)}
              helperText={errors.telefono}
            />
            <TextField
              label="Rol"
              select
              fullWidth
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={Boolean(errors.tipo_usuario)}
              helperText={errors.tipo_usuario}
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="cliente">Cliente</MenuItem>
              <MenuItem value="negocio">Negocio</MenuItem>
              <MenuItem value="domiciliario">Domiciliario</MenuItem>
            </TextField>
            {!formState && (
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {formState ? "Actualizar" : "Registrar"}
            </Button>
          </form>
        </Box>
      </Modal>
    </Layout>
  );
};
