//Unit test for GetYoGirlAGift API
/*
    Important note: This tester is currently out-of-date and needs to be updated

    Due to compilications, the main web application had to be remade and this lead to
    this tester being out-dated. Due to time constraints the tester was not fixed to apply to the 
    current api format used in the web application
*/
//User object to use for comparison
var compareingUser = {
    id: 5,
    Username: 'robertf',
    Password: '123456',
    Email: 'keysboy20135@yahoo.com',
    isVerified: false,
    Girls: []

}

//Girl object to use for comparison
var compareingGirl = {
    $id: "1",
    Images: [],
    ImportantDates: [],
    Interests: [],
    Id: 11,
    UserId: 5,
    Relationship: 9,
    Name: "Melissa",
    HasInterests: false
}

//Token object to use for comparison and authentication tests
var compareingToken = {
    access_code: '8ojLSJKIpU8yFiU1FNSS-xGOSZSK_3NSyHtSAv2QuRJoLU3csbIVASFBgCtG7o0pq_iDlJifWfdCiqLndlIUrY-X_SVfTEiYIjlLHS0iL00rtHyr_wsn0IfRF7QGW3Rrec9KkNz15tV_HwTixveebnVd8EJV7XU6GEhi3jMur2MijQO2rrYJxZIIqUnXXurhE73jLOJO9S9Jl_TM-8LGZQ',
    token_type: 'bearer',
    expires_in: 86399
}

//Incorrect token response, used in fail test for token
var expectedFailTokenCall = {
    error: "invalid_grant",
    error_description: "Provided username and password is incorrect."
}

//Incorrect token call credentials, used in fail test for token
const tokenCFail = {
    username: 'Apiaccess',
    password: 'ApiAccessPassword',
    grant_type: 'password'
}

//Correct token call credentials, used in pass test for token
const TokenCPass = {
    username: 'Apiaccess',
    password: 'ApiAccessPassword',
    grant_type: 'password'
}

//Incorrct login request, used in fail test for login
const loginRequestToFail = {
    username: "robertf",
    password: "Fail"
}

//Correct login request, used in pass for login
const LoginRequestToPass = {
    username: "robertf",
    password: "123456"
}

//Inncorect signup request, used in fail for signup
const signupRequestToFail = {
    username: "robertf",
    password: "Fail",
    email: "fail@fail.com"
}

//Correct signup request, used in pass for signup
const signupRequestToPass = {
    username: "JacobB",
    password: "abc",
    email: "real-email@email.com"
}

//Incorrect id parameeter for getAllGirlsFail
const idParameterForGetAllGirlsFail = {
    id: 99
}

//Correct id parameter for getAllGirlsPass
const idParameterForGetAllGirlsPass = {
    id: 5
}

//Incorrect girl for addGirlFail
const addGirlToFail = {
    $id: "1",
    Images: [],
    ImportantDates: [],
    Interests: [],
    Id: 11,
    UserId: 5,
    Relationship: 9,
    Name: null,
    HasInterests: false
}

//Correct girl for addGirlPass
const addGirlToPass = {
    $id: "1",
    Images: [],
    ImportantDates: [],
    Interests: [],
    Id: 12,
    UserId: 5,
    Relationship: 9,
    Name: "Jackii",
    HasInterests: false
}

var testHolder = {
    tokenFailHolder: "",
    tokenPassHolder: "",
    loginFailHolder: "",
    loginPassHolder: "",
    signupFailHolder: "",
    signupPassHolder: "",
    getAllGirlsPass: "",
    getAllGirlsFail: "",
}

