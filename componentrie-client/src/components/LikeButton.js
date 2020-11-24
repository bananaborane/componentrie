import React from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'
 


function LikeButton() {

    const likeButton = !authenticated ? (<MyButton>
        
    </MyButton>) : (<MyButton>

    </MyButton>)

    return (
        return LikeButton;
    )
}

export default LikeButton
