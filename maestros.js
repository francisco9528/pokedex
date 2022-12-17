import { getPokemones } from './pokemones'

// Función para pintar los pokemones en la interfaz del pokedex
export const getMaestros = () => {

    const contenido = document.querySelector("#contenido")

    contenido.innerHTML = `
    <a href="#" id="poke">Pokedex</a>
    <div class="contenido-tabla">
    <table class="tabla-maestros">

        <thead class="head-maestros">
            <tr>
                <th width="10%">ID</th>
                <th width="30%">Nickname</th>
                <th width="20%">Pokemon 1</th>
                <th width="20%">Pokemon 2</th>
                <th width="20%">Pokemon 3</th>
            </tr>
        </thead>

        <tbody id="add_maestros">

        </tbody>

    </table>
    </div>
    `

    let seccion_pokemones = document.querySelector("#poke");

    seccion_pokemones.addEventListener("click", function () {

        // Mostramos en la interfaz del pokedex los primero 150 pokemones
        getPokemones(150);
    })

    // Pintamos los maestros pokemones en la interfaz
    fetch('http://localhost/maestros-pokemon-backend/public/api/maestros')
        .then(res => res.json())
        .then(res => {

            const maestros_pokemon = document.querySelector('#add_maestros')

            res.maestro.forEach(objeto_1 => {

                maestros_pokemon.innerHTML += `
                <tr>
                    <td width="10%">${objeto_1.id}</td>
                    <td width="30%">${objeto_1.nickname}</td>
                    <td width="20%" id="poke_1_${objeto_1.id}"></td>
                    <td width="20%" id="poke_2_${objeto_1.id}"></td>
                    <td width="20%" id="poke_3_${objeto_1.id}"></td>
                </tr>
                `

                let contador = 1

                res.pokemon.forEach(objeto_2 => {

                    if (objeto_2.id_maestro == objeto_1.id && contador < 4) {

                        document.querySelector(`#poke_${contador}_${objeto_2.id_maestro}`).textContent = objeto_2.pokemon

                        console.log(contador);

                        contador++
                    } else {

                        contador = 1;
                    }
                });
            });

            // console.log(res.pokemon);
        })
        .catch(err => console.error(err))
}