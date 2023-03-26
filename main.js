/* 
1) An event listener to wait until all of the HTML is fully loaded before we attempt to manipulate it- prevents error whereby form cannot be found. 
2) Declare three variables: form (selects DOM element form), tasklist, and tasks (an array to store our tasks in storage).

3) Check to see if a previous session has saved tasks already.  
    - If True: parse the stored JSON object to become a JS object.
    - then we loop through each object within the list tasks array
    - We create a local taskItem which is an empty instance of a li 
    - We then set the context paremeter to equal the stored JSON value
    - Then we append our li object back to the taskList

4) Waits for submission of the form: 
    - When event takes place textInput is the actual html element itself & task is then asigned to be equal to value of the task input. 
    - like above, we then create a new li html object and append the value of task to it's textContent parameter.
    - We lastly then append the item to a list of of tasks to then later be displayed in full. This is after we've already checks for any previously saved tasks in local memory. 
    - We then add the task to the array of tasks and then convert our task item into JSON format for localStorage.
    - Lastly clear the variable taskInput as this is the text we've entered into the form for the next submission. 
*/

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); //querySelector selects DOM elements based on CSS selector- more flexible than getElementByID/etc, 
    const taskList = document.querySelector('#task-list');
    let tasks = [];
  
    //Check if tasks exist already in local storage, if True append them to ul as li 
    if(localStorage.getItem('tasks')){
        // Retrieve tasks from local storage and parse them as JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
      
        // Loop through the previously parsed tasks object and create a list item for each one
        for(const task of tasks){
          const taskItem = document.createElement('li');
          taskItem.textContent = task;
          taskList.appendChild(taskItem);
        }
      }
  
    form.addEventListener('submit', (event) => {
        event.preventDefault(); //precents the default functionality of the submit button
        console.log('This is working');
        
        const taskInput = document.getElementById('action');
        const task = taskInput.value;

        if(!task){
            console.log('NULL VAL');
            return;
        }
      
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
      
        // add the new task to the tasks array and store it in local storage
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      
        taskInput.value = '';
      });

      form.addEventListener('reset', (event) => {
        event.preventDefault();

        // remove all tasks from the tasks array
        tasks = [];
        taskList.innerHTML = '';
      });

  });
  