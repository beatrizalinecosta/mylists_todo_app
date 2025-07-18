export default function TaskCard({ task, onDelete }) {
    return (
      <div className="card card-body p-2 d-flex justify-content-between align-items-center">
        <span>{task.text}</span>
        <button className="btn-close btn-sm" onClick={onDelete}></button>
      </div>
    );
  }
  