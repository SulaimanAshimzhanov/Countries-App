

const email = document.querySelector(".email");

const name = document.querySelector(".name");

// const lastname = document.querySelector(".lastname");

// const avatar = document.querySelector(".avatar");

const password = document.querySelector(".password");

const error = document.querySelector(".error");

const register = document.querySelector(".register");


window.addEventListener("load", () => {
    if(!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }
})


const users = JSON.parse(localStorage.getItem("users"));

console.log(users);


register.addEventListener("click", (e) => {
    e.preventDefault();

    const isUser = !!users.find(item => item.email === email.value);

    console.log(isUser);

    if(name.value !== "" && email.value !== "" && password.value !== "") {
        if(isUser) {
            error.innerHTML = "Данный пользователь уже есть!";
        } else {
            const allUsers = JSON.parse(localStorage.getItem("users"));

            localStorage.setItem("users", JSON.stringify(
                [
                    ...allUsers,
                    {
                        name: name.value,
                        email: email.value,
                        password: password.value,
                        // lastname: lastname.value,
                        // avatar: avatar.value,
                    }
                ]
            ))
            window.open("../auth.html", "_self");
        }
        email.value = "";
        name.value = "";
        password.value = "";
        lastname.value = "";
        avatar.value = "";
    } else {
        error.innerHTML = "Все поля должны быть заполнены!";
    }
})



window.addEventListener("load", () => {
    if(localStorage.getItem("access_token") === "true") {
        window.open("../index.html", "_self");
    }
})