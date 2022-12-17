
import { getMaestros } from './maestros';

// Función para pintar los pokemones en la interfaz del pokedex
export const getPokemones = (count) => {

    const contenido = document.querySelector("#contenido")

    contenido.innerHTML = `
    <a href="#" id="maestros">Maestros pokemon</a>
    <form id="form_pokedex" style="text-align:center; padding: 1rem 0 1rem 0">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" max-length="200" style="margin:0 0 0 0.5rem; border-radius: 5px; background-color: rgba(60, 179, 113, 0.5);" required>
        <button type="submit" border-radius: 5px;>Registrar</button>  
        <div id="pokedex" style="display:flex; flex-wrap: wrap; justify-content: space-evenly; margin: 2rem 0 2rem 0;">
        </div>
    </form>
    `
    // Manejo de rutas a traves de controladores de eventos
    let seccion_maestros = document.querySelector("#maestros");

    seccion_maestros.addEventListener("click", function () {

        getMaestros();
    })

    // Obtenemos el nodo formulario pokedex
    const form_pokedex = document.querySelector('#form_pokedex')

    // Adjuntamos el controlador de evento al nodo
    form_pokedex.addEventListener("submit", function (event) {

        event.preventDefault()

        const string_name = document.querySelector("#nickname")

        const pokemon_checked = document.querySelectorAll("input[name='pokemon[]']:checked")

        try {

            // Validamos si no se ha seleccionado mas de 6 pokemones
            if (pokemon_checked.length != 6) {

                throw new Error('Seleccione solo 6 pokemones!');
            }

            // Validamos si el nickname no tenga una longuitud mayor a 200 caracteres
            if (string_name.length > 200) {

                throw new Error('El nickname debe ser menor o igual a 200 caracteres!');
            }

            const nickname = string_name.value

            const array_pokemon = [];

            pokemon_checked.forEach(objeto => {

                array_pokemon.push(objeto.value)
            });

            // console.log(JSON.stringify({ nickname: nickname, pokemones: array_pokemon }))

            fetch('http://localhost/maestros-pokemon-backend/public/api/maestro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nickname: nickname, pokemones: array_pokemon })
            })
                .then(res => res.json())
                .then(res => {

                    if (res.result == 'exito') {

                        window.alert('Registro realizado con exito!!')
                    } else {

                        window.alert('Ocurrio un error al realizar el registro!!')
                    }
                }).catch(err => console.error(err))
        } catch (error) {

            window.alert(error.message)
        }
    })

    const pokedex = document.querySelector('#pokedex')

    // Pintamos los pokemones en la interfaz del pokedex
    for (let index = 1; index < count + 1; index++) {

        const url = `https://pokeapi.co/api/v2/pokemon/${index}`

        fetch(url)
            .then(res => res.json())
            .then(res => {

                const card = document.createElement("div");
                card.setAttribute("id", res.name)
                card.classList.add("card-pokemon")

                const label = document.createElement("label")

                const check = document.createElement("input")
                check.type = "checkbox"
                check.setAttribute("id", `${res.name}_1`)
                check.classList.add("check-pokemon")
                check.value = res.name
                check.name = "pokemon[]"

                const name = document.createElement("p")
                name.textContent = res.name

                const img = document.createElement("img")
                img.src = res.sprites.other.dream_world.front_default
                img.classList.add("img-pokemon")

                label.appendChild(check)
                label.appendChild(name)
                label.appendChild(img)
                card.appendChild(label)
                pokedex.appendChild(card)

                return `${res.name}_1`
            })
            .then((id) => {

                const cbox = document.querySelector(`#${id}`)

                // Adjuntamos un controlador de evento a un nodo
                cbox.addEventListener("change", function () {

                    const card = document.querySelector(`#${this.value}`)

                    if (this.checked) {

                        card.classList.add("bg-card-pokemon")
                    } else {

                        card.classList.remove("bg-card-pokemon")
                    }

                })
            })
            .catch(err => console.error(err))
    }
}

