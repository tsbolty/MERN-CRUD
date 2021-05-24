import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function App() {
	const [text, setText] = useState({
		title: "",
		body: ""
	});
	const [allItems, setAllItems] = useState([]);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		getAllItems();
	}, []);

	const getAllItems = async () => {
		const res = await fetch("/api/test/read");
		const data = await res.json();
		setAllItems(data);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setText({ ...text, [name]: value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await fetch("/api/test/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(text)
			});
			alert("successfully created item");
			setText({ title: "", body: "" });
			getAllItems();
		} catch (err) {
			alert("something went wrong creating that item: ", err);
		}
	};
	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		console.log("hit update submit function");
		if (text.title.length && text.body.length) {
			try {
				await fetch(`/api/test/update/${text.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(text)
				});
				setUpdating(false);
				setText({ title: "", body: "" });
				getAllItems();
				alert("you updated that note");
			} catch (err) {
				alert("something went wrong with that update:", err);
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`/api/test/delete/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			alert("Item deleted");
			getAllItems();
		} catch (err) {
			alert("something went wrong with that delete: ", err);
		}
	};

	const updateItem = async (title, body, id) => {
		setText({ title, body, id });
		setUpdating(true);
	};

	const styles = {
		input: {
			marginTop: "3vh"
		},
		button: {
			marginTop: "3vh"
		}
	};

	return (
		<div className='container'>
			<form>
				<InputGroup size='lg' style={styles.input}>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>Title</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label='Large'
						name='title'
						value={text.title}
						onChange={handleInputChange}
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<InputGroup size='lg' style={styles.input}>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>Body</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						aria-label='Large'
						value={text.body}
						name='body'
						onChange={handleInputChange}
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<Button
					variant='primary'
					style={styles.button}
					onClick={(e) =>
						updating ? handleUpdateSubmit(e) : handleFormSubmit(e)
					}>
					Submit
				</Button>
			</form>
			<br />
			<ul style={{ listStyle: "none" }}>
				{allItems.map((item) => (
					<li key={item._id}>
						<h5>{item.title}</h5>
						<p>{item.body}</p>
						<button
							onClick={(e) => updateItem(item.title, item.body, item._id)}>
							Update
						</button>
						<button onClick={(e) => handleDelete(item._id)}>Delete</button>
						<hr />
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
