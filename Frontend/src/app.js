const API_BASE = '/api/tasks';
const form = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const statusDiv = document.getElementById('status');

async function fetchTasks() {
  setStatus('Cargando tareas...');
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Error al obtener tareas');
    const tasks = await res.json();
    renderTasks(tasks);
    setStatus('');
  } catch (err) {
    console.error(err);
    setStatus('Error cargando tareas');
  }
}

function setStatus(txt) {
  statusDiv.textContent = txt;
}

function renderTasks(tasks) {
  tasksList.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${escapeHtml(t.titulo)}</strong> - ${t.descripcion || ''} [${t.estado}]
      <button data-id="${t.id}" class="edit">Editar</button>
      <button data-id="${t.id}" class="del">Borrar</button>`;
    tasksList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  if (!titulo) return setStatus('El título es obligatorio');
  setStatus('Creando tarea...');
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ titulo, descripcion, estado: 'pendiente' })
    });
    if (!res.ok) throw new Error('Error al crear tarea');
    form.reset();
    await fetchTasks();
  } catch (err) {
    console.error(err);
    setStatus('Error al crear tarea');
  }
});

tasksList.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('del')) {
    if (!confirm('Eliminar tarea?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Error borrando');
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setStatus('Error borrando tarea');
    }
  } else if (e.target.classList.contains('edit')) {
    const newTitulo = prompt('Nuevo título');
    if (!newTitulo) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ titulo: newTitulo })
      });
      if (!res.ok) throw new Error('Error editando');
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setStatus('Error editando tarea');
    }
  }
});

// util
function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

fetchTasks();
