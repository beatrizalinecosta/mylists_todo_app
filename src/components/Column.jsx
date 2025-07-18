import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useState } from "react";

export default function Column({ column, onDelete, onUpdateTasks }) {
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = { id: Date.now().toString(), text: newTaskText };
    onUpdateTasks([...column.tasks, newTask]);
    setNewTaskText("");
  };

  const deleteTask = (taskId) => {
    onUpdateTasks(column.tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="card" style={{ minWidth: 250 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="card-title mb-0">{column.title}</h6>
          <button className="btn-close btn-sm" onClick={onDelete}></button>
        </div>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mb-2">
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="mb-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard task={task} onDelete={() => deleteTask(task.id)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="d-flex">
          <input
            className="form-control me-2"
            placeholder="Nova tarefa..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={addTask}>+</button>
        </div>
      </div>
    </div>
  );
}
