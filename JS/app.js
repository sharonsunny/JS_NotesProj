console.log("app.js")

let flag = 0;
showNotes();
let addBtn1 = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    console.log("addTxt", addTxt);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    console.log(addTxt.value, "addtxt.value");
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
})
function showNotes() {
    let notes;
    if (flag)
        notes = localStorage.getItem("notesSearch");
    else
        notes = localStorage.getItem("notes");
    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach((element, index) => {
        html += `  <div class=" mx-2 my-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">${element}</p>
                <a  id="${index}" onclick='DeleteNotes(this.id)' class="btn btn-primary" id="delBtn">Delete Note</a>
            </div>
        </div>`
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else
        notesElem.innerHTML = `Nothing to Display-Use ADD NOTES section`;
}

function DeleteNotes(index) {
    notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}

function search() {
    flag = 0;
    searchText = document.getElementById("searchInput").value;
    if (searchText != "") {
        notes = localStorage.getItem('notes');
        if (notes == null)
            notesObj = [];
        else
            notesObj = JSON.parse(notes);
        notesObj.forEach((element) => {
            if (element == searchText) {
                displaySearchNote(element);
            }
        });
        if (flag == 0) {
            notesObjSearch = [];
            flag = 1;
            localStorage.setItem("notesSearch", JSON.stringify(notesObjSearch));
            showNotes();
        }
    }
    else
        showNotes();


}

function displaySearchNote(element) {
    notesObjSearch = [];
    flag = 1;
    notesObjSearch[0] = element;
    localStorage.setItem("notesSearch", JSON.stringify(notesObjSearch));
    showNotes();

}

searchInput.addEventListener("input", function () {
    let cardClass = document.getElementsByClassName("card");
    // let addTxt = document.getElementById("addTxt");
    // console.log("addTxt",addTxt);
    Array.from(cardClass).forEach((element) => {
        let paraText = element.getElementsByTagName("p")[0];
        if (paraText != undefined) {
            // console.log("text",paraText);
            paraText=paraText.innerHTML;
            // console.log("text",paraText);
            // if (paraText.innerHTML == searchInput.value)
            //     console.log("match");
            if(paraText.toString().includes(searchInput.value))
            {
                element.style.display="block";
            }
            else
            element.style.display="none";
        }
    });
})


// let delBtn = document.getElementById('del');
// delBtn.addEventListener('click', function () {
//     JSON.parse(localStorage.getItem('notes'));
//     let html = '';
//     let notesElem = document.getElementById('notes');
//     notesElem.innerHTML = html;
// })

