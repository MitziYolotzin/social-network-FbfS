//REGISTRO
const buttonRegister = document.getElementById('register');

//INGRESO
const buttonAccess = document.getElementById('access');


//REGISTRAR NUEVO USUARIO
buttonRegister.addEventListener('click', () => {

let email = document.getElementById('email').value;
let pass = document.getElementById('pass').value;

firebase.auth().createUserWithEmailAndPassword(email, pass)
//.then((res)=>{ })
  //console.log(res)
  .then(function(){
      verifyEmail()
  }) 

.catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...

  console.log(errorCode);
  console.log(errorMessage);

  });

});

//INICIAR SESION
buttonAccess.addEventListener('click', () => {

    let emailAc = document.getElementById('email-ac').value;
    let passAc = document.getElementById('pass-ac').value;
    
    firebase.auth().signInWithEmailAndPassword(emailAc, passAc).then((res)=>{
      console.log(res);
    })
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
    
    console.log(errorCode);
    console.log(errorMessage);
    
      });
    
    });

//VERIFICAR USUARIO
const verify = () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('si existe usuario activo')
            viewUserClose(user); 
          // User is signed in.
          let displayName = user.displayName;
          let email = user.email;
          console.log(user.emailVerified);
          let emailVerified = user.emailVerified;
          let photoURL = user.photoURL;
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          let providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario activo')
          window.top.innerHTML = `
          `;
        }
      });
    }
      
    verify();


//SALIR DE LA SESION
//const buttonLogout = document.getElementById('logout');
const viewUserClose = (user) => {
     let content = document.getElementById('user-data');
 if (user.mailVerified){
content.innerHTML = `
<div class="container mt-5">
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Bienvenido ${user.mail}</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
<button id="logout" onclick="closeSession()" class="btn btn-secondary>Cerrar Sesión</button>
</div>
`;
}
}
//  buttonLogout.addEventListener('click', () => {
//   closeSession();
//     //content.innerHTML = `<p>Su sesión se ha cerrado</p>`;
//     content.innerHTML = `
//     <p>Bienvenido</p>
//     <button id="logout">Cerrar Sesión</button>`;
  
//   });
 

//FUNCION CERRAR SESION
const closeSession = () => {

    firebase.auth().signOut()

    .then(function(){
console.log('Cerrando sesión');

    })

    .catch(function(error){
     console.log(error);   
    })
}

//Verificar Email
const verifyEmail = () => {

    let user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('Correo de verificación enviado');
}).catch(function(error) {
  // An error happened.
  console.log(error);
});


}

////////MURO NETWORKING FIRESTORE

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






// function register() {
//     console.log('mevoyaregistrar')
// }