//Main function to run all tests
export function callTests () {
    
    testHolder.tokenFailHolder = tokenFail(tokenCFail);
    console.log(testHolder.tokenFailHolder);
    testHolder.tokenPassHolder = tokenPass(tokenCPass);
    console.log(testHolder.tokenPassHolder);
    testHolder.loginFailHolder = testLoginFail(loginRequestToFail, compareingToken);
    console.log(testHolder.loginFailHolder);
    testHolder.loginPassHolder = testLoginPass(loginRequestToPass, compareingToken);
    console.log(testHolder.loginPassHolder);
    testHolder.signupFailHolder = testSignupFail(signupRequestToFail, compareingToken);
    console.log(testHolder.signupFailHolder);
    testHolder.signupPassHolder = testSignupPass(signupRequestToPass, compareingToken);
    console.log(testHolder.signupPassHolder);
    testHolder.getAllGirlsFail = getAllGirlsFail(idParameterForGetAllGirlsFail, compareingToken);
    console.log(testHolder.getAllGirlsFail);
    testHolder.getAllGirlsPass = getAllGirlsPass(idParameterForGetAllGirlsPass, compareingToken);
    console.log(testHolder.getAllGirlsPass);
}

//Function to test that incorrect token credentials gives expected output
function tokenFail (tokenCFail){
    var token = getToken(tokenCFail);

    if (token.hasOwnProperty("error"))
        return "Passed token fail test";
    else
        return "Failed token fail test";
}

//Function to test that correct token credentials gives expected output
function tokenPass (tokenCPass){
    var token = getToken(tokenCPass);

    if (token.hasOwnProperty("access_code") && token.hasOwnProperty("token_type") && token.hasOwnProperty("expiers_in"))
        return "Passed token pass check";
    else
        return "Failed token pass check";
}

//Function to test that incorrect login requests give expected output
function testLoginFail(loginRequestToFail) {
    var failResponse = login(loginRequestToFail, compareingToken);

    if (failResponse.Success == false)
        return "Passed login fail check";
    else
        return "Failed login fail check";
}

//Function to test that correct login requests give expected output
function testLoginPass(LoginRequestToPass){
    var passResponse = login(LoginRequestToPass, compareingToken);

    if (passResponse.Success == true){
        if (typeof(passResponse.User) == typeof(compareingUser))
            return "Passed login pass check"
        else
            return "testLoginPass: User not returned but Api registered a Success"
    }
        
    else
        return "Failed login pass check";
}

//Function to test that incorrect signup requests give expected output
function testSignupFail(signupRequestToFail) {
    var failResponse = addUser(signupRequestToFail, compareingToken);

    if (failResponse.Success == false)
        return "Passed signup fail check";
    else
        return "Failed signup fail check";
}

//Function to test that correct signup requests give expected output
function testSignupPass (signupRequestToPass) {
    var passResponse = addUser(signupRequestToPass, compareingToken);

    if (passResponse.Success == true){
        if (typeof(passResponse.User) == typeof(compareingUser))
            return "Passed login pass check"
        else
            return "testSignupPass: User not returned but Api registered a Success"
    }
    else
        return "Failed signup fail check";
}

function getAllGirlsFail (idParameterForGetAllGirlsFail){
    var failResponse = getGirls(idParameterForGetAllGirlsFail, compareingToken);

    if (typeof(failResponse) == typeof([])){
        if (failResponse[0] == null)
            return "Passed getAllGirls fail check"
        else
            return "getAllGirlsFail: Returned non-empty array"
    }
    else
        return "Failed getAllGirls fail check"
}

function getAllGirlsPass (idParameterForGetAllGirlsPass) {
    var passResponse = getGirls(idParameterForGetAllGirlsPass, compareingToken);

    if (typeof(passResponse) == typeof([])) {
        if (typeof(passResponse[0]) == compareingGirl)
            return "Passed getAllGirls pass check"
        else
            return "getAllGirlsPass: Returned empty or incorecct array of girls"
    }
    else
        return "Failed getAllGirls pass check"
}

function addGirlFail (addGirlToFail) {
    var failResponse = addGirl(addGirlToFail, compareingToken);

    if (failResponse.hasOwnProperty("error"))
        return "Passed addGirl fail check";
    else
        return "Failed addGirl fail check";
}

function addGirlPass (addGirlToPass) {
    var passResponse = addGirl(addGirlToPass, compareingToken);

    if (typeof(passResponse) == typeof(compareingGirl)){
        if (passResponse.Name == "Jackii" && passResponse.UserId == 5)
            return "Passed addGirl pass check";
        else
            return "addGirlToPass: Girl was returned with empty or incorrect data";
    }
    else
        return "Failed addGirl pass check";
}

