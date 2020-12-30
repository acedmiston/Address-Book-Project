function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

// add a contact
AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

//assign a unique id
AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

// find a contact
AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return "This contact does not exist";
}

// delete a contact
AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return "This contact does not exist";
  }
  delete this.contacts[id];
  return true;
}

function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

let addressBook = new AddressBook();

//contacts on bottom left side when added
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li class='people' id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>"
  });
  contactsList.html(htmlForContactInfo);
};

// this shows the full contact on the right side of the screen with delete button added
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

//show contact on right side when clicked
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
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

// search bar
const list = document.getElementsByClassName("people");
const searchBar = document.forms['search-person'].querySelector('input');

//prevents page from refreshing if you accidentally hit enter when searching
document.getElementById("search-person").addEventListener("submit", function (event) {
  event.preventDefault();
});

//adds an event listener when typing in search field to show if there is a contact by hiding the others
searchBar.addEventListener('keyup', function (event) {
  const search = event.target.value.toLowerCase();
  for (let i = 0; i < list.length; i++) {
    const name = list[i].textContent;
    if (name.toLowerCase().indexOf(search) != -1) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
})

