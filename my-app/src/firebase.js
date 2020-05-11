const firebaseConfig = {
    apiKey: "AIzaSyCvHNOdQOho7Q3R7iTUZRG6NHM7PAZLxQU",
    authDomain: "catalog-react.firebaseapp.com",
    databaseURL: "https://catalog-react.firebaseio.com",
    projectId: "catalog-react",
    storageBucket: "catalog-react.appspot.com",
    messagingSenderId: "1044914251096",
    appId: "1:1044914251096:web:c67c1cc14dfeae492db12d"
};

firebase.initializeApp(firebaseConfig);

export const database =firebase.database.Reference();

export const auth = firebase.auth();
export const firestore = firebase.firestore();