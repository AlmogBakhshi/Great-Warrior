export const URL = 'http://ruppinmobile.tempdomain.co.il/site04/api/'

export const Get = async (controller) => {
    return await fetch(URL + controller, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .catch(err => console.warn(err))
}

export const Post = async (controller, body) => {
    return await fetch(URL + controller, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .catch(err => console.warn(err))
}

export const Put = async (controller, body) => {
    return await fetch(URL + controller, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .catch(err => console.warn(err))
}

export const Delete = async (controller) => {
    return await fetch(URL + controller, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .catch(err => console.warn(err))
}