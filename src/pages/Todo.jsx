import React, { useState, useEffect } from "react";

export default function Todo() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        if (editId !== null) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editId ? { ...todo, text: input } : todo
                )
            );
            setEditId(null);
        } else {
            const newTodo = { id: Date.now(), text: input, completed: false };
            setTodos([...todos, newTodo]);
        }
        setInput("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleEdit = (todo) => {
        setInput(todo.text);
        setEditId(todo.id);
    };

    const clearAll = () => setTodos([]);

    const filteredTodos =
        filter === "all"
            ? todos
            : filter === "completed"
                ? todos.filter((todo) => todo.completed)
                : todos.filter((todo) => !todo.completed);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6">
            <h1 className="text-4xl text-white font-bold mb-8">To-Do App</h1>

            <form onSubmit={handleSubmit} className="flex w-full max-w-md mb-6 gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 p-3 rounded-lg outline-none border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                />
                <button
                    type="submit"
                    className="bg-teal-500 px-5 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors cursor-pointer"
                >
                    {editId !== null ? "Update" : "Add"}
                </button>
            </form>

            <div className="flex gap-3 mb-6 cursor-pointer">
                {["all", "completed", "pending"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${filter === f
                                ? "bg-teal-500 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-md flex flex-col gap-3">
                {filteredTodos.length === 0 && (
                    <p className="text-gray-400 text-center">No tasks found.</p>
                )}

                {filteredTodos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                className="w-5 h-5 accent-teal-500"
                            />
                            <span
                                className={`${todo.completed ? "line-through text-gray-400" : "text-white"
                                    }`}
                            >
                                {todo.text}
                            </span>
                        </div>

                        <div className="flex gap-5">
                            <button
                                onClick={() => handleEdit(todo)}
                                className="text-blue-400 hover:text-blue-300 cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {todos.length > 0 && (
                <button
                    onClick={clearAll}
                    className="mt-6 bg-red-500 cursor-pointer px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                    Clear All
                </button>
            )}
        </div>
    );
}
