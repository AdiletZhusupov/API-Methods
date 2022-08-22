const endpoint = "https://630027a19350a1e548eaa8a2.mockapi.io/api/v1/users/"
const tableBody = document.querySelector("tbody");
const modal = document.querySelector("#exampleModal");
const form = document.querySelector("#form");
const form2 = document.querySelector("#form2");

const fetchAPI = async (url)=>{
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

fetchAPI(endpoint).then((data)=>{
    createEL(data);
});

const createEL = (data)=>{
    tableBody.innerHTML = "";
    data.forEach((item)=>{
        const {id, fname, lname, age, title} = item;
        const user = `
        <tr>
            <td>${id}</td>
            <td>${fname}</td>
            <td>${lname}</td>
            <td>${age}</td>
            <td>${title}</td>
            <td>
                <button onclick="getUser(${id})" data-bs-toggle="modal" data-bs-target="#exampleModal2" type="button" class="btn btn-edit btn-success btn-sm">Edit</button>
                <button onclick="deleteUserFromAPI(${id})" type="button" class="btn btn-delete btn-danger btn-sm">Delete</button>
            </td>
        </tr>`
        tableBody.innerHTML += user;
    })
};

const deleteUserFromAPI = async (id)=>{
    const userUrl = `${endpoint}${id}`;
    const resp = await fetch(userUrl, {
        method : "DELETE"
    })
    fetchAPI(endpoint).then((data)=>{
        createEL(data);
    });
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newUser = {
        fname: e.target.fname.value,
        lname: e.target.lname.value,
        age: e.target.age.value,
        title: e.target.title.value
    }
    addNewUserToAPI(newUser);
});

const addNewUserToAPI = async (newUser)=>{
    const resp = await fetch(endpoint, {
        method : "POST",
        headers : { 
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser),
    });
    fetchAPI(endpoint).then((data)=>{
        createEL(data);
    });
}

form2.addEventListener("submit", (e)=>{
    e.preventDefault();
    const userID = e.target.userID.value;
    const updatedUser = {
        fname: e.target.fname2.value,
        lname: e.target.lname2.value,
        age: e.target.age2.value,
        title: e.target.title2.value
    }
    EditUser(updatedUser, userID);
})

const getUser = async (id)=>{
    const getUser = `${endpoint}${id}`;
    const resp = await fetch(getUser);
    const user = await resp.json();
    const userID = document.querySelector("#userID");
    const fname2 = document.querySelector("#fname2");
    const lname2 = document.querySelector("#lname2");
    const age2 = document.querySelector("#age2");
    const title2 = document.querySelector("#title2");
    userID.value = id;
    fname2.value = user.fname;
    lname2.value = user.lname;
    age2.value = user.age;
    title2.value = user.title;
    
}

const EditUser = async (updatedUser, userID)=>{
    const userUpdateUrl = `${endpoint}${userID}`;
    const resp = await fetch(userUpdateUrl, {
        method : "PUT",
        headers : { 
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser),
    })
    fetchAPI(endpoint).then((data)=>{
        createEL(data);
    });
}


