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

export const NovedadesIncidenciasPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [userId, setUserId] = useState('');
  const [license, setLicense] = useState('');
  const [availability, setAvailability] = useState('disponible');
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataSend = {
      usuarios: userId,
      licencia_vehiculo: license,
      disponibilidad: availability,
    };

    try {
      let save;
      if (!formState) {
        save = await api.post('novedades/', dataSend);
      } else {
        save = await api.put(`novedades/${id}/`, dataSend);
      }

      console.log('NOVEDADES SAVE: ', save);
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

  const handleEdit = (novedades) => {
    setId(novedades.id);
    setUserId(novedades.domiciliario);
    setLicense(novedades.solicitud);
    setAvailability(novedades.descripcion);
    setFormState(true);
    handleOpen();
  };

  const fetchData = async () => {
    try {
      const response = await api.get('novedades/');
      setData(response.data);
      console.log('LIST DOMICILIARIOS: ', response.data);
    } catch (error) {
      console.error('Error al obtener los domiciliarios:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('usuarios/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre Usuario',
      selector: row => row.usuarios ? row.usuarios.nombre : 'Sin usuario',
      sortable: true,
    },
    {
      name: 'Licencia de Vehículo',
      selector: row => row.licencia_vehiculo,
      sortable: true,
    },
    {
      name: 'Disponibilidad',
      selector: row => row.disponibilidad,
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
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <Layout>
      <Button onClick={handleOpen} variant="contained" color="primary" sx={{ mb: 2 }}>
        Registrar Domiciliario
      </Button>

      <DataTable
        title="Listado de Domiciliarios"
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
            {formState ? "Editar Información de Domiciliario" : "Registrar Domiciliario"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <Typography color="error" variant="body2" className="mb-2">
                {errors.general}
              </Typography>
            )}
            <TextField
              label="Usuario"
              select
              fullWidth
              margin="normal"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              error={Boolean(errors.usuarios)}
              helperText={errors.usuarios}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nombre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Licencia de Vehículo"
              variant="outlined"
              fullWidth
              margin="normal"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              error={Boolean(errors.licencia_vehiculo)}
              helperText={errors.licencia_vehiculo}
            />
            <TextField
              label="Disponibilidad"
              select
              fullWidth
              margin="normal"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              error={Boolean(errors.disponibilidad)}
              helperText={errors.disponibilidad}
            >
              <MenuItem value="disponible">Disponible</MenuItem>
              <MenuItem value="ocupado">Ocupado</MenuItem>
              <MenuItem value="no_disponible">No Disponible</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {formState ? "Actualizar" : "Registrar"}
            </Button>
          </form>
        </Box>
      </Modal>
    </Layout>
  );
};
