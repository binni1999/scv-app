export async function createContact(contactDetails) {
    const requestOption = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactDetails)

    }
    const response = await fetch('/api/contacts', requestOption);
    const data = await response.json();
    return data;
}

export async function getUserContacts(page, query) {
    const response = await fetch(`/api/contacts/user?page=${page}&query=${query}`, {
        method: 'GET',
    })
    const data = await response.json();
    return data;

}
// export async function searchUserContacts(keyword) {
//     const response = await fetch(`/api/contacts/user?keyword=${encodeURIComponent(keyword)}`, {
//         method: 'GET',
//     })
//     const data = await response.json();
//     return data;

// }

export async function getContactInfo(contactId) {
    const response = await fetch(`/api/contacts/${contactId}`);
    const data = await response.json();
    return data;
}

export async function updateContact(contactId, contactDetails) {
    const requestOption = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactDetails)
    }
    const response = await fetch(`/api/contacts/${contactId}`, requestOption);
    const data = await response.json();
    return data;
}

export async function deleteContact(contactId) {
    const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',

    });
    const data = response.json();
    return data;
}