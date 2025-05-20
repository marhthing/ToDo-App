import { useState } from "react";

function ToDo() {
    const [list, setList] = useState([]);
    const [input, setInput] =  useState('');
    const [editIndex, setEditIndex] = useState(null)
    const [edit, setEdit] = useState('');

    function add(){
        if (input.trim() == '') return; //for empty value
        setList([...list, input]); //add the new input to list
        setInput(''); //Empthy the text back
    }

    function toDelete(pDelete){
        const newList = list.filter((_, index) => index !== pDelete)
        setList(newList); //update list

    }

    function toEdit(index){
        setEditIndex(index);
        setEdit(list[index]) ;
    }

    function toSave(listToSave){
        const updatedList = [...list];
        updatedList[listToSave] = edit;
        setList(updatedList);
        setEditIndex(null);
        setEdit('');
    }

        function toCancel(index){
            setEditIndex(null);
        }

  return (
    <>
      <h1>To do list</h1>
      <input 
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)} />
      <button onClick={add}>Add</button>

      <ul>
        {list.map((list, index) => (
        <li key={index}>
            {editIndex === index ? (
            <>
                <input 
                type="text"
                value={edit}
                onChange={e => setEdit(e.target.value)} />

                <button onClick={() => toSave(index)}>Save</button>
                <button onClick={() => toCancel(index)}>Cancel</button>
            </>
        ) : ( 
            <>
            {list}{' '} 
        <button onClick={() => toDelete(index)}> Delete</button>
        <button onClick={() => toEdit(index)}>Edit</button>
            </>
        )}
        </li>
        ))}
        </ul>
    </>
  );
}

export default ToDo;
