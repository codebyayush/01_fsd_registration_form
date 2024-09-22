//this will add user on the screen.
function addUserOnScreen(name, id, email, phone){

    //getting table body by it's id.
    const tbody = document.getElementById('tbody');
    //creating a new table row and settingup an id to the row as per the given id.
    const trow = document.createElement('tr');
    trow.id = `${id}`

    //setting innerHTML for the created element trow.
    //passing all the values to the onclick functions & table data element.
    trow.innerHTML =
        ` <td class="border border-emerald-900 px-4 py-2">${name}</td>
          <td class="border border-emerald-900 px-4 py-2">${id}</td>
          <td class="border border-emerald-900 px-4 py-2">${email}</td>
          <td class="border border-emerald-900 px-4 py-2">${phone}</td>
          <td class="border border-emerald-900 px-4 py-2 pl-10">
                  <button onclick="resetUser('${name}', '${id}', '${email}', '${phone}')" class="mr-2 p-2 hover:shadow-xl hover:bg-emerald-600 rounded-md bg-emerald-500 text-white">
                    Reset
                  </button>
                  <button onclick="deleteUser('${id}')" class="hover:bg-red-600 hover:shadow-xl bg-red-500 -ml-1 p-2 rounded-md mt-2 text-white">
                    Delete
                  </button>
          </td>`
    
    //now adding the table row to its parent element tbody.
    tbody.appendChild(trow);
}

// resetting user detail on reset button click.
function resetUser(name, id, email, phone){
    //firstly removing it from the list of user
    //& local storage.
    deleteUser(id);
    
    //resetting the input values as per their details
    document.getElementById('name').value = name;
    document.getElementById('id').value = id;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
}

// deleting user from table.
function deleteUser(id){

    // deleting the user by its ID.
    // because it'll always be unique.
    let deletingRow = document.getElementById(`${id}`)
    deletingRow.remove();

    //removing from localstorage.
    localStorage.removeItem(id);
}

// taking all the inputs by their ID & 
// pushing them into the table, then reset input to empty.
const formId = document.getElementById('form-id');
formId.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // creating a user object to save it in local storage.
    let userObj = {
        name: name,
        id: id,
        email: email,
        phone: phone,
    }

    //saving the user details on localstorage by their ID.
    localStorage.setItem(`${id}`, JSON.stringify(userObj));

    //adding user to screen
    addUserOnScreen(name, id, email, phone);

    //resetting the user details back to empty
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('id').value = "";
    document.getElementById('phone').value = "";

})

//on reloading the page, screen will get all the information saved in local Storage.
window.onload = function(){
    
    //looping through all the elements of local storage 
  for (let i = 0; i < localStorage.length; i++) {
    //getting the key as per the index.
    let key = localStorage.key(i);

    //getting the object assigned to that key
    let getObj = localStorage.getItem(key);

    //parsing the strigify version of getObj again to normal object. 
    const obj = JSON.parse(getObj);
    
    //adding customer to the screen.
    addUserOnScreen(obj.name, obj.id, obj.email, obj.phone);
  }
}
