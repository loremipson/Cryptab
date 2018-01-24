import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD8XX0c49DR6szXwzjBKOF7vhappxXy1m4',
  authDomain: 'cryptab-e7956.firebaseapp.com',
  databaseURL: 'https://cryptab-e7956.firebaseio.com',
  projectId: 'cryptab-e7956',
  storageBucket: 'cryptab-e7956.appspot.com',
  messagingSenderId: '884661206413',
};

export const timestamp = firebase.database.ServerValue.TIMESTAMP;

export default firebase.initializeApp(config);
