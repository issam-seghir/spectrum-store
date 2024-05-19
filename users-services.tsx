import { formdata, login } from "../types";
import axios from "axios";
export async function getUser(userId: number) {
    const user = await fetch(`https://fakestoreapi.com/users/${userId}`);
    if (!user.ok) return undefined;
    return user.json();
}

export async function addUser({
    city,
    email,
    firstname,
    lastname,
    password,
    phone,
    street,
    username,
    zipcode,
}: formdata) {
    console.log({
        city,
        email,
        firstname,
        lastname,
        password,
        phone,
        street,
        username,
        zipcode,
    });
    const user = await axios("https://fakestoreapi.com/users", {
        method: "POST",
        data: {
            email: email,
            username: username,
            password: password,
            name: {
                firstname: firstname,
                lastname: lastname,
            },
            address: {
                city: city,
                street: street,
                number: 3,
                zipcode: zipcode,
                geolocation: {
                    lat: "-37.3159",
                    long: "81.1496",
                },
            },
            phone: phone,
        },
    });
    return user;
}

export async function loginUser({ username, password }: login) {
    try {
        const login = await axios({
            url: "https://fakestoreapi.com/auth/login",
            method: "POST",
            data: {
                username: username,
                password: password,
            },
        });
        return login;
    } catch (err) {
        return undefined;
    }
}
