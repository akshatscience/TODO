const { API } = require("../backend");

export const createTodos = (userId,token,todos) => {
    return fetch(`${API}/user/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(todos)
        
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const getTodos = (userId,token) => {
    return fetch(`${API}/user/todos/${userId}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))

}

export const deleteTodos = (todosId,userId,token) => {
    return fetch(`${API}/user/${todosId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}