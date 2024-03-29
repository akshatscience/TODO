import { API } from "../backend"

export const getSignup = user => {
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getLogin = user => {
    return fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getSignout = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        next()
    }
    return fetch(`${API}/signout`, {
        method: "GET"
      })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
}

export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))

    }else{
        return false
    }
}

export const authenticate = (data,next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }


}