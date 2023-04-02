function fetchData() {
  fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((characters) => characters.forEach((anim) => showList(anim)));
}

function showList(anim) {
  let div = document.getElementById("dog-bar");
  let span = document.createElement("span");
  span.id = anim.id;
  span.textContent = anim.name;
  div.appendChild(span);
  let state = null;
  if (anim.isGoodDog == true) {
    state = "Good Dog";
  } else {
    state = "Bad Dog";
  }

  span.addEventListener("click", (e) => {
    document.getElementById("dog-info").innerHTML = `<img src="${anim.image}" />
<h2>${anim.name}</h2>
<button id= '${anim.id}'>${state}!</button>`;
  });

  document.getElementById(`${anim.id}`).addEventListener("click", (e) => {
    if (anim.isGoodDog == true) {
      document.getElementById(`${anim.id}`).innerHTML = `Bad Dog !`;
      state = false;
    } else {
      document.getElementById(`${anim.id}`).innerHTML = `Good Dog !`;
      state = true;
    }

    fetch(`http://localhost:3000/pups/${anim.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: state,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`success`);
        } else {
          console.error(`Failed`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

fetchData();
