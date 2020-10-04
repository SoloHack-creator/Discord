import {Card,CardContent,Typography} from '@material-ui/core'
import React, {forwardRef} from 'react';
import './Message.css'

const Message = forwardRef(({ message,username}, ref) => {
    //forwardRef is a higher  order function and is used to track all movement inside the function component
    const iUser = username === message.username;
    return ( <div ref = {ref}className = {`message ${iUser &&  'message__user'}`} >
        <Card className = {iUser ? "message__userCard" : "message__guestCard"} >
        
       <CardContent>
        
        <Typography color = "white" variant = "h5" component = "h2">
        {!iUser && `${message.username || "Unknown User "}:`} { message.text} 
        </Typography>

        </CardContent>

        </Card> 
        </div>

    )
})

export default Message