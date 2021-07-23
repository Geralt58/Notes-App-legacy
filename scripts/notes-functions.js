

//Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []  
    } catch (e) {
        return []
    }
}

// Save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex > -1){
        notes.splice (noteIndex, 1)
    }
}

//Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //set up note title text
    if(note.title.length > 0){
        textEl.textContent = note.title
    }
    else{
        textEl.textContent = 'Unnamed Note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the link
    noteEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}


//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            }
            else if (a.updatedAt < b.updatedAt) {
                return 1
            }
            else
            {
                return 0
            }
        })
    }
    else if(sortBy === 'byCreated'){
        return notes.sort((a,b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            }
            else if (a.createdAt < b.createdAt) {
                return 1
            }
            else
            {
                return 0
            }
        })
    }
    else if(sortBy === 'alphabetical') {
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if(b.title.toLowerCase() < a.title.toLowerCase()){
                return 1
            }
            else{
                return 0
            }
        })
    }
}   
 

// Render application notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No notes to show'
        notesEl.appendChild(emptyMessage)
    }
}

const generateLastEdited = (timeStamp) => `Last edited ${dayjs(timeStamp).fromNow()}`