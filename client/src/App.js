import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function App() {
  const [text, setText] = useState({
    title: '',
    body: ''
  })

  const handleInputChange =  e =>{
    const { name, value } = e.target;
    setText({...text, [name]: value})
  }

  const handleFormSubmit = async e => {
    await fetch('/api/test/create', {
      method: 'POST',
      body: text
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
  );
}

export default App;
