async function consultarReservas() {
    const rut = document.getElementById('rutInput').value;
  
    try {
      const response = await fetch(`http://localhost:3000/reservas/${rut}`);
      const reservas = await response.json();
  
      const reservasList = document.getElementById('reservasList');
      reservasList.innerHTML = '';
  
      if (reservas.length === 0) {
        reservasList.innerHTML = '<p>No hay reservas asociadas para este Rut</p>';
        return;
      }
  
      reservas.forEach(reserva => {
        const listItem = document.createElement('li');
        listItem.textContent = `Reserva ID ${reserva.id_reserva} - Cliente Rut ${reserva.rut_cliente}`;
        reservasList.appendChild(listItem);

      });
  
    } catch (error) {
      console.error('Error al consultar reservas:', error);
      alert('Error al consultar reservas. Por favor, inténtelo de nuevo.');
    }
  }
  

  async function crearReserva() {
    const rut = document.getElementById('rutInput').value;
    const id_estado_reserva = document.getElementById('idEstadoReservaInput').value;
    const id_vuelo = document.getElementById('idVueloInput').value;
  
    try {
      const response = await fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut_cliente: rut, id_estado_reserva, id_vuelo }),
      });
  
      if (response.ok) {
        console.log('Reserva creada exitosamente');
        
        consultarReservas();
      } else {
        console.error('Error al crear reserva:', response.statusText);
        alert('Error al crear reserva. Por favor, inténtelo de nuevo.');
      }
  
    } catch (error) {
      console.error('Error al crear reserva:', error);
      alert('Error al crear reserva. Por favor, inténtelo de nuevo.');
    }
  }
  
  async function eliminarReserva() {
    const rut = document.getElementById('rutInput').value;
    const idReserva = document.getElementById('idReservaInput').value;
  
    try {
      const response = await fetch(`http://localhost:3000/clientes/${rut}/reservas/${idReserva}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Reserva eliminada exitosamente');
        
        consultarReservas();
      } else {
        console.error('Error al eliminar reserva:', response.statusText);
        alert('Error al eliminar reserva. Por favor, inténtelo de nuevo.');
      }
  
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
      alert('Error al eliminar reserva. Por favor, inténtelo de nuevo.');
    }
  }
  
  async function modificarCliente() {
    const rut = document.getElementById('rutInput').value;
    const nombre = document.getElementById('nombreInput').value;
    const apellido = document.getElementById('apellidoInput').value;
    const correo = document.getElementById('correoInput').value;
    const telefono = document.getElementById('telefonoInput').value;
  
    try {
      const response = await fetch(`http://localhost:3000/clientes/${rut}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, correo, telefono }),
      });
  
      if (response.ok) {
        console.log('Datos del cliente actualizados exitosamente');
        
        alert('Datos del cliente actualizados exitosamente');
        
      } else {
        console.error('Error al actualizar datos del cliente:', response.statusText);
        alert('Error al actualizar datos del cliente. Por favor, inténtelo de nuevo.');
      }
  
    } catch (error) {
      console.error('Error al actualizar datos del cliente:', error);
      alert('Error al actualizar datos del cliente. Por favor, inténtelo de nuevo.');
    }
  }

    
  async function obtenerDatosCliente() {
    const rut = document.getElementById('rutInput').value;

    try {
        const responseCliente = await fetch(`http://localhost:3000/clientes/${rut}`);
        const cliente = await responseCliente.json();

        const datosClienteList = document.getElementById('datosClienteList');
        datosClienteList.innerHTML = '';

        if (cliente) {
            Object.keys(cliente).forEach(key => {
                const listItem = document.createElement('li');
                listItem.textContent = `${key}: ${cliente[key]}`;
                datosClienteList.appendChild(listItem);
            });
        } else {
            datosClienteList.innerHTML = '<p>Cliente no encontrado para el Rut proporcionado</p>';
        }

    } catch (error) {
        console.error('Error al obtener datos del cliente:', error);
        alert('Error al obtener datos del cliente. Por favor, inténtelo de nuevo.');
    }
}