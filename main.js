import './style.css'
import { getPokemones } from './pokemones'

// Pintamos la pantalla de inicio de los poquemones
document.querySelector('#app').innerHTML = `
<div style="background-color: rgba(60, 179, 113, 0.5); color: white;">
  <h2 style="padding: 1rem 0 1rem 0; margin: 0; text-align:center;">Pokémon Checklist</h2>
</div>

<div id="contenido">
</div>
`

document.addEventListener("DOMContentLoaded", function () {

  // Mostramos en la interfaz del pokedex los primero 150 pokemones
  getPokemones(150);
})

