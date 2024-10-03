export async function login(authDetail) {
    const requestOption = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authDetail)
    }
    const response = await fetch('/api/users/login', requestOption);
    const data = await response.json();
    return data;
}

export async function signup(registerDetails) {
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerDetails)
    }
    const response = await fetch('/api/users/signup', requestOption)
    const data = await response.json();
    return data;
}

export async function logoutUser() {
    const requestOption = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch('/api/users/logout', requestOption);
    const data = await response.json();
    return data;
}

export async function getUserProfile() {
    const response = await fetch('/api/users/profile')
    const data = await response.json();
    return data;
}

export async function updateUserProfile(userDetails) {
    const requestOption = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    }
    const response = await fetch('/api/users/profile', requestOption);
    const data = await response.json();
    return data;
}