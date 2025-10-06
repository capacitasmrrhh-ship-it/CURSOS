const cursos = [
  { codigo: "C001", nombre: "Prevención de Riesgos Laborales", precio: 0 },
  { codigo: "C002", nombre: "Primeros Auxilios en el Trabajo", precio: 0 },
  { codigo: "C003", nombre: "Manejo de Extintores", precio: 0 },
  { codigo: "C004", nombre: "Ley de Subcontratación", precio: 0 },
];

function cargarCursos() {
  const select = document.getElementById("cursoSelect");
  cursos.forEach(curso => {
    const opcion = document.createElement("option");
    opcion.value = curso.codigo;
    opcion.textContent = `${curso.nombre}`;
    select.appendChild(opcion);
  });
}

document.getElementById("cursoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const datos = {
    fecha: new Date().toLocaleDateString(),
    nombre: document.getElementById("usuarioNombre").value,
    rut: document.getElementById("usuarioRUT").value,
    curso: document.getElementById("cursoSelect").value,
    pregunta: document.getElementById("pregunta").value,
    respuesta: document.getElementById("respuesta").value
  };

  if (datos.respuesta.trim().toLowerCase() === "si") {
    generarCertificadoPDF(datos);
    alert("✅ ¡Respuesta correcta! Certificado generado.");
    this.reset();
  } else {
    alert("❌ Respuesta incorrecta. Intenta nuevamente.");
  }
});

function generarCertificadoPDF(datos) {
  const pdfContenido = document.createElement("div");
  const cursoNombre = cursos.find(c => c.codigo === datos.curso)?.nombre || "Curso";

  pdfContenido.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <h1 style="color:#003366">CERTIFICADO DE PARTICIPACIÓN</h1>
      <p>Se certifica que <strong>${datos.nombre}</strong>, RUT <strong>${datos.rut}</strong>, ha aprobado satisfactoriamente el curso <strong>${cursoNombre}</strong>.</p>
      <p>Fecha: ${datos.fecha}</p>
      <p style="margin-top:40px;">_________________________<br>Firma Instructor</p>
    </div>
  `;

  html2pdf().from(pdfContenido).save(`Certificado_${datos.nombre.replace(/\s+/g, "_")}.pdf`);
}

window.addEventListener("load", function () {
  cargarCursos();
});

