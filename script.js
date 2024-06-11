const addBtn = document.querySelector("#addBtn");
const overlay = document.querySelector(".overlay");

const saveNote =()=>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes)
    const data = []
     
    notes.forEach(
        (note)=>{
            data.push(note.value);
            // note.innerText = data;
        }
    )
    console.log(data);

    if(data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
    localStorage.setItem("notes", JSON.stringify(data));
    }
    
}
const addNote = (msg = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tools">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="delete fa-solid fa-trash"></i>
    </div>
    <textarea>${msg}</textarea>
    `;
    
    // console.log(note.querySelector(".delete"));

    note.querySelector(".delete").addEventListener(
        "click",
        function(){
            note.remove()
            saveNote();
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNote();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNote()
        }
    )

    overlay.appendChild(note);
}

(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes === null){
            addNote()
        }
        else{
        lsNotes.forEach(
            (lsNote)=>{
                addNote(lsNote)
            }
        )
    }
        // if(lsNotes.length === 0){
        //     localStorage.removeItem("notes")
        // }
    }
)()

addBtn.addEventListener(
    "click",
    function () {
        addNote();
    }
)

