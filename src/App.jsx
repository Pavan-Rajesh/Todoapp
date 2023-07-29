import { useState } from "react";
import { v4 as uuid } from "uuid";

const Todo = () => {
  const [items, setItems] = useState([]);
  const [task, setTask] = useState("");
  function updateTask(e) {
    setTask(e.target.value);
  }

  function updateItems() {
    const newTask = { id: uuid(), task: task };
    localStorage.setItem(`${newTask.id}`, `${newTask.task}`);
    setItems([newTask, ...items]);
    setTask("");
  }

  function remove(id) {
    let newTodos = items.filter((x) => x.id !== id);
    localStorage.removeItem(`${id}`);
    setItems(newTodos);
  }
  return (
    <div>
      <input type="text" name="taskName" onChange={updateTask} value={task} />;
      <button type="button" onClick={updateItems}>
        addItem
      </button>
      <ul>
        {/* {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))} */}
        {/* <List items={items} remove={remove} /> */}
        {Object.keys(localStorage).map((x, index) => {
          return (
            <>
              <li key={index}>{localStorage.getItem(x)}</li>
              <button
                onClick={() => {
                  remove(x);
                }}
              >
                delete
              </button>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
