function addTasks(list,name_task){
    const task = document.createElement('div');
    const taskName   = document.createElement('li');
    taskName.innerHTML = name_task
    console.log(taskName.innerHTML);
    if(taskName.innerHTML !== ''){
        const check = document.createElement('input');
        const label = document.createElement('label');
        check.type = 'checkbox';
        check.className = 'form-check-input';

        //<input type="checkbox" name="isDone">
        task.appendChild(label);
        label.appendChild(check);
        label.appendChild(taskName);
        addButtons(task);
        list.appendChild(task);
    }
}

function addButtons(x){
    const save = document.createElement('button');
    save.innerHTML = 'Save';
    save.className = 'save btn btn-success m-1 ml-2';
    const edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    edit.className = 'edit btn btn-outline-primary m-1';
    const del = document.createElement('button');
    del.innerHTML = 'Delete';
    del.className = 'delete btn btn-danger m-1';
    x.appendChild(save);
    x.appendChild(edit);
    x.appendChild(del);
}

document.addEventListener('DOMContentLoaded',function(){
    const list = document.getElementById('list');
    
    if(!localStorage.getItem('tasks')){
        localStorage.setItem('tasks', "[]")
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // console.log('Local Storage '+ localStorage.getItem('tasks'));

    for(i = 0; i < tasks.length;i++){
        console.log(tasks[i]);
        addTasks(list, tasks[i]);
    }
    
    document.getElementById('new').onclick = function(){
        taskName = prompt('Enter your task')
        addTasks(list, taskName);
    };

    list.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const text = event.target.parentElement;
            const deletedText = text.querySelector('li').innerHTML;
            const delIndex = tasks.indexOf(deletedText);
            tasks.splice(delIndex,1);
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
            event.target.parentElement.remove();
        }
    });
    
    list.addEventListener('click',function(event){
        if(event.target.classList.contains('edit')){
            const text = event.target.parentElement;
            const newText = text.querySelector('li');
            const oldText = newText.innerHTML;

            const editIndex = tasks.indexOf(oldText);
            
            newText.innerHTML = prompt('Enter your task');
            tasks[editIndex] = newText.innerHTML;

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
    
    list.addEventListener('click',function(event){
        if(event.target.classList.contains('save')){
            const text = event.target.parentElement;
            const savedText = text.querySelector('li').innerHTML;
            console.log(savedText);

            tasks.push(savedText);
            event.target.style.display = 'none';
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    list.addEventListener('change', function(event){
        if(event.target.type == 'checkbox'){
            const item = event.target.nextSibling;
            if(event.target.checked){
                const text = item.innerHTML;
                item.innerHTML = `<del>${text}</del>`
            }else{
                const dele = item.querySelector('del');
                const text = dele.innerHTML;
                item.innerHTML  = text;
            }
        }
    });
});