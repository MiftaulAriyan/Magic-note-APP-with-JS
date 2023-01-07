const txtArea = document.getElementById('addTxt')
const addBtn = document.getElementById('addBtn')
notecards() // notes shown while refreshing browser
    // while someone click the text area content are stored to my localstorageValue.length===0 storage as an array, if user click the button often then the content will be store to my LS again and again
addBtn.addEventListener("click", function() {
        // Catching the text area value
        txtareaValue = txtArea.value
            // If text area value empty dont execute
        if (txtareaValue === '') {
            return
        }
        // Setting up the localstorageValue.length===0 storage
        let localstorageValue = localStorage.getItem("notes")
        if (localstorageValue == null) {
            localstorageValue = []
            localStorage.setItem("notes", JSON.stringify(localstorageValue))
        }
        // If the value contains contents
        else {
            localstorageValue = JSON.parse(localstorageValue)
        }

        // pushing the texts into the value
        localstorageValue.push(txtareaValue)
            // setting the value
        localStorage.setItem("notes", JSON.stringify(localstorageValue))
        txtArea.value = ""
        notecards()
    })
    // Creating function for adding note cards
function notecards() {
    // Create a empty variable
    let html = ''
        // Chapture the key value and condition.
    let localstorageValue = localStorage.getItem("notes")
    if (localstorageValue == null) {
        localstorageValue = []
        localStorage.setItem("notes", JSON.stringify(localstorageValue))
    }
    // If the value contains contents
    else {
        localstorageValue = JSON.parse(localstorageValue)
    }

    // Creating forEach loop to execute the code again and again
    localstorageValue.forEach(function(element, index) {
        html += `
          <div class="notecard card my-2 mx-2" style="width: 18rem">
              <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNotes(this.id)"type="button" class="btn btn-primary">Delete notes</button>
              </div>
          </div>`
    });

    if (localstorageValue.length === 0) {
        let noteElement = document.getElementById('notes')
        noteElement.innerHTML = "You Didn't create any notes"
    } else {
        let noteElement = document.getElementById('notes')
        noteElement.innerHTML = html
    }
}

function deleteNotes(index) {
    let localstorageValue = localStorage.getItem("notes")
    if (localstorageValue == null) {
        localstorageValue = []
        localStorage.setItem("notes", JSON.stringify(localstorageValue))
    }
    // If the value contains contents
    else {
        localstorageValue = JSON.parse(localstorageValue)
    }

    // pushing the texts into the value
    localstorageValue.splice(index, 1)
        // setting the value
    localStorage.setItem("notes", JSON.stringify(localstorageValue))
    notecards()
}

// function deleteNotes(index) {

//     let localstorageValue = localStorage.getItem("notes")
//     if (localstorageValue == null) {
//         localstorageValue = []
//         localStorage.setItem("notes", JSON.stringify(localstorageValue))
//     }
//     // If the value contains contents
//     else {
//         localstorageValue = JSON.parse(localstorageValue)
//     }
//     localstorageValue.splice(index, 1)
//     localStorage.setItem("notes", JSON.stringify(localstorageValue))
//     notecards()
// }
// This is for direct search 
// let searchTxt = document.getElementById("searchInput")

// searchTxt.addEventListener("input", function() {
//     searchValue = searchTxt.value

//     let notecard = document.getElementsByClassName("notecard")
//     Array.from(notecard).forEach(function(element) {
//         let cardText = element.getElementsByTagName("p")[0].innerHTML

//         if (cardText.includes(searchValue)) {
//             element.style.display = "block"
//         } else {
//             element.style.display = "none"
//         }
//     })
// })
// This is for search the note if the button was clicked
let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput")
    let searchtext = searchInput.value
    let noteCard = document.getElementsByClassName("notecard")
    Array.from(noteCard).forEach(function(element) {
        let cardText = element.getElementsByTagName("p")[0].innerHTML
        if (cardText.includes(searchtext)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
    })
})