import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

export const veeValidateDictionary = {
  de: {
    messages: {
      auth: `Bitte überprüfen Sie ihren Namen und das Passwort.`,
      passwordscore: `Das gewählte Passwort ist nicht sicher genug.`,
      confirmspecial: `Die Passwörter stimmen nicht überein.`
    }
  },
  en: {
    messages: {
      auth: `Please check your name and password.`,
      passwordscore: `The chosen password is not secure enough.`,
      confirmspecial: `The passwords do not match.`
    }
  }
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
/*       'username': 'Username',
      'password': 'Password',
      'backToLogin': 'Back to Login',
      'yourEmailAdress': 'Email Address',
      'checkEmail': 'Please check your email inbox.',
      'resetPassword': 'Reset password',
      'resetPasswordSuccess': 'The password has been reset.',
      'newPassword': 'New password',
      'repeatPassword': 'Repeat password',
      'passwordSecurity': 'Password security',
      'requestNewPassword': 'Request', */
      'reloadPage': 'Reload page',
      'toTheMainPage': 'To the main page',
      'checkConnectivity': 'Check connectivity',
      'contact': 'Contact',
      'error': 'Error',
 /*      'pw': {
        '0': 'Very weak',
        '1': 'Weak',
        '2': 'Ok',
        '3': 'Good',
        '4': 'Great'
      }, */
      errors: {
        'default': 'Contact us. Something is wrong in an unexpected place.<br>Get in touch with us as this isn\'t likely to get better on its own.',
        '502': {
          'default': 'Try Again Later.<br>Something has gone wrong, but it\'s likely to work again soon.<br>Check back in a while, and if it\'s still not working contact support.'
        },
        '403': {
          'default': 'You are not allowed to access this resource.<br>Contact us if you need access to this resource.'
        },
        '409': {
          'default': 'Version mismatch. Concurrent modification. <br>Hint: somebody edited your open document.'
        },
        '400': {
          'default': 'Bad request. <br>Please take a look technical details.'
        },
        'networkError': {
          'noInternet': 'No internet connection. <br>Please check your connectivity and retry.',
          'default': 'Network error. <br>Please try again later or contact us.',
        },
        'is500Error': 'A server error has occurred.<br>Please contact us at:',
        'isAuthError': 'Please log in.',
        'isPermissionsError': 'You are not authorized to access this resource. <br>Please contact us at:'
      }
    },
    de: {
/*       'username': 'Name',
      'password': 'Passwort',
      'backToLogin': 'Zurück zum Login',
      'yourEmailAdress': 'E-Mail Adresse',
      'checkEmail': 'Bitte überprüfen sie ihren Email-Posteingang.',
      'resetPassword': 'Reset password',
      'resetPasswordSuccess': 'Das passwort wurde zurückgesetzt.',
      'newPassword': 'Neues Passwort',
      'repeatPassword': 'Passwort wiederholen',
      'passwordSecurity': 'Passwortsicherheit',
      'requestNewPassword': 'Anfordern', */
      'reloadPage': 'Seite neuladen',
      'toTheMainPage': 'Zur Hauptseite',
      'checkConnectivity': 'Überprüfen Sie die Konnektivität',
      'contact': 'Kontakt',
      'error': 'Error',
 /*      'pw': {
        '0': 'Sehr schwach',
        '1': 'Schwach',
        '2': 'Ok',
        '3': 'Gut',
        '4': 'Großartig'
      }, */
      errors: {
        'default': 'Kontaktiere uns. An einem unerwarteten Ort stimmt etwas nicht. <br>Nehmen Sie Kontakt mit uns auf, da dies allein wahrscheinlich nicht besser wird.',
        '502': {
          'default': 'Versuchen Sie es später noch einmal. <br>Es ist ein Fehler aufgetreten, aber es wird wahrscheinlich bald wieder funktionieren. <br>Versuchen Sie es in einer Weile erneut, und wenn es immer noch nicht funktioniert, wenden Sie sich an den Support.'
        },
        '403': {
          'default': 'Sie dürfen nicht auf diese Ressource zugreifen. <br>Kontaktieren Sie uns, wenn Sie Zugriff auf diese Ressource benötigen.'
        },
        '409': {
          'default': 'Versionskonflikt. Gleichzeitige Änderung. <br>Hinweis: Jemand hat Ihr geöffnetes Dokument bearbeitet.'
        },
        '400': {
          'default': 'Ungültige Anforderung. <br>Bitte schauen Sie sich die technischen Details an.'
        },
        'networkError': {
          'noInternet': 'Keine Internetverbindung. <br>Bitte überprüfen Sie Ihre Konnektivität und versuchen Sie es erneut.',
          'default': 'Netzwerkfehler. <br>Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns.',
        },
        'is500Error': 'Ein Server Fehler ist aufgetreten.<br>Bitte kontaktieren sie uns unter:',
        'isAuthError': 'Bitte loggen sie sich ein.',
        'isPermissionsError': 'Sie sind nicht authorisiert, diese Ressource aufzurufen.<br>Bitte kontaktieren sie uns unter:'
      }
    }
  }
})
