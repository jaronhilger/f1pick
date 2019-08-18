document.getElementById("header").innerHTML = ' \
    <nav class="website-nav"> \
        <ul> \
            <li><a class="home-link"href="./picks.html">Picks</a></li> \
            <li><a href="./standings.html">Standings</a></li> \
            <li><a href="./index.html" onclick="signOut()">Log out</a></li> \
        </ul> \
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
        if (location.href.includes(homePage)) {
            console.log ('You are on the login page.')
        } else {
            console.log('you are not on the login screen.')
            location.href = "./" + homePage
        }
        // console.log(location.pathname);
        // console.log(document.documentURI);
        // if (location.href != 'index.html') {location.href = "./index.html"}
    }
}