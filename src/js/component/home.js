import React, { useState } from "react";
import PropTypes from "prop-types";

export function Home() {
	const [todos, setTodos] = useState([]);

	const [value, setValue] = useState("");

	const onValueChange = ({ target: { value } }) => {
		setValue(value);
	};

	const Todo = ({ todo, handleCheckboxChange, deleteTodo }) => (
		<li key={todo.id}>
			<input
				type="checkbox"
				checked={todo.status}
				onChange={() => handleCheckboxChange(todo.id)}
			/>
			<label>{todo.name}</label>
			<button className="delete" onClick={() => deleteTodo(todo.id)}>
				Delete
			</button>
		</li>
	);

	const addTodo = () => {
		if (value !== "") {
			setTodos([
				...todos,
				{
					name: value,
					status: false,
					id: Date.now() + Math.random()
				}
			]);
			setValue("");
		}
	};

	const handleKeyPress = ({ key }) => {
		if (key === "Enter") {
			addTodo();
		}
	};

	const handleCheckboxChange = id => {
		setTodos(
			todos.map(todo => {
				if (todo.id === id) return { ...todo, status: !todo.status };
				return todo;
			})
		);
	};

	const deleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	return (
		<div className="container">
			<p>
				<label>Add Item</label>
				<input
					id="new-task"
					type="text"
					value={value}
					name="todoField"
					onKeyDown={handleKeyPress}
					onChange={onValueChange}
				/>
				<button onClick={addTodo}>Add</button>
			</p>

			<h3>Todo</h3>
			<ul id="incomplete-tasks">
				{todos.filter(todo => !todo.status).map((todo, index) => (
					<Todo
						key={index}
						todo={todo}
						handleCheckboxChange={handleCheckboxChange}
						deleteTodo={deleteTodo}
					/>
				))}
			</ul>

			<h3>Completed</h3>
			<ul id="completed-tasks">
				{todos.filter(todo => todo.status).map((todo, index) => (
					<Todo
						key={index}
						todo={todo}
						handleCheckboxChange={handleCheckboxChange}
						deleteTodo={deleteTodo}
					/>
				))}
			</ul>
		</div>
	);
}

Home.propTypes = {
	todo: PropTypes.function,
	handleCheckboxChange: PropTypes.function,
	deleteTodo: PropTypes.function
};
