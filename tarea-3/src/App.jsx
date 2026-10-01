import React, { useState } from 'react';
import './App.css';

// --- LÓGICA DEL TRADUCTOR (SIN API) ---
const traducirNumero = (num) => {
  if (num < 1 || num > 1000) return "Por favor, ingresa un número del 1 al 1000.";
  if (num === 1000) return "mil";
  
  const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
  const decenas = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  if (num < 30) return unidades[num];
  if (num < 100) return decenas[Math.floor(num / 10)] + (num % 10 !== 0 ? " y " + unidades[num % 10] : "");
  if (num === 100) return "cien";
  
  let resto = num % 100;
  let textoResto = "";
  if (resto > 0 && resto < 30) textoResto = " " + unidades[resto];
  else if (resto >= 30) textoResto = " " + decenas[Math.floor(resto / 10)] + (resto % 10 !== 0 ? " y " + unidades[resto % 10] : "");
  
  return centenas[Math.floor(num / 100)] + textoResto;
};

export default function App() {
  const [vistaActual, setVistaActual] = useState('inicio');

  // Estados para las herramientas
  const [numA, setNumA] = useState('');
  const [numB, setNumB] = useState('');
  const [numTraducir, setNumTraducir] = useState('');
  const [numTabla, setNumTabla] = useState('');

  // --- VISTAS ---
  const renderInicio = () => (
    <div className="card">
      <h2>Página Inicial</h2>
      <img src="/perfil.jpg" alt="Elian Ramirez" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
      <h3>Elian M. Ramirez Luciano</h3>
      <p><strong>Correo:</strong> 20197587@itla.edu.do</p>
    </div>
  );

  const renderSumadora = () => (
    <div className="card">
      <h2>Sumadora</h2>
      <input type="number" placeholder="Número 1" value={numA} onChange={(e) => setNumA(e.target.value)} />
      <input type="number" placeholder="Número 2" value={numB} onChange={(e) => setNumB(e.target.value)} />
      <h3>Resultado: {Number(numA) + Number(numB)}</h3>
    </div>
  );

  const renderTraductor = () => (
    <div className="card">
      <h2>Traductor de Números a Letras</h2>
      <input type="number" placeholder="Número (1-1000)" min="1" max="1000" value={numTraducir} onChange={(e) => setNumTraducir(e.target.value)} />
      <h3 style={{ textTransform: 'capitalize' }}>
        {numTraducir ? traducirNumero(parseInt(numTraducir)) : "Esperando número..."}
      </h3>
    </div>
  );

  const renderTabla = () => {
    const n = parseInt(numTabla);
    return (
      <div className="card">
        <h2>Tabla de Multiplicar</h2>
        <input type="number" placeholder="Ingresa un número" value={numTabla} onChange={(e) => setNumTabla(e.target.value)} />
        {numTabla && !isNaN(n) && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Array.from({ length: 13 }, (_, i) => i + 1).map(i => (
              <li key={i}>{n} x {i} = {n * i}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderExperiencia = () => (
    <div className="card">
      <h2>Experiencia Personal</h2>
      <p>Video explicando mi experiencia con la Tarea 3:</p>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/watch?v=GtUnGyjwTY" 
        title="Experiencia Tarea 3" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );

  return (
    <div className="container">
      <nav className="menu">
        <button onClick={() => setVistaActual('inicio')}>Inicio</button>
        <button onClick={() => setVistaActual('sumadora')}>Sumadora</button>
        <button onClick={() => setVistaActual('traductor')}>Traductor</button>
        <button onClick={() => setVistaActual('tabla')}>Tabla de Multiplicar</button>
        <button onClick={() => setVistaActual('experiencia')}>Video Experiencia</button>
      </nav>

      <main className="content">
        {vistaActual === 'inicio' && renderInicio()}
        {vistaActual === 'sumadora' && renderSumadora()}
        {vistaActual === 'traductor' && renderTraductor()}
        {vistaActual === 'tabla' && renderTabla()}
        {vistaActual === 'experiencia' && renderExperiencia()}
      </main>
    </div>
  );
}