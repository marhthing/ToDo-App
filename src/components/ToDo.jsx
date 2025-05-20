import { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup, InputGroup } from "react-bootstrap";

function ToDo() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState('');

  function add() {
    if (input.trim() === '') return;
    setList([...list, input]);
    setInput('');
  }

  function toDelete(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }

  function toEdit(index) {
    setEditIndex(index);
    setEdit(list[index]);
  }

  function toSave(index) {
    const updatedList = [...list];
    updatedList[index] = edit;
    setList(updatedList);
    setEditIndex(null);
    setEdit('');
  }

  function toCancel() {
    setEditIndex(null);
    setEdit('');
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">📝 To-Do List</h3>

          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="primary" onClick={add}>
              Add
            </Button>
          </InputGroup>

          <ListGroup>
            {list.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                {editIndex === index ? (
                  <Form.Control
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    className="me-2"
                  />
                ) : (
                  <span>{item}</span>
                )}

                <div>
                  {editIndex === index ? (
                    <>
                      <Button variant="success" size="sm" onClick={() => toSave(index)} className="me-2">
                        Save
                      </Button>
                      <Button variant="secondary" size="sm" onClick={toCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="warning" size="sm" onClick={() => toEdit(index)} className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => toDelete(index)}>
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ToDo;
