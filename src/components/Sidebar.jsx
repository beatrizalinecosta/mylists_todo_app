export default function Sidebar({
    boards,
    activeBoardId,
    onSelectBoard,
    onDeleteBoard,
    newBoardName,
    setNewBoardName,
    onAddBoard,
  }) {
    return (
      <div className="border-end p-3 bg-white" style={{ width: 250 }}>
        <h5>Minhas Listas</h5>
        <div className="list-group mb-3">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${board.id === activeBoardId ? "active" : ""}`}
              onClick={() => onSelectBoard(board.id)}
              style={{ cursor: "pointer" }}
            >
              <span>{board.name}</span>
              <button className="btn-close btn-sm" onClick={(e) => { e.stopPropagation(); onDeleteBoard(board.id); }}></button>
            </div>
          ))}
        </div>
        <input
          className="form-control mb-2"
          placeholder="Nova lista..."
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={onAddBoard}>
          + Criar Lista
        </button>
      </div>
    );
  }
  