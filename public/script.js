const API_URL = "https://parcial-ii-corte-be-maikol-gutierrez.onrender.com/api/v1";
let token = null;

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      token = data.token; 
      resultado.innerHTML = `<p class="success">Login exitoso</p>`;
    } else {
      resultado.innerHTML = `<p class="error"> ${data.error}</p>`;
    }
  } catch (err) {
    resultado.innerHTML = `<p class="error"> Error de conexión con el servidor</p>`;
    console.error(err);
  }
}

async function buscarPokemon() {
  const pokemonName = document.getElementById("pokemon").value.trim();
  const resultado = document.getElementById("resultado");

  if (!token) {
    resultado.innerHTML = `<p class="error"> Primero inicia sesión.</p>`;
    return;
  }

  if (!pokemonName) {
    resultado.innerHTML = `<p class="error"> Escribe el nombre de un Pokémon.</p>`;
    return;
  }

  resultado.innerHTML = `<p>⏳ Buscando ${pokemonName}...</p>`;

  try {
    const res = await fetch(`${API_URL}/pokemonDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ pokemonName }),
    });

    const data = await res.json();

    if (res.ok) {
      resultado.innerHTML = `
        <h3>${data.name.toUpperCase()}</h3>
        <p>Especie: ${data.species}</p>
        <p><b>Peso:</b> ${(data.weight / 10)} kg</p>
        <img src="${data.img_url}" alt="${data.name}">
      `;
    } else {
      resultado.innerHTML = `<p class="error"> ${data.error}</p>`;
    }
  } catch (err) {
    resultado.innerHTML = `<p class="error"> Error en la solicitud</p>`;
    console.error(err);
  }
}
