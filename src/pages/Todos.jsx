import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";

const Todos = () => {
    // Refs สำหรับ Modal input
    const newidRef = useRef();
    const newtitleRef = useRef();

    // State
    const [todosRaw, setTodosRaw] = useState([]);
    const [todos, setTodos] = useState([]);
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [itemsPerPages, setItemsPerPages] = useState(5);
    const [numPages, setNumPages] = useState(1);
    const [curPages, setCurPages] = useState(1);

    const [show, setShow] = useState(false);

    // Fetch todos ตอน load
    useEffect(() => {
        setTodosRaw(fetchTodos());
    }, []);

    // Filter todos
    useEffect(() => {
        if (onlyWaiting) setTodos(todosRaw.filter((todo) => !todo.completed));
        else setTodos(todosRaw);
    }, [todosRaw, onlyWaiting]);

    // Pagination
    useEffect(() => {
        setNumPages(Math.ceil(todos.length / itemsPerPages) || 1);
    }, [todos, itemsPerPages]);

    useEffect(() => {
        if (curPages > numPages) setCurPages(numPages);
        else if (curPages <= 0) setCurPages(1);
    }, [numPages]);

    // Handlers
    const waitingClicked = (id) => {
        const found = todos.find((todo) => todo.id === id);
        if (found) found.completed = true;
        setTodosRaw([...todosRaw]);
    };

    const deleteClicked = (id) => {
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClicked = (id, title) => {
        if (title.trim() !== "") {
            const newTodo = {
                userId: 1,
                id: Number(id),
                title: title.trim(),
                completed: false
            };
            setTodosRaw([...todosRaw, newTodo]);
        } else {
            alert("Please enter a title!");
            return;
        }

        // ล้างค่า input
        newidRef.current.value = "";
        newtitleRef.current.value = "";

        handleClose();
    };

    return (
        <>
            {/* Modal Add Todo */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                defaultValue={todosRaw.reduce((prev, todo) => (todo.id > prev ? todo.id : prev), -1) + 1}
                                disabled
                                ref={newidRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                placeholder="New Todos, Here!"
                                autoFocus
                                ref={newtitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => saveClicked(number(newidRef.current.value), newtitleRef.current.value)}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Filter */}
            <Form className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={onlyWaiting}
                            onChange={(e) => setOnlyWaiting(e.target.checked)}
                        />
                        Show only&nbsp;
                        <button className="btn btn-warning btn-sm">
                            Waiting &nbsp; <i className="bi bi-clock"></i>
                        </button>
                    </div>

                    <Form.Select
                        className="w-25"
                        value={itemsPerPages}
                        onChange={(e) => setItemsPerPages(Number(e.target.value))}
                    >
                        <option value={5}>5 items per page</option>
                        <option value={10}>10 items per page</option>
                        <option value={50}>50 items per page</option>
                        <option value={100}>100 items per page</option>
                    </Form.Select>
                </div>
            </Form>

            {/* Table */}
            <div>
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: "3rem" }}>ID</th>
                            <th className="text-center">Title</th>
                            <th className="text-end" style={{ width: "12rem" }}>
                                Completed &nbsp;
                                <button className="btn btn-primary" onClick={handleShow}>
                                    <span className="bi bi-plus-circle"></span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos
                            .filter((todo, index) => index >= (curPages - 1) * itemsPerPages && index <= curPages * itemsPerPages - 1)
                            .map((todo) => (
                                <tr key={todo.id}>
                                    <td className="text-center">
                                        <h5>
                                            <Badge bg="secondary">{todo.id}</Badge>
                                        </h5>
                                    </td>
                                    <td>{todo.title}</td>
                                    <td className="text-end">
                                        {todo.completed ? (
                                            <Badge bg="success" className="fs-6">done</Badge>
                                        ) : (
                                            <Button variant="warning" onClick={() => waitingClicked(todo.id)}>
                                                waiting&nbsp;<i className="bi bi-clock"></i>
                                            </Button>
                                        )}
                                        &nbsp;
                                        <Button variant="danger" onClick={() => deleteClicked(todo.id)}>
                                            <i className="bi bi-trash3-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="text-center mt-3">
                <Button variant="outline-primary" onClick={() => setCurPages(1)} disabled={curPages === 1}>
                    First
                </Button>{" "}
                <Button variant="outline-primary" onClick={() => setCurPages((p) => Math.max(p - 1, 1))} disabled={curPages === 1}>
                    Previous
                </Button>{" "}
                <span>{curPages} / {numPages}</span>{" "}
                <Button variant="outline-primary" onClick={() => setCurPages((p) => Math.min(p + 1, numPages))} disabled={curPages === numPages}>
                    Next
                </Button>{" "}
                <Button variant="outline-primary" onClick={() => setCurPages(numPages)} disabled={curPages === numPages}>
                    Last
                </Button>
            </div>
        </>
    );
};

export default Todos;
