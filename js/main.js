let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];


const form = document.querySelector("#form-login");

const inputName = document.querySelector("#nom");
const inputNomUtilisateur = document.querySelector("#nom-utilisateur");
const inputRegistartionNumber = document.querySelector("#matricule");
const inputPrenom = document.querySelector("#prenom");
const inputDateCreation = document.querySelector("#date-creation");
const inputStatus = document.querySelector("#etat");
let small = [...document.querySelectorAll("small")];

const btnAddUser = document.querySelector(".submit #add_user");
const btnShowFormAddUser = document.querySelector(".show-form  button");

const tbody = document.querySelector(".show-users tbody");
const formAddUser = document.querySelector(".add-user");

btnShowFormAddUser.addEventListener("click", function() {
  formAddUser.classList.add("backdrop");
})

// class User
class User {
  constructor (id, createdDate, status, firstName, lastName, userName, registrationNumber) {
    this.id = id;
    this.createdDate = createdDate;
    this.status = status;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.registrationNumber = registrationNumber;
  }
}

// class User iteraction

class Ui {
  constructor() {
    this.data = users;
  }

  // function add user
  addUser(user) {
    tbody.textContent = "";
    this.data.unshift(user);
    this.data.forEach((item) => {
      this.createElement(item);
    });
  }

  loadData() {
    this.data.forEach((item) => {
      this.createElement(item);
    });
  }
  //delete user by id
  deleteUser(id) {
    tbody.textContent = "";
    this.data = this.data.filter((item) => item.id !== id);
    this.data.forEach((item) => {
      this.createElement(item);
    });
  }

  checkStatus(status) {
    switch (status.toLocaleLowerCase()) {
      case "en validation":
        return "on-validation";
      case "validé":
        return "valide";
      case "rejeté":
        return "rejected";

      default:
        return "status is invalide";
    }
  }

  dateFormat(date) {
    let dateCreation = new Date(`${date}`);
    return `${
      dateCreation.getDate() < 10
        ? "0" + dateCreation.getDate()
        : dateCreation.getDate()
    }/${
      dateCreation.getMonth() < 10
        ? "0" + (dateCreation.getMonth() + 1)
        : dateCreation.getMonth() + 1
    }/${dateCreation.getFullYear()}`;
  }

  // generate auto id
  generateId() {
    let res = "";
    for (let i = 0; i < 9; i++) {
      res += Math.floor(Math.random() * 10);
    }
    return res;
  }

  // function create element
  createElement({
    id,
    createdDate,
    status,
    firstName,
    lastName,
    userName,
    registrationNumber,
  }) {
    let etat = this.checkStatus(status);
    let newDate = this.dateFormat(createdDate);
    let tr = document.createElement("tr");
    let idUser = document.createElement("td");
    idUser.textContent = id;

    let dateCreation = document.createElement("td");
    dateCreation.textContent = newDate;

    let statusUser = document.createElement("td");
    statusUser.classList.add("etat");
    let span = document.createElement("span");
    span.classList.add(etat);
    span.textContent = status;

    statusUser.appendChild(span);

    let nom = document.createElement("td");
    nom.classList.add("nom");
    nom.textContent = firstName;

    let prenom = document.createElement("td");
    prenom.classList.add("prenom");
    prenom.textContent = lastName;

    let nomUtilisateur = document.createElement("td");
    nomUtilisateur.textContent = userName;

    let registrNumber = document.createElement("td");
    registrNumber.textContent = registrationNumber;

    let icon_delete = document.createElement("td");
    icon_delete.classList.add("delete");

    let i = document.createElement("i");
    i.classList.add("fas", "fa-trash-alt", "delete-user");
    i.dataset.id = id;
    icon_delete.appendChild(i);

    tr.append(
      idUser,
      dateCreation,
      statusUser,
      nom,
      prenom,
      nomUtilisateur,
      registrNumber,
      icon_delete
    );
    tbody.append(tr);
  }

  isEmpty() {
    small.forEach((item) => {
      item.classList.remove("success");
      item.classList.add("error");
      item.textContent = "can not be empty";
    });
    return true;
  }

  // validation input firstname et lastname qui sont accepte juste une valeur string
  validateNomAndPrenom(input) {
    // test input accepte juste string
    if (/^[a-z A-Z]+$/gi.test(input.value)) {
      this.showMessageError("is valide", input, "success");
      return true;
    } else {
      this.showMessageError("is not valid", input, "error");
      return false;
    }
  }

