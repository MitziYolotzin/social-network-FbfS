firebase.initializeApp({
    apiKey: "AIzaSyBJNzQ3CWLsX34L9LxyR2UexqM4yuBvYM8",
    authDomain: "usuarios-bc93b.firebaseapp.com",
    projectId: "usuarios-bc93b"
});

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

const safe = () => {
    //function safe(){
    let name = document.getElementById('name').value;
    let mssg = document.getElementById('mssg').value;

    //Agregar datos
    db.collection("users").add({
            first: name,
            last: mssg,

        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('name').value = '';
            document.getElementById('mssg').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

//Leer Datos RealTime
let table = document.getElementById('table');

db.collection("users").onSnapshot((querySnapshot) => {
    table.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        table.innerHTML += ` 
        <tr>
                
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td><button class="btn btn-link" onclick="editingData('${doc.id}','${doc.data().first}','${doc.data().last}')">Editar</button></td>
                <td><button class="btn btn-link" onclick="deleteData('${doc.id}')">Eliminar</button></td>
                
              </tr>
        `
    });
});

//Borrar Datos
const deleteData = (id) => {

db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}

//Editar Datos

const editingData = (id, name, mssg) => {
    
    document.getElementById('name').value = name;
    document.getElementById('mssg').value = mssg;
    let buttonEdit = document.getElementById('button-safe');
    buttonEdit.innerHTML = 'Editar';

    buttonEdit.onclick = () => {

        let dataRef = db.collection("users").doc(id);
        // Set the field of id

let name = document.getElementById('name').value;
let email = document.getElementById('mssg').value;

        return dataRef.update({
            first: name,
            last: email
        })
        .then(function() {
            console.log("Document successfully updated!");
            buttonEdit.innerHTML = 'Guardar';
            document.getElementById('name').value = '';
            document.getElementById('mssg').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }
   
}









// //Leer Documentos con get 1
// let table = document.getElementById('table');

// db.collection("users").get().then((querySnapshot) => {
//     table.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data().first}`);
//         table.innerHTML += ` 
//         <tr>
//                 <th scope="row">${doc.id}</th>
//                 <td>${doc.data().first}</td>
//                 <td>${doc.data().last}</td>
                
//               </tr>
//         `
//     });
// });