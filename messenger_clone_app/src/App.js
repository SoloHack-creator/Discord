import React, { useState, useEffect } from 'react'
import './App.css'
import { FormControl, Input } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import { IconButton } from '@material-ui/core'

function App() {
  const [input, setInput] = useState('')

  const [messages, setMessages] = useState([])

  const [username, setUsername] = useState('')

  useEffect(() => {
    //this will run when app component load
    //all document are in snapshot

    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please Enter usename'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    db.collection('messages').add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    // setMessages([
    //   ...messages, {username:username,text:input}]);
    setInput('')
  }
  console.log({ username })
  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=50&h=50'
        alt=''
      ></img>

      <h2>Welcome {username}</h2>

      <form className='app__form'>
        <FormControl className='app__formcontrol'>
          <Input placeholder='Enter a message.. '> </Input>
          <Input
            className='app__input'
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
            }}
          ></Input>

          <IconButton
            className='app__iconbutton'
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>

          {/* onclick we are giving reference to the method-sendMessage */}
          {/* <Button  disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button> */}
        </FormControl>
      </form>
      <FlipMove>
        {
          //destructuring ({id:doc.id,message:doc.data()})
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message}></Message>
          ))
        }
      </FlipMove>
    </div>
  )
}

export default App
