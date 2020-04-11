var baseAddress = 'http://getyogirlagift.azurewebsite.net';

//login function
export async function login(user) {
    return await fetch(baseAddress + '/api/users/login/', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
                .then(parsed => {
                    console.log(parsed);
                    return parsed;
                });
        });
}

//Add User function
export async function addUser(user) {
    return await fetch(baseAddress + 'api/users/signup', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
                .then(parsed => {
                    console.log(parsed);
                    return parsed;
                });
        });
}

//Change password function
export async function changePassword(user) {
    return await fetch(baseAddress + 'api/users/manage', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
                .then(parsed => {
                    console.log(parsed);
                    return parsed;
                });
        });
}

/*export async function verifyEmail(user) {
    return await fetch(baseAddress + 'api/users/verify', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
                .then(parsed => {
                    console.log(parsed);
                    return parsed;
                });
        });
}*/

//Get girl by id function
export async function getGirl(girlId) {
    return await fetch(baseAddress + '/api/Girls/' + girlId)
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}





