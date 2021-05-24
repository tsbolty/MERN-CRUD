import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import API from "./API";

function App() {
	const [items, setItems] = useState({
		text: {
			title: "",
			body: ""
		},
		allItems: [],
		updating: false
	});

	useEffect(() => {
		getAllItems();
	}, []);

	const getAllItems = async () => {
		const res = await API.getAllItems();
		const data = await res.json();
		setItems({
			...items,
			allItems: data,
			updating: false,
			text: { title: "", body: "" }
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setItems({ ...items, text: { ...items.text, [name]: value } });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.postItem(items.text);
			alert("successfully created item");
			setItems({ ...items, text: { title: "", body: "" } });
			getAllItems();
		} catch (err) {
			alert("something went wrong creating that item: ", err);
		}
	};
	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		if (items.text.title.length && items.text.body.length) {
			try {
				await API.updateItem(items.text);
				// setItems({ ...items, updating: false, text: { title: "", body: "" } });
				getAllItems();
				alert("you updated that note");
			} catch (err) {
				alert("something went wrong with that update:", err);
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await API.deleteItem(id);
			alert("Item deleted");
			getAllItems();
		} catch (err) {
			alert("something went wrong with that delete: ", err);
		}
	};

	const updateItem = async (title, body, id) => {
		setItems({ ...items, text: { title, body, id }, updating: true });
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
						value={items.text.title}
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
						value={items.text.body}
						name='body'
						onChange={handleInputChange}
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<Button
					variant='primary'
					style={styles.button}
					onClick={(e) =>
						items.updating ? handleUpdateSubmit(e) : handleFormSubmit(e)
					}>
					{items.updating ? "Update" : "Submit"}
				</Button>
			</form>
			<br />
			<ul style={{ listStyle: "none" }}>
				{items.allItems.map((item) => (
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
