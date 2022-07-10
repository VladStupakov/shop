import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  width: 20vw;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 20px;
`

const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`

const Star = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #${props => props.filled? '000' : 'ccc'};
  display: flex;
`

const RatingForm = () => {

  const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(0);

  return (
    <Container>
      <StarsContainer>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <Star
              type="button"
              key={index}
              filled={index <= (hover || rating) ? true : false}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <div>&#9733;</div>
            </Star>
          );
        })}
      </StarsContainer>
      <TextField id="comment" label="Leave a comment..." variant="outlined" sx={{ marginBottom: '5px' }} multiline/>
      <Button variant="contained" endIcon={<SendIcon />} >
        Send
      </Button>
    </Container>
  )
}

export default RatingForm