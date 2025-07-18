import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useState } from "react";

export default function Board({ board, onUpdate }) {
  const [newColName, setNewColName] = useState("");

  const addColumn = () => {
    if (!newColName.trim()) return;
    const newCol = { id: Date.now().toString(), title: newColName, tasks: [] };
    onUpdate({ ...board, columns: [...board.columns, newCol] });
    setNewColName("");
  };

  const deleteColumn = (colId) => {
    onUpdate({ ...board, columns: board.columns.filter(c => c.id !== colId) });
  };

  const updateColumnTasks = (colId, newTasks) => {
    const newCols = board.columns.map(c => c.id === colId ? { ...c, tasks: newTasks } : c);
    onUpdate({ ...board, columns: newCols });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = board.columns.find(c => c.id === source.droppableId);
    const destCol = board.columns.find(c => c.id === destination.droppableId);
    const [moved] = sourceCol.tasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.tasks.splice(destination.index, 0, moved);
      updateColumnTasks(sourceCol.id, [...sourceCol.tasks]);
    } else {
      destCol.tasks.splice(destination.index, 0, moved);
      updateColumnTasks(sourceCol.id, [...sourceCol.tasks]);
      updateColumnTasks(destCol.id, [...destCol.tasks]);
    }
  };

  return (
    <>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Nova coluna..."
          value={newColName}
          onChange={(e) => setNewColName(e.target.value)}
        />
        <button className="btn btn-success" onClick={addColumn}>+ Coluna</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="d-flex flex-nowrap overflow-auto gap-3">
          {board.columns.map(col => (
            <Column
              key={col.id}
              column={col}
              onDelete={() => deleteColumn(col.id)}
              onUpdateTasks={(tasks) => updateColumnTasks(col.id, tasks)}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
