var baseAddress = 'http://getyogirlagift.azurewebsites.net';
//var baseAddress = 'http://localhost:3000'


//Get token function
/*
 *  Attributes for token credentials
 *  Use these exact attributes and values for all calls to getToken:
 *  username - ApiAccess
 *  password - ApiAccessPassword
 *  grant_type - password
 *  
 * */




export async function getToken(tokenCredentials) {

  var formBody = [];
  for (var property in tokenCredentials) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(tokenCredentials[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&")

  /* Possible solution if formBody doesnt work, uncomment this, comment the above lines from var fromBody to formBody.join.
   * Replace formBody bellow with params
  var params = new URLSearchParams();
  params.set('username', 'ApiAccess');
  params.append('password', 'ApiAccessPassword');
  params.append('grant_type', 'password');
  */

  return await fetch(baseAddress + '/api/token', {
    body: formBody,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      return response.json()
        .then(parsed => {
          console.log(parsed);
          return parsed.access_token;
        });
    });
}

/*
 * loginRequest class attributes:
    username - string
    password - string

  signupRequest class attributes:
    username - string
    password - string
    email - string

*/
//login function
export async function login(loginRequest, token) {
    return await fetch(baseAddress + '/api/users/login', {
        body: JSON.stringify(loginRequest),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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
export async function addUser(signupRequest, token) {
    return await fetch(baseAddress + '/api/users/signup', {
        body: JSON.stringify(signupRequest),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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
export async function changePassword(user, token) {
    return await fetch(baseAddress + '/api/users/manage', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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
export async function getGirl(girlId, token) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

  return await fetch(url, {
    headers: {
      'token': token
    }
  })
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}

//Get all girls for a user
export async function getGirls(userId, token) {

  return await fetch(baseAddress + '/api/Girls/forUser/' + userId, {
    headers: {
      'token': token
    }
  })
        .then(response => {
            return response.json()
                .then(parsed => {
                    return parsed;
                });
        });
}

//Add Girl
export async function AddGirl(girl, token) {
    return await fetch(baseAddress + '/api/Girls', {
        body: JSON.stringify(girl),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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
export async function editGirl(girlId, girl, token) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

    return await fetch(url, {
        body: JSON.stringify(girl),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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
export async function deleteGirl(girlId, token) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/Girls');
    url.searchParams.set('id', girlId);

    await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
    });
}

//Retrive Gifts for girl fuction
//Occassion is a string
export async function getGifts(girlId, occassion, token) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/gifts');
    url.searchParams.set('girlid', girlId);
    url.searchParams.append('occassion', occassion);

  return await fetch(url, {
    headers: {
      'token': token
    }
  })
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



export async function evaluateGifts(girlId, request, token) {

    let url = new URL('http://getyogirlagift.azurewebsite.net/api/gifts');
    url.searchParams.set('girlid', girlId);

    return await fetch(url, {
        body: JSON.stringify(request),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
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




