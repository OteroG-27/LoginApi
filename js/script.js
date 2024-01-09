let paginaActual = 1;
let selectedUserId;
async function datosDeUsuarios(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const userDataContainer = document.getElementById('containerUser');
        userDataContainer.innerHTML = '';

        data.data.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.dataset.id = user.id;
            userContainer.innerHTML = `
                <div clas="col-4">
                    <div class="p-3">
                        <div class="card card-style">
                            <p style="display:none">${user.id}</p>
                            <img src="${user.avatar}" class="rounded-circle" alt="Foto del usuario">
                            <div class="card-body">
                                <div class="d-flex">
                                    <h5 class="card-title" id="card-title">${user.first_name}</h5>
                                    <h5 class="card-title ms-1" id="card-title">${user.last_name}</h5>
                                </div>
                                <p class="card-text">Email: ${user.email}</p>
                                <button class="btn btn-primary" onclick="editarUsuarios(${user.id})">Editar</button>
                                <button class="btn btn-danger" onclick="eliminarUsuario('${user.id}')">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
            userDataContainer.appendChild(userContainer);
            userContainer.classList.add('col-4');
        });
    } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
    }
}

function editarUsuarios(userId) {
    selectedUserId = userId;
    const user = document.querySelector(`[data-id="${userId}"]`);

    if (user) {

        document.getElementById('editedEmail').value = user.querySelector('p:nth-child(2)').textContent.split(' ')[1];
        document.getElementById('editedFirstName').value = user.querySelector('h5:nth-child(1)').textContent.split(' ')[0];
        document.getElementById('editedLastName').value = user.querySelector('h5:nth-child(2)').textContent.split(' ')[0];


        document.getElementById('editModal').style.display = 'flex';
    } else {
        console.error('Usuario no encontrado');
    }
}

async function guardarCambios() {
    const editedEmail = document.getElementById('editedEmail').value;
    const editedFirstName = document.getElementById('editedFirstName').value;
    const editedLastName = document.getElementById('editedLastName').value;

    try {
        const response = await fetch(`https://reqres.in/api/users/${selectedUserId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: editedEmail,
                first_name: editedFirstName,
                last_name: editedLastName,
            }),
        });

        if (response.ok) {
            console.log('Datos actualizados con éxito');
            const userContainer = document.querySelector(`[data-id="${selectedUserId}"]`);
            if (userContainer) {
                userContainer.querySelector('p:nth-child(2)').textContent = `Email: ${editedEmail}`;
                userContainer.querySelector('h5:nth-child(1)').textContent = `${editedFirstName}`;
                userContainer.querySelector('h5:nth-child(2)').textContent = `${editedLastName}`;
            }
            document.getElementById('editModal').style.display = 'none';
        } else {
            console.error('Error al actualizar datos:', response.status);
        }
    } catch (error) {
        console.error('Error al enviar solicitud de actualización:', error);
    }
}
async function eliminarUsuario(id) {
    try {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        
        if (confirmacion) {
            const usuariosDiv = document.getElementById("containerUser");
            const usuarioAEliminar = usuariosDiv.querySelector(`[data-id="${id}"]`);
            if (usuarioAEliminar) {
                usuariosDiv.removeChild(usuarioAEliminar);
                console.log(`Usuario con ID ${id} eliminado correctamente.`);
                window.alert(`Usuario con ID ${id} eliminado correctamente.`);
            } else {
                console.error(`No se encontró el usuario con ID ${id} para eliminar.`);
            }
        } else {
            console.log(`Eliminación del usuario con ID ${id} cancelada por el usuario.`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function actualizarPagina(numero) {
    paginaActual = numero;
    const url = `https://reqres.in/api/users?page=${paginaActual}`;
    datosDeUsuarios(url);
}
actualizarPagina(paginaActual);
function manejarClicBoton(offset) {
    return () => {
        const nuevaPagina = paginaActual + offset;
        if (nuevaPagina >= 1) {
            actualizarPagina(nuevaPagina);
        }
    };
}
document.getElementById("btnSiguiente").addEventListener("click", manejarClicBoton(1));
document.getElementById("btnAnterior").addEventListener("click", manejarClicBoton(-1));

async function buscarUsuarios() {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`https://reqres.in/api/users?page=1`);
    const data = await response.json();

    const usuariosFiltrados = data.data.filter(usuario =>
      `${usuario.first_name} ${usuario.last_name}`.toLowerCase().includes(searchInput.toLowerCase())
    );

    mostrarResultados(usuariosFiltrados);
  }

  function mostrarResultados(usuarios) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = usuarios.length === 0 ? '<p>No se encontraron usuarios.</p>' : '';
    usuarios.forEach(user => {
      resultadoDiv.innerHTML += `
        <div clas="col-4">
            <div class="p-3">
                <div class="card card-style">
                    <p style="display:none">${user.id}</p>
                    <img src="${user.avatar}" class="rounded-circle" alt="Foto del usuario">
                    <div class="card-body">
                        <div class="d-flex">
                            <h5 class="card-title" id="card-title">${user.first_name}</h5>
                            <h5 class="card-title ms-1" id="card-title">${user.last_name}</h5>
                        </div>
                        <p class="card-text">Email: ${user.email}</p>
                        <button class="btn btn-primary" onclick="editarUsuarios(${user.id})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarUsuario('${user.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
      `;
      resultadoDiv.classList.add('active');
      if (resultadoDiv.classList.contains('active')) {
        document.getElementById('containerUser').style.display = 'none';
      }else{
        document.getElementById('containerUser').style.display = 'block';
      }
    });
  }
    let cerrar = document.querySelector('.btn-close'),
    editModal = document.getElementById('editModal');
    cerrar.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
