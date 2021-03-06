var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};
console.log(data);

//remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <style type="text/css"> .st1{fill:#c0cecb}</style> <g> <g> <path class="st1" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3 c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9 C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7 c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2 c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="st1" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="st1" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/> </g> <g> <path class="st1" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8 C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g> </svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <style type="text/css"> .st3{fill:none;}.st2{fill:#00A388;}</style> <rect y="0" class="st3" width="22" height="22"/> <g> <path class="st2" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>';

renderTodoList();

//user clicked on the add button
//if there is any text inside the text to the todo list
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);
    }
});

document.getElementById('item').addEventListener('keydown', function(e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemTodo(value);
    document.getElementById('item').value = '';
    data.todo.push(value);
    dataObjectUpdate();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;
    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemTodo(value);
    }
    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[i];
        addItemTodo(value, true);
    }
}

function dataObjectUpdate() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdate()
    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdate();

    //Check if the item should be added to completed list or to re-add to the todo list
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}

//add items to the todo list

function addItemTodo(text, completed) {

    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    //Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    //Add click event for completeing the item
    complete.addEventListener('click', completeItem);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

// if is chrome then show mic icon
var isChrome = !!window.chrome && !!window.chrome.webstore;
var mic = document.getElementById('mic')
if (isChrome == true) {
    mic.style.display = "block";
}

var speechContainer = document.getElementById("speech-container");
var speechContainerClosebtn = document.getElementById("close");
var playAndPausebtn = document.getElementById("PP");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    var displayTrans = document.getElementById("display");


    displayTrans.textContent = transcript;

    var textarea = document.getElementById('speech');
    var clearTextareaBtn = document.getElementById('clear');

    if (e.results[0].isFinal) {
        textarea.value += transcript + " ";
        displayTrans.textContent = "Have More?";

        clearTextareaBtn.addEventListener("click", () => {
            textarea.value = "";
        })

        var doneTextareaBtn = document.getElementById('done');
        doneTextareaBtn.addEventListener('click', () => {
            if (textarea.value) {
                addItem(textarea.value);
            }
            speechContainer.style.bottom = "100%";
            speechContainer.style.right = "100%";
            textarea.value = "";
            recognitionStop()
        })
    }

});
var listenBtn = document.getElementById("listen");

listenBtn.addEventListener("click", ()=>{
    recognitionStop();
    console.log("SOORRY! The features is currently not available");
    
    playBtn.style.opacity = "1";
    pauseBtn.style.opacity = "0";
})
function recognitionStop() {
    recognition.stop();
    recognition.onend = recognition.stop;
}
function recognitionStart() {
    recognition.start();
    recognition.onend = recognition.start;
}

mic.addEventListener("click", (e) => {
    speechContainer.style.bottom = "0";
    speechContainer.style.right = "0";
    speechContainer.style.opacity = "1";
    playBtn.style.opacity = "0";
    pauseBtn.style.opacity = "1 ";
    recognitionStart()
})

speechContainerClosebtn.addEventListener("click", (e) => {
    speechContainer.style.bottom = "100%";
    speechContainer.style.right = "100%";
    speechContainer.style.opacity = "0";
    recognitionStop()

})
var playBtn = document.getElementById("play");
var pauseBtn = document.getElementById("pause");

playAndPausebtn.addEventListener("click", (e)=>{
    if (playBtn.style.opacity === "0") {
        playBtn.style.opacity = "1";
        pauseBtn.style.opacity = "0";
        recognitionStop()
    }else{
        playBtn.style.opacity = "0";
        pauseBtn.style.opacity = "1 ";
        recognitionStart()
    }
})

