
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])


  const handleSubmit = () => {
    event.preventDefault();
    const form = event.target
    const email = form.email.value;
    const name = form.name.value;
    const data = { email, name }
    console.log(data);

    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUser = [...user, data]
        setUser(newUser)
        form.reset()
      })
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder='Name' />
        <br />
        <input type="email" name="email" placeholder='Email' />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h1>User Management</h1>
      <h2>Total Users : {user.length}</h2>
      {
        user.map(data=><p key={data.id}> {data.id} : {data.name} : {data.email}</p>)
      }
    </>
  )
}

export default App
