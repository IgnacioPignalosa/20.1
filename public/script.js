document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    getHeroes(token);
  } else {
    displayLogin();
  }
});

async function getHeroes(token) {
  try {
    const response = await fetch("/heroes", {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    });

    if (!response.ok) {
      alert(response.status);
      displayLogin();
      return false;
    }

    const heroes = await response.json();
    displayHeroes(heroes);
  } catch (error) {
    alert("Error obteniendo heróes");
  }
}

function displayHeroes(heroes) {
  const heroesList = document.getElementById("heroes-list");
  heroesList.innerHTML = "";

  heroes.forEach((hero) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("d-flex");
    listItem.classList.add("flex-nowrap");
    listItem.classList.add("gap-2");
    listItem.classList.add("bg-dark");

    listItem.innerHTML = `
      <span class="d-inline-block w-75 h5 d-flex align-items-center text-light">${hero.name} - (${hero.rol}) - (${hero.class}) - (${hero.hp})</span>
      <button class="btn btn-primary" onclick="editHero(${
        hero.id
      })">Editar</button>
      <button class="btn btn-danger" onclick="removeHero(${
        hero.id
      })">Eliminar</button><br><br>
    `;
    heroesList.appendChild(listItem);
  });

  // con hero.status podemos ver si la heróe está completado o pendiente.
  // Si su valor es 1 entonces está compeltado, si es 0 está pendiente.
  //   Apretando en el botón de marcar corremos una función que cambia el status de la heróe a 1 o a 0.

  const addHeroButton = document.createElement("button");
  addHeroButton.classList.add("btn");
  addHeroButton.classList.add("btn-info");
  addHeroButton.classList.add("text-light");
  addHeroButton.textContent = "Nuevo heróe";
  addHeroButton.addEventListener("click", addNewHero);
  heroesList.appendChild(addHeroButton);
}

function displayLogin() {
  const loginForm = document.createElement("div");
  loginForm.id = "loginForm";
  loginForm.classList.add("bg-dark");
  loginForm.classList.add("border");
  loginForm.classList.add("border-1");
  loginForm.classList.add("rounded");
  loginForm.classList.add("p-2");
  loginForm.classList.add("text-light");
  loginForm.classList.add("justify-content-center");
  loginForm.innerHTML = `
      <h2>New Raid</h2>
        <p>User: Mighty pass: H3r0</p>     
      <form>
  <div class="mb-3 justify-content-center">
    <label for="username" class="form-label" required/>Username:</label>
    <input type="text" class="form-control" id="username">
  </div>
  <div class="mb-3 justify-content-center">
    <label for="password" class="form-label" required>Password:</label>
    <input type="password" class="form-control" id="password">
  </div>
  <button type="button" class="btn btn-primary" onclick="login()">Login</button>
</form>


    `;

  document.body.appendChild(loginForm);
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      alert("Usuario y/o contraseña incorrectos");
      return false;
    }

    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);
    document.body.removeChild(document.getElementById("loginForm"));

    getHeroes(token);
  } catch (error) {
    alert("Error logeando");
  }
}

async function editHero(heroId) {
  const newData = {};

  newData.name = prompt("Ingresá un nuevo nombre para el héroe:");
  newData.rol = prompt("Ingresá un nuevo rol para el héroe:");
  newData.class = prompt("Ingresá una nueva clase para el héroe:");

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`/heroes/${heroId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      alert("No se pudo hacer la petición");
      return false;
    }

    // Si todo sale bien, se intenta mostrar los héroes actualizados
    getHeroes(token);
  } catch (error) {
    alert("Error editando héroe");
  }
}

async function removeHero(heroId) {
  const wantToDelete = confirm(
    "Estás seguro de que querés eliminar este heróe?"
  );

  if (wantToDelete) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/heroes/${heroId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      });

      if (!response.ok) {
        alert("No se pudo hacer la petición");
        displayLogin();
        return false;
      }

      getHeroes(token);
    } catch (error) {
      alert("Error elminando heróe");
    }
  }
}

async function addNewHero() {
  const newName = prompt("Ingresá un nuevo héroe:");
  const newRol = prompt("Ingresá un nuevo rol para el héroe:");
  const newClass = prompt("Ingresá una nueva clase para el héroe:");

  // Generar un valor aleatorio entre 30 y 100 para hp
  const newHP = Math.floor(Math.random() * (100 - 30 + 1)) + 30;

  if (newName || newRole || newClass) {
    const token = localStorage.getItem("token");

    const newHeroData = {
      name: newName,
      rol: newRol,
      class: newClass,
      hp: newHP,
      status: 1,
    };

    try {
      const response = await fetch("/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
        body: JSON.stringify(newHeroData),
      });

      if (!response.ok) {
        alert("No se pudo hacer la petición");
        return false;
      }

      // Fetchear y mostrar héroes actualizados
      getHeroes(token);
    } catch (error) {
      alert("Error agregando nuevo héroe:");
    }
  }
}

async function toggleHeroeStatus(heroId, currentStatus) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`/heroes/${heroId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
    });

    if (!response.ok) {
      alert("No se pudo hacer la petición");
      displayLogin();
      return false;
    }

    getHeroes(token);
  } catch (error) {
    alert("Error cambiando el estado del heróe");
  }
}
