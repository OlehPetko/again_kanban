import './App.css';
import {useState} from "react";

function App() {

    const statuses = ['todo', 'progress', 'review', 'done']
    const initialState = [
        {id: Math.random(), title: 'Dnipro', titleDone: true, status: statuses[0], openDelete: true, openDone: true, openUpdate: true},
        {id: Math.random(), title: 'Warszawa', titleDone: true, status: statuses[1], openDelete: true, openDone: true, openUpdate: true},
        {
            id: Math.random(),
            title: 'Liverpool',
            titleDone: true,
            status: statuses[2],
            openDelete: true,
            openDone: true,
            openUpdate: true
        },
        {
            id: Math.random(),
            title: 'Vancouver',
            titleDone: true,
            status: statuses[3],
            openDelete: true,
            openDone: true,
            openUpdate: true
        },
    ]
    const [cards, setCard] = useState(initialState)
    const [newInputTask, setNewInputTask] = useState([])
    const [updateInputTask, setUpdateInputTask] = useState([])
    const addNewTask = () => {
        const newTask = [...cards, {
            id: Math.random(),
            title: newInputTask,
            status: statuses[0],
            openDelete: true,
            openDone: true
        }]
        setCard(newTask)
        setNewInputTask([])
    }
    const openDelete = (taskId) => {
        const newTask = cards.map(el => el.id === taskId ? {...el, openDelete: !el.openDelete} : el)
        setCard(newTask)
    }
    const deleteTask = (taskId) => {
        const newTask = cards.filter(el => el.id !== taskId)
        setCard(newTask)
    }
    const openUpdate = (taskId) => {
        const newTask = cards.map(el => el.id === taskId ? {...el, openUpdate: !el.openUpdate} : el)
        setCard(newTask)
    }
    const updateTask = (taskId) => {
      const newTask = cards.map(el => el.id === taskId ? {...el, openUpdate: !el.openUpdate, title: updateInputTask} : el)
        setCard(newTask)
        setUpdateInputTask([])
    }
    const moveRightLeftTask = (taskId, value) => {
      const newTask = cards.map(el => el.id == taskId ?
          {...el, status: statuses[statuses.indexOf(el.status) + value]} : el)
        setCard(newTask)
    }
    const openDone = (taskId) => {
      const newTask = cards.map(el => el.id === taskId ? {...el, openDone: !el.openDone,
          title: "READY"} : el)
        setCard(newTask)
    }

    return (
        <div className="App">
            <input placeholder='if you want add new task please' value={newInputTask}
                   onChange={e => setNewInputTask(e.target.value)}/>
            <button onClick={addNewTask}>add new task</button>
            {statuses.map(status =>
                <div>
                    <h1>{status}</h1>
                    <hr/>
                    {cards.filter(card => card.status === status).map(card =>
                        <div>
                            <button disabled={card.status === 'todo'} onClick={() => moveRightLeftTask(card.id, - 1)}>up</button>
                            <h3>{card.title}</h3>
                            <button disabled={card.status === 'done'} onClick={() => moveRightLeftTask(card.id, + 1)}>down</button>
                            <div>
                                {card.openDelete ?
                                    <div>
                                        <input type="checkbox" onClick={() => openDone(card.id)}/>
                                        <button onClick={() => openDelete(card.id)}>delete task</button>
                                        {card.openUpdate ?
                                            <button onClick={() => openUpdate(card.id)}>update task</button>
                                            :
                                            <div>
                                                <input placeholder='update task' value={updateInputTask}
                                                       onChange={e => setUpdateInputTask(e.target.value)}/>
                                                <button onClick={() => updateTask(card.id)}>save</button>
                                                <button  onClick={() => openUpdate(card.id)}>cancel</button>
                                            </div>
                                        }
                                        <button onClick={() => openDone(card.id)}>{card.openDone ? 'done task' : 'task is ready'}</button>
                                    </div>
                                    :
                                    <div>
                                        <label> DO YOU SURE? </label>
                                        <button onClick={() => deleteTask(card.id)}>YES I AM SURE</button>
                                        <label> OR </label>
                                        <button onClick={() => openDelete(card.id)}>CANCEL</button>
                                    </div>
                                }
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
