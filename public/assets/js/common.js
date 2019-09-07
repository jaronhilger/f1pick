document.getElementById("header").innerHTML = ' \
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top"> \
        <a class="navbar-brand" href="#">F1 Pickem</a> \
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"> \
            <span class="navbar-toggler-icon"></span> \
        </button> \
        <div class="collapse navbar-collapse" id="navbarsExampleDefault"> \
            <ul class="navbar-nav mr-auto">\
                <li class="nav-item">\
                    <a class="nav-link" href="./picks.html">Picks<span class="sr-only">(current)</span></a>\
                </li>\
                <li class="nav-item">\
                    <a class="nav-link" href="./standings.html">Standings</a>\
                </li>\
            </ul>\
        </div>\
        <div id="logInOrOut">\
        </div>\
    </nav>'

document.getElementById("footer").innerHTML = '<p class="footer-contents">Let\'s do this!</p>'

var homePage = "index.html"


var data = { 
    UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();

function signInButton() {
                  
    var authenticationData = {
        Username : document.getElementById("inputUsername").value,
        Password : document.getElementById("inputPassword").value,
    };
    
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
            location.href = "./picks.html"
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });    
}

function signOut(){
    if (cognitoUser != null) {
      cognitoUser.signOut();
      location.reload();	  
    }
}

window.onload = function(){
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
            document.getElementById("logInOrOut").innerHTML = '<a class="nav-link" href="./index.html" onclick="signOut()">Log Out</a>'
            //Set the profile info
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
                // document.getElementById("email_value").innerHTML = result[2].getValue();	
            });
        });
    } else {
        console.log('No one logged in');
        console.log(location.href);
        document.getElementById("logInOrOut").innerHTML = '\
        <form class="form-inline my-2 my-lg-0"> \
            <input class="form-control mr-sm-2" type="text" id="inputUsername"  placeholder="Email address" name="username" required autofocus>\
            <input class="form-control mr-sm-2" type="password" id="inputPassword"  placeholder="Password" name="password" required>\
            <button class="btn btn-secondary my-2 my-sm-0" type="button" onclick="signInButton()">Sign in</button>\
        </form>'
        if (location.href.includes(homePage)) {
            console.log ('You are on the login page.')
        } else {
            console.log('you are not on the login screen.')
            location.href = "./" + homePage
        };
    };
}

var apiEndpoint = 'https://fu9wdatrml.execute-api.us-east-1.amazonaws.com/Prod/'

// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
const app = document.getElementById('helloWorld')
if(app){
    var request = new XMLHttpRequest();
    request.open('GET', apiEndpoint, true);
    request.onload = function() {
        var responseData = this.response
        if (request.status >= 200 && request.status < 400) {
            const p = document.createElement('p')
            p.textContent = responseData
            app.appendChild(p)
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            app.appendChild(errorMessage)
        }
    }
    request.send()
}
//end data access

const appGetUserData = document.getElementById('getUserData')
if(appGetUserData){
    var requestUrl = apiEndpoint + 'user/1234'
    var request = new XMLHttpRequest();
    request.open('GET', requestUrl , true);
    request.onload = function() {
        var responseData = this.response
        if (request.status >= 200 && request.status < 400) {
            const p = document.createElement('p')
            p.textContent = responseData
            appGetUserData.appendChild(p)
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            appGetUserData.appendChild(errorMessage)
        }
    }
    request.send()
}
//end data access
