import { Todo } from '../classes';
import { todoList } from '..';
import '../css/componentes.css';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
export const countTodo = document.querySelector('.todo-count'); 

export const crearTodoHTML = (todo) =>{
    const HTMLTodo =    
    `<li class="${todo.completado? 'completed' : ''}" data-id=${todo.id}>
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado? 'checked':''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div =  document.createElement('div');
    div.innerHTML = HTMLTodo;
    divTodoList.append(div);
    return div;
}

txtInput.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13 && txtInput.value.length>0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        console.log(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento.parentElement);    
    }
});

btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i>=0 ; i--){
        const elemento = divTodoList.children[i];
        if(elemento.querySelector('.completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilter.addEventListener('click', (event)=>{
    const filtro = event.target.text;
    if(!filtro){
        return;
    }
    anchorFiltros.forEach(elem=>elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.querySelector('.completed');
        switch(filtro){
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                    break;
                }
                break;

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                    break;
                }
                break;

            default :
            break;
        }
    }
});