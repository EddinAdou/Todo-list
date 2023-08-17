const labels = document.querySelectorAll(".add-wrapper label");

labels.forEach((label) => {
  let input = label.querySelector("input");
  let span = label.querySelector("span");
  input.addEventListener("change", () => {
    span.innerHTML = input.value;
  });
});

let tasksArr = [
  {
    title: "Tâche 1",
    description: "Description de la tâche",
    date: "23 Jan 2023",
    time: "13:30",
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche",
    date: "23 Mai 2023",
    time: "10:10",
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche",
    date: "23 Jui 2023",
    time: "8:50",
  },
  {
    title: "Tâche 4",
    description: "Description de la tâche",
    date: "22 Jul 2023",
    time: "16:30",
  },
];
const tasksWrapper = document.querySelector(".tasks-wrapper");

function renderTasks() {
  tasksWrapper.innerHTML = "";

  //tache vide
  if (tasksArr.length === 0) {
    tasksWrapper.innerHTML = `<div class="no-tasks">Pas de tâches, en ajouter une maintenant</div>`;
    return;
  }

  //si les taches ont des taches

  tasksArr.forEach((task) => {
    //voir si expiré
    let expired;
    expired = checkExpired(task) ? "expired" : "";

    tasksWrapper.innerHTML += `
              <div class="task">
          <div class="left">
            <div class="radio">
              <ion-icon class="icon" name="checkmark"></ion-icon>
            </div>
          </div>
          <div class="right">
            <p class="title">${task.title}</p>
            <p class="description">${task.description}</p>
            <div class="info ${expired}">
              <p class="date">
                <ion-icon name="calendar-outline"></ion-icon>
                <span>${task.date}</span>
              </p>
              <p class="dot">
                <ion-icon name="ellipse"></ion-icon>
              </p>
              <p class="time">
                <ion-icon name="time-outline"></ion-icon>
                <span>${task.time}</span>
              </p>
            </div>
          </div>
        </div>
      `;
  });

  tasksWrapper.innerHTML += `
     <div class="delete">
          <ion-icon name="trash-outline"></ion-icon>
        </div>`;

  //ajouter des listes d'événements

  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("click", (e) => {
      //si la radio est selectonnée
      if (e.target.classList.contains("radio")) {
        task.classList.toggle("selected");
        //afficher le bouton de suppression lorsqu'au moins une tâche est sélectionnée
        if (document.querySelector(".task.selected")) {
          document.querySelector(".delete").classList.add("show");
        } else {
          document.querySelector(".delete").classList.remove("show");
        }
      }
    });
  });

  //En cas de suppression, retirer la tâche de l'arrangement et la restituer
  const deleteBtn = document.querySelector(".delete");
  deleteBtn.addEventListener("click", deleteTasks);
}

renderTasks();

function checkExpired(task) {
  let date = new Date(task.date);
  let time = new Date(task.time);
  let now = new Date();
  if (date < now || time < now) {
    return true;
  }
  return false;

  //true si la date ou l'heure actuelle est inférieure signifie que la tâche n'est pas encore terminée
}

function deleteTasks() {
  const selectedTasks = document.querySelectorAll(".task.selected");
  if (selectedTasks.length === 0) return;
  //si on selectionne des tâches
  let confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer les tâches sélectionnées?");
  if (confirmDelete) {
    selectedTasks.forEach((task) => {
      //Obtenir le titre de la tâche et filtrer les tâches correspondantes
      let title = task.querySelector(".title").innerHTML;
      tasksArr = tasksArr.filter((task) => task.title !== title);
    });
    renderTasks();
  }
}

const addTaskForm = document.getElementById("add-task-form"),
  titleElem = document.getElementById("title"),
  descriptionElem = document.getElementById("description"),
  dateElem = document.getElementById("date"),
  timeElem = document.getElementById("time");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = titleElem.value,
    description = descriptionElem.value,
    date = dateElem.value,
    time = timeElem.value;
  //validation
  if (title === "" || description === "" || date === "" || time === "") {
    //if anything empty
    alert("Veuillez remplir tous les champs");
  }

  let task = {
    title,
    description,
    date,
    time,
  };

  //envoi
  tasksArr.push(task);
  //rerender arr
  renderTasks();
  //effacer après ajout
  clear();
});

function clear() {
  titleElem.value = "";
  descriptionElem.value = "";
  dateElem.value = "";
  timeElem.value = "";

  dateElem.nextElementSibling.innerHTML = "Date";
  timeElem.nextElementSibling.innerHTML = "Horaire";
}
//bouton effacer btn
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", clear);
