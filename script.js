document.addEventListener('DOMContentLoaded', () => {
    const asignaturas = document.querySelectorAll('.asignatura');
    const ramosAprobados = new Set();

    function actualizarRamos() {
        asignaturas.forEach(asignatura => {
            const id = asignatura.id;
            const requisitos = asignatura.dataset.requisitos.split(',').filter(Boolean);
            const cumpleRequisitos = requisitos.every(req => ramosAprobados.has(req));

            asignatura.classList.remove('aprobado', 'bloqueado');

            if (ramosAprobados.has(id)) {
                asignatura.classList.add('aprobado');
            } else if (!cumpleRequisitos) {
                asignatura.classList.add('bloqueado');
            }
        });
    }

    asignaturas.forEach(asignatura => {
        asignatura.addEventListener('click', () => {
            const id = asignatura.id;

            if (ramosAprobados.has(id)) {
                ramosAprobados.delete(id);
            } else {
                const requisitos = asignatura.dataset.requisitos.split(',').filter(Boolean);
                const cumpleRequisitos = requisitos.every(req => ramosAprobados.has(req));
                if (cumpleRequisitos) {
                    ramosAprobados.add(id);
                }
            }
            actualizarRamos();
        });
    });

    actualizarRamos();
});
