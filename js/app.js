//Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//
let LIST;
let id;

// get item from local storage
let data = localStorage.setItem('TODO', '')

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(item => {
      addToDo(item.name, item.id, item.done, item.trash)  
    });
};

//clear the local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

// Show Todays date
const options = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric'
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);
// dateElement.innerHTML = today.toLocaleTimeString('en-US', options);

// Add ToDo Function

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job = 'complete' id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job = 'delete' id="${id}"></i>
                </li>
                `;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item)
}

// Add an item to the list user enter key
/* document.addEventListener('keyup', function(even) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        // if the input isn't empty
        if (toDo) {
            addToDo(toDo)
        }
    }
}) */

document.addEventListener('keyup', even => {
    if (event.keyCode === 13) {
        const myToDo = input.value;

        // if the input isn't empty
        if (myToDo) {
            addToDo(myToDo, id, false, false);
            LIST.push({
                name: myToDo,
                id: id,
                done: false,
                trash: false
            });
            // add item to local storage (this code must be added where the LIST array is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;
        }
        input.value = '';
    }
});


// addToDo('Coffee', 1, true, false)
// Complete ToDo List
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items dunamically

list.addEventListener('click', event => {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob === 'complete') {
        completeToDo(element)
    } else if (elementJob == 'delete') {
        removeToDo(element)
    }
    // add item to local storage (this code must be added where the LIST array is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST))
})