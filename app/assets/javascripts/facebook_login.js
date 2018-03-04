//
//
//
//
//    // Including the Login Button into your page is easy. Visit the documentation for the login button and set the button up the way you want. Then click Get Code and it will show you the code you need to display the button on your page.
//    // The onlogin attribute on the button to set up a JavaScript callback that checks the login status to see if the person logged in successfully:
//
//
//    FB.getLoginStatus(function(response) {
//        statusChangeCallback(response);
//    });
//
//    {
//        status: 'connected',
//        authResponse: {
//            accessToken: '...',
//            expiresIn:'...',
//            signedRequest:'...',
//            userID:'...'
//        }
//    }
//
// // This is the callback. It calls FB.getLoginStatus() to get the most recent login state. (statusChangeCallback() is a function that's part of the example that processes the response.)
//
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