  validateDate(input) {
    // validation de la date sous forme dd/mm/yyyy
    if (
      /^([0]?[1-9]|[12]\d|3[01])[/ -]([0]?[1-9]|1[0-2])[/ -](\d){2,4}$/g.test(
        input.value
      )
    ) {
      this.showMessageError("is valide", input, "success");
      return true;
    } else {
      this.showMessageError("exp: dd/mm/yyyy", input, "error");
      return false;
    }
  }

  validateNomUtilisateur(input) {
    // validation input nom utilisateur qui ne commence pas par des numéros et ne depasse pas size de 18
    if (
      /^[^0-9]/gi.test(input.value) &&
      input.value.length > 1 &&
      input.value.length <= 18
    ) {
      this.showMessageError("is valide", input, "success");
      return true;
    } else {
      this.showMessageError("is not valid", input, "error");
      return false;
    }
  }

  validateStatus(input) {
    let status = ["en validation", "validé", "rejeté"];
    if (status.includes(input.value.toLocaleLowerCase())) {
      this.showMessageError("is valide", input, "success");
      return true;
    } else {
      this.showMessageError(
        "incorrect il faut ecrire etat comme ça: en validation ou validé ou rejeté",
        input,
        "error"
      );
      return false;
    }
  }

  validateMatricule(input) {
    // validate matricule accepte 4 numero
    if (/^[0-9]{4}$/g.test(parseInt(input.value))) {
      console.log(parseInt(input.value));
      this.showMessageError("is valide", input, "success");
      return true;
    } else {
      this.showMessageError("accepte juste 4 numbers", input, "error");
      return false;
    }
  }

  // function show Message Error pour chaque input affiche different message
  showMessageError(msg, elemnt, className) {
    let small = document.querySelector(`[data-${elemnt.dataset.input}]`);
    let message = "";
    // small.textContent = `${elemnt.dataset.input} ${msg}`;
    if (className === "error") {
      small.classList.remove("success");
      small.classList.add("error");
      message = `${elemnt.dataset.input} ${msg}`;
    } else if (className === "success") {
      small.classList.remove("error");
      small.classList.add("success");
      message = `${elemnt.dataset.input} ${msg}`;
    }

    small.textContent = message;
  }

  clearInputs() {
    inputName.value = "";
    inputPrenom.value = "";
    inputRegistartionNumber.value = "";
    inputNomUtilisateur.value = "";
    inputStatus.value = "";
    inputDateCreation.value = "";
    inputRegistartionNumber.value = "";
  }

  clearSmall() {
    small.forEach((item) => {
      item.textContent = "";
    });
  }
}


const ui = new Ui();
ui.loadData();


// starts events

inputName.addEventListener("change", function() {
  ui.validateNomAndPrenom(this);
})

inputPrenom.addEventListener("change", function() {
  ui.validateNomAndPrenom(this);
})


inputDateCreation.addEventListener("change", function() {
  ui.validateDate(this);
})

inputStatus.addEventListener("change", function() {
  ui.validateStatus(this);
})

inputNomUtilisateur.addEventListener("change", function() {
  ui.validateNomUtilisateur(this);
})

inputRegistartionNumber.addEventListener("change", function() {
  ui.validateMatricule(this);
})

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if(inputName.value === "" || inputPrenom.value === "" || inputStatus.value === "" || inputDateCreation.value === "" || inputNomUtilisateur.value === "" || inputRegistartionNumber.value === "") {
      ui.isEmpty();
  } else if(ui.validateNomAndPrenom(inputName) && ui.validateNomAndPrenom(inputPrenom) && ui.validateMatricule(inputRegistartionNumber) && ui.validateNomUtilisateur(inputNomUtilisateur) && ui.validateDate(inputDateCreation) && ui.validateStatus(inputStatus)) {
    const user = new User(ui.generateId(), inputDateCreation.value, inputStatus.value, inputName.value, inputPrenom.value, inputNomUtilisateur.value, inputRegistartionNumber.value);
    ui.addUser(user);
    ui.clearInputs();
    ui.clearSmall();
    formAddUser.classList.remove("backdrop");
  }
})

tbody.addEventListener("click", function(e) {
  console.log(e.target)
  if(e.target.classList.contains("delete-user")) {
    ui.deleteUser(e.target.dataset.id);
  }
})
// end events

