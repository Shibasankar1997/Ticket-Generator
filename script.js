const addBtn = document.querySelector('.add-btn')
const removeBtn = document.querySelector('.delete-btn')
const modal = document.querySelector('.modal-cont')
const mainContainer = document.querySelector('main')
const textArea = document.querySelector('.textarea-cont')
const allPriorityColors = document.querySelectorAll('.priority-colors')

// Selecting default color
const colors = ['pink', 'gery', 'blue', 'black']
let modalPriorityColor = colors[colors.length - 1]
// console.log(priorityColor)

// listener for modal priority coloring

allPriorityColors.forEach((colorElm, idx) => {
    colorElm.addEventListener('click', (e) => {
        allPriorityColors.forEach((priorityColorElm, idx) => {
            priorityColorElm.classList.remove('active')
        })
        colorElm.classList.add('active')

        modalPriorityColor = colorElm.classList[0]
        console.log(modalPriorityColor)
    })
})
// Add a flag for toggle
let addFlag = false
// for remove a flag
let removeFalg = false

// toggle lock and unlock

const lockClass = 'fa-lock'
const unlockClass = 'fa-lock-open'

addBtn.addEventListener('click', (e) => {
    //Display Modal

    //Generate Tickets

    // addFlag - true => display modal
    // addFlag - flase => modal remove
    addFlag = !addFlag
    // console.log(addFlag)
    // putting condition based on flag state
    if (addFlag) {
        modal.style.display = 'flex'
    } else {
        modal.style.display = 'none'
    }
})

removeBtn.addEventListener('click', (e) => {
    removeFalg = !removeFalg
})
modal.addEventListener('keydown', (e) => {
    let key = e.key
    // console.log(key)
    if (key === 'Shift') {
        createTicket(modalPriorityColor, textArea.value, shortid())
        modal.style.display = 'none'
        addFlag = false
        textArea.value = ''
    }
})

// A function for creating ticket

const createTicket = (ticketColor, ticketTask, ticketID) => {
    let ticketCont = document.createElement('div')
    ticketCont.setAttribute('class', 'ticket-cont')
    ticketCont.innerHTML = `
                <div class="ticket-color ${ticketColor}"></div>
                <div class="ticket-id">#${ticketID}</div>
                <div class="ticket-data">${ticketTask}</div>
                <div class="ticket-lock">
                    <i class="fa-solid fa-lock"></i>
                </div>`
    mainContainer.appendChild(ticketCont)

    handelRemoval(ticketCont)
    handelLock(ticketCont)
}

const handelRemoval = (ticket) => {
    if (removeFalg) ticket.remove()
}

const handelLock = (ticket) => {
    let ticketLockElm = ticket.querySelector('.ticket-lock')
    let ticketLock = ticketLockElm.children[0]
    console.log(ticketLockElm.children[0])
    ticketLock.addEventListener('click', (e) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass)
            ticketLock.classList.add(unlockClass)
        } else {
            ticketLock.classList.remove(unlockClass)
            ticketLock.classList.add(lockClass)
        }
    })
}
