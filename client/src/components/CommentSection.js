import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 2px solid lightgrey;
`

const Comment = styled.div`
    margin: 5px;
    padding: 5px;
    display: flex;
    border: 1px solid lightgray;
    flex-direction: column;

`
const UserName = styled.div`
    font-size: 14px;
`

const StarsContainer = styled.div`
  display: flex;

`

const Star = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  color: #${props => props.filled ? '000' : 'ccc'};
  display: flex;
`
const Text = styled.div`
    font-size: 20px;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
`
const CommentSection = ({ comments }) => {

    return (
        comments?.length !== 0 &&
        <Container>
            {
                comments?.map(comment => {
                    return (
                        <Comment key={comment._id}>
                            <UserName>{comment.user}</UserName>
                            <StarsContainer>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <Star
                                            type="button"
                                            key={index}
                                            filled={index <= comment.rating ? true : false}
                                        >
                                            <div>&#9733;</div>
                                        </Star>
                                    );
                                })}
                            </StarsContainer>
                            <Text>{comment.comment}</Text>
                        </Comment>
                    )
                })
            }
        </Container>
    )
}

export default React.memo(CommentSection)