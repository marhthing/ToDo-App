import { useState } from "react";

function ToDo() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState('');

  function add() {
    if (input.trim() === '') return;
    setList([...list, input.trim()]);
    setInput('');
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      add();
    }
  }

  function handleEditKeyPress(e, index) {
    if (e.key === 'Enter') {
      toSave(index);
    } else if (e.key === 'Escape') {
      toCancel();
    }
  }

  function toDelete(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    // Reset edit state if we're deleting the item being edited
    if (editIndex === index) {
      setEditIndex(null);
      setEdit('');
    }
  }

  function toEdit(index) {
    setEditIndex(index);
    setEdit(list[index]);
  }

  function toSave(index) {
    if (edit.trim() === '') return;
    const updatedList = [...list];
    updatedList[index] = edit.trim();
    setList(updatedList);
    setEditIndex(null);
    setEdit('');
  }

  function toCancel() {
    setEditIndex(null);
    setEdit('');
  }

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <h1 className="todo-title">📝 My To-Do List</h1>
        
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button 
              className="add-btn"
              onClick={add}
              disabled={!input.trim()}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="todo-list">
          {list.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add one above! ✨</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div key={index} className="todo-item">
                {editIndex === index ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      className="edit-input"
                      value={edit}
                      onChange={(e) => setEdit(e.target.value)}
                      onKeyPress={(e) => handleEditKeyPress(e, index)}
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button 
                        className="save-btn"
                        onClick={() => toSave(index)}
                        disabled={!edit.trim()}
                      >
                        ✓
                      </button>
                      <button 
                        className="cancel-btn"
                        onClick={toCancel}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="view-mode">
                    <span className="task-text">{item}</span>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => toEdit(index)}
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => toDelete(index)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {list.length > 0 && (
          <div className="todo-stats">
            <p>{list.length} task{list.length !== 1 ? 's' : ''} total</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDo;