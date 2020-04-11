var baseAddress = 'http://getyogirlagift.azurewebsite.net';
//var baseAddress = 'http://localhost:3000'

//login function
export async function login(user) {
    return await fetch(baseAddress + '/api/users/login', {
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
    return await fetch(baseAddress + '/api/users/signup', {
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
    return await fetch(baseAddress + '/api/users/manage', {
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
    return await fetch(baseAddress + '/api/users/verify', {
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

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

    return await fetch(url)
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}

//Get all girls for a user
export async function getGirls(userId) {

    return await fetch(baseAddress + '/api/Girls/forUser/' + userId)
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}

//Add Girl
export async function AddGirl(girl) {
    return await fetch(baseAddress + '/api/Girls', {
        body: JSON.stringify(girl),
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

//Edit Girl
export async function editGirl(girlId, girl) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

    return await fetch(url, {
        body: JSON.stringify(girl),
        method: 'PUT',
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

//Delete Girl
export async function deleteGirl(girlId) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//Retrive Gifts for girl fuction
//Occassion is a string
export async function getGifts(girlId, occassion) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/gifts');
    url.searchParams.set('girlid', girlId);
    url.searchParams.append('occassion', occassion);

    return await fetch(url)
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}

//Evaluate Gifts function for mobile app

/*
    class request{
        byte[] ImageBytes;
    }

    Use a class like this for the request variable in the function.

    ImageBytes is the picture taken by the phone app or selcted from gallary
*/



export async function evaluateGifts(girlId, request) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/gifts');
    url.searchParams.set('girlid', girlId);

    return await fetch(url, {
        body: JSON.stringify(request),
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




