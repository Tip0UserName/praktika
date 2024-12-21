const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
      authorization: '7c77913b-e851-4e12-afa8-7961cb907d24',
      'Content-Type': 'application/json'
    }
  }

export const getUserInfo = async () => {
    const res = await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    });
    
    if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
    }
    
    return await res.json();
}

export const getInitialCards = async () => {
    try {
        const res = await fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        });
        
        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const editProfile = async (nameInput, descriptionInput) => {
    try {
        const res = await fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: nameInput,
                about: descriptionInput
            })
        });

        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const addNewCard = async (name, link) => {
    try {
        const res = await fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({ name, link })
        });

        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();            }
            return Promise.reject(`Ошибка ${res.status}`)
        });
}

export const addLike = async (cardId) => {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return await res.json();
}

export const removeLike = async (cardId) => {
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return res.json();
}

export const editImage = async (avatar) => {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return res.json();
}
