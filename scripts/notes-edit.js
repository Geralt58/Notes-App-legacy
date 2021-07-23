
dayjs.extend(window.dayjs_plugin_relativeTime)//get dayjs from now plugin

titleELement = document.querySelector('#note-title')
bodyElement = document.querySelector('#note-body')
dateElement = document.querySelector('#last-edited')
removeElement = document.querySelector('#remove-note')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if(!note) {
    location.assign('index.html')
}

titleELement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleELement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = dayjs().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = dayjs().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('index.html')
})

window.addEventListener('storage',  (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if(!note) {
            location.assign('index.html')
        }
        
        titleELement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})