import firebaseui from 'firebaseui';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // available options: popup, default, redirect.
  signInFlow: 'default',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '/',
  // Privacy policy url.
  privacyPolicyUrl:'/'
};

export const startAuthUi = () => {ui.start('#firebaseui-auth-container', uiConfig)};