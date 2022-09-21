import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

function HomeTodo() {

    const [todos, setTodos] = useState(() => {

        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });

    const [todo, setTodo] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [currentTodo, setCurrentTodo] = useState({});


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);



    function handleInputChange(e) {
        setTodo(e.target.value);
    }

    function handleEditInputChange(e) {
        setCurrentTodo(
            {
                ...currentTodo,
                text: e.target.value
            }
        );
        console.log(currentTodo);
    }


    function handleFormSubmit(e) {
        e.preventDefault();

        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }
            ]);
        }

        setTodo("");
    }



    function handleEditFormSubmit(e) {
        e.preventDefault();
        handleUpdateTodo(currentTodo.id, currentTodo);
    }

    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({
            ...todo
        });
    }

    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="card m-5">
                        <div className="card-header bg-success text-white">
                            <h2>To-do List Task</h2>
                        </div>
                        <div className="card-body bg-light">

                            {isEditing ? (

                                <form onSubmit={handleEditFormSubmit}>
                                    <h4>Edit Task</h4>

                                    <input
                                        name="editTodo"
                                        type="text"
                                        placeholder="Edit To-do Item"
                                        className="form-control"
                                        value={currentTodo.text}
                                        onChange={handleEditInputChange}
                                    />
                                    <button className="btn btn-success mt-2" type="submit">Update</button> &nbsp;
                                    <button className="btn btn-danger mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                </form>

                            ) : (

                                <form onSubmit={handleFormSubmit}>

                                    <input
                                        name="todo"
                                        type="text"
                                        placeholder="Enter Task & Press Enter or Click"
                                        className="form-control"
                                        value={todo}
                                        onChange={handleInputChange}
                                    />
                                    <button className="btn btn-success mt-2 px-4" type="submit">Add to List</button>
                                </form>
                            )}

                        </div>
                        <div className="card-footer bg-light">
                            <table className="table table-hover table-light">
                                <tbody>
                                    {
                                        todos.map((todo) => (
                                            <tr key={todo.id}>
                                                <td colSpan={5}>
                                                    {todo.text}
                                                </td>

                                                <td className="text-end">
                                                    <button className="btn btn-success" onClick={() => handleEditClick(todo)}>Edit</button>
                                                    &nbsp;
                                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
}

export default HomeTodo