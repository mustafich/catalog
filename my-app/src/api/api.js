import * as firebase from "firebase";

function writeUserData() {
    var starCountRef = firebase.database().ref('product');
    return  starCountRef.on('value', function (snapshot) {
         return  snapshot.val()
    });

}

export default writeUserData