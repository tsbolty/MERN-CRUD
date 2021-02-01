import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import List from './components/List';

function App() {
  const [text, setText] = useState({
    title: '',
    body: ''
  });
  const [testItems, setTestItems] = useState([]);

  const getData = ()=> {
    return fetch('/api/test/read')
    .then(res =>{
      res.json()
    }).then(data =>{
      console.log(data)
      setTestItems(data || [])
    })
    .catch(err =>{
      console.error(err)
    })
  }

  useEffect(()=>{
    getData()
  }, [])

  const handleInputChange =  e =>{
    const { name, value } = e.target;
    setText({...text, [name]: value})
  }

  const handleFormSubmit = async e => {
    await fetch("/api/test/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    })
    setTestItems([...testItems, text])
    setText({title: "", body: ""})
  }

  const handleUpdate = id =>{
    console.log(id)
    fetch(`/api/test/get/${id}`)
      .then(res => {
        console.log(res)
        // setText({title: res.title, body: res.body})
      })
  }

  const handleDelete = id => {
    fetch(`/api/test/delete/${id}`)
      .then(res => {
        if (res.ok) {
          getData()
        }
      })
  }

  const styles = {
    input: {
      marginTop: '3vh'
    },
    button: {
      marginTop: '3vh'
    }
  }

  return (
    <>
    <div className='container' >
      <InputGroup size="lg" style={styles.input}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">Title</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label="Large" name='title' onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>
      <InputGroup size="lg" style={styles.input}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">Body</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label="Large" name='body' onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>
      <Button variant='primary' onClick={handleFormSubmit} style={styles.button}>Submit</Button>
    </div>
    <div className='container'>
      <ol>
      {testItems.map(item => <List key={item._id} title={item.title} body={item.body} id={item._id} handleUpdate={handleUpdate} handleDelete={handleDelete} />)}
      </ol>
    </div>
    </>
  );
}

export default App;
