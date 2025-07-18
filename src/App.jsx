import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [newBoardName, setNewBoardName] = useState("");

  const addBoard = () => {
    if (!newBoardName.trim()) return;
    const newBoard = {
      id: Date.now(),
      name: newBoardName,
      columns: [],
    };
    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
    setNewBoardName("");
  };

  const deleteBoard = (id) => {
    setBoards(boards.filter(b => b.id !== id));
    if (id === activeBoardId) setActiveBoardId(null);
  };

  const updateBoard = (updatedBoard) => {
    setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
  };

  const activeBoard = boards.find(b => b.id === activeBoardId);

  return (
    <div className="d-flex vh-100">
      <Sidebar
        boards={boards}
        activeBoardId={activeBoardId}
        onSelectBoard={setActiveBoardId}
        onDeleteBoard={deleteBoard}
        newBoardName={newBoardName}
        setNewBoardName={setNewBoardName}
        onAddBoard={addBoard}
      />
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        {activeBoard ? (
          <Board board={activeBoard} onUpdate={updateBoard} />
        ) : (
          <div className="text-center text-muted mt-5">Nenhuma lista selecionada.</div>
        )}
      </div>
    </div>
  );
}
