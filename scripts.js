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

// search 
// const people = []; //how do I find the people to use for this if they dont exist yet?

function findMatches(wordToMatch, contacts) {
  return contacts.filter(person => {
    //code
    const regex = new RegExp(wordToMatch, 'gi');
    return person.firstName.match(regex) || person.lastName.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, contacts);
  const html = matchArray.map(person => {
    const regex = new RegExp(this.value, 'gi');
    const first = person.firstName.replace(regex, `<span class="hl">${this.value}</span>`);
    // const last = person.lastName.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
        <li>
            <span class="first-name">${person.first}</span>
        </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// const list = document.querySelector(".contacts");

// const searchBar = document.forms['search-person'].querySelector('input');
// searchBar.addEventListener('keyup', function(event){
//     const search = event.target.value.toLowerCase();
//     const person = list.getElementById('id');
//     Array.from(person).forEach(function(per){
//         const name = per.firstElementChild.textContent;
//         if(name.toLowerCase().indexOf(search) != -1){
//            per.style.display = 'block'; 
//         } else {
//             per.style.display = 'none'; 
//         }
//     })
// })

// function searchFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById('myinput');
//     filter = input.value.toUpperCase();
//     ul = document.getElementById('contacts');
//     li = ul.getElementsByTagName('li');

//     for(i = 0; i < li.length; i++){
//         a = li[i].getElementsByTagName('li')[0];
//         if(a.innerHTML.toUpperCase().indexOf(filter) > -1){
//             li[i].style.display = "";
//         }

//         else{
//             li[i].style.display = 'none';
//         }
//     }
// }

// const peopleList = document.getElementById('contacts');
// const searchBar = document.getElementById('searchBar');
// let allContacts = [];

// const displayContacts = (contact) => {
//     const htmlString = contact
//         .map((contact) => {
//             return `
//             <li class='people'>
//                 <p>${contact.firstName}<p>
//                 <p>${contact.lastName}</p>
//                 <p>${contact.phoneNumber}</p>
//                 <p>${contact.address}</p>
//             </li>
//         `;
//         })
//         .join('');
//     peopleList.innerHTML = htmlString;
// };


// searchBar.addEventListener('keyup', function(element){
//   element.preventDefault();
// const searchString = element.target.value.toLowerCase();

// const filteredPeople = allContacts.filter((person) =>{
//     return(
//     person.name.toLowerCase().includes(searchString)
//     );
// })
// displayContacts(filteredPeople);
// })
