const c = c => document.querySelector(c);
const cs = cs => document.querySelectorAll(cs);


const buttonAddClient = c(".add-client");
const buttonClose = c(".button-close");
const buttonSave = c("#save");  

const containerTable = c(".container tbody")

const openModal = () => {
    c(".modal-container").classList.add("active");
    c(".title h2").textContent = "New Client";
} 

const closeModal = () => {
    c(".modal-container").classList.remove("active");
    clearFields();
}

const getLocalStorage = () => 
    JSON.parse(localStorage.getItem("clients")) || [];

const setLocalStorage = client => 
    localStorage.setItem("clients", JSON.stringify(client))

const tempClient = {
    name: "Paulo",
    email: "melooliveira2003@gmail.com",
    phone: "19995901020",
    city: "Indaiatuba"
};

const deleteClient = index => {
    const clients = readClient();
    const response = confirm(`Deseja remover o cliente ${clients[index].name}`);
    if(response) {
        clients.splice(index, 1);
        setLocalStorage(clients);
        updateTable();
    }
}

// CRUD => CREATE, READ, UPDATE, DELETE

const updateClient = (index, clientUpdate) => {
    let client = readClient();
    client[index] = clientUpdate;
    setLocalStorage(client);
    updateTable();  
}; 

// READ

const readClient = () => getLocalStorage();

//CREATE
const createClient = client => {
    const clients = getLocalStorage();
    clients.push(client)
    setLocalStorage(clients)
}

const isValid = () => {
    return c("#form").reportValidity();
}

const clearFields = () => {
    const allInputs = cs(".input input");
    allInputs.forEach(input => input.value = "");    
}

const fillFields = ({name, email, phone, city, index}) => {
    c("#name").value = name;
    c("#email").value = email
    c("#phone").value = phone
    c("#city").value = city
    c("#name").dataset.index = index;
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
    c(".title h2").textContent = "Edit Client";
}


const saveClient = () => {
    const index = document.querySelector("#name").dataset.index;
    if(isValid()) {
        const client = {
          name: c("#name").value,
          email: c("#email").value,
          phone: c("#phone").value,
          city: c("#city").value,
        };
        if (index === "new") {
          createClient(client);
          closeModal();
          updateTable();
        } else {
          updateClient(index, client);
          updateTable();
          closeModal();
        }
    }
    
}

const createRow = (client, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green" onclick="editClient(${index})">Editar</button>
            <button type="button" class="button red" onclick="deleteClient(${index})">Excluir</button>
        </td>
    `;
    containerTable.appendChild(newRow)
}

const updateTable = () => {
    const allClients = readClient();
    containerTable.innerHTML = "";
    allClients.forEach(createRow);
}

updateTable();


// Events
buttonSave.addEventListener("click", saveClient);
buttonAddClient.addEventListener("click", openModal);
buttonClose.addEventListener("click", closeModal);



