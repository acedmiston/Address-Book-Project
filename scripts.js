function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
}

//assign a unique id
AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
}

// find a contact
AddressBook.prototype.findContact = function(id) {
    if (this.contacts[id] != undefined) {
      return this.contacts[id];
    }
    return "This contact does not exist";
  }

  // AddressBook.prototype.updateContact = function(id) {
  //   if (this.contacts[id] != undefined) {
  //     return this.contacts[id];
  //   }
  //   return "This contact does not exist";
  // }
  
// delete a contact
  AddressBook.prototype.deleteContact = function(id) {
    if (this.contacts[id] === undefined) {
      return "This contact does not exist";
    }
    delete this.contacts[id];
    return true;
  }

function Contact(firstName, lastName, phoneNumber, address){
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
}

// Contact.prototype.fullName = function() {
//     return this.firstName + " " + this.lastName;
// }

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li class='people' id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit((event) => {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddress = $("input#new-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");


    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});


const list = document.querySelector("#contacts");

const searchBar = document.forms['search-person'].querySelector('input');
searchBar.addEventListener('keyup', function(event){
    const search = event.target.value.toLowerCase();
    const person = list.getElementById('id');
    Array.from(person).forEach(function(per){
        const name = per.firstElementChild.textContent;
        if(name.toLowerCase().indexOf(search) != -1){
           per.style.display = 'block'; 
        } else {
            per.style.display = 'none'; 
        }
    })
})
