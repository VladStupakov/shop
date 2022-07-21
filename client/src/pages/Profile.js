import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { getUserData } from '../API/UserApi'

const Container = styled.div`
  display: flex;
  height: 85vh;
  justify-content: center;
  width: 60%;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
  height: 50%;
  align-items: center;
  border-right: 1px solid lightgray;
  padding: 10px;
`
const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 40px;
  font-size: 30px;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 10px 11px rgb(234, 244, 255);
  }
  ${props =>
    props.active &&
    css`
      background-color: rgb(205, 229, 253);
    `}
`

const DataContainer = styled.div`
  display: flex;
  flex: 3;
`

const Profile = () => {

  const userId = useSelector((state) => state.user.currentUser.id)
  const [userData, setUserData] = useState()
  const [activeOption, setActiveOption] = useState(0)

  useEffect(() => {
    getUserData(userId)
      .then(response => setUserData(response))
  }, [])

  return (
    <Container>
      <Options>
        <Option onClick={() =>setActiveOption(0)} active={activeOption === 0}>
            Profile
        </Option>
        <Option onClick={() =>setActiveOption(1)} active={activeOption === 1}>
            Orders history
        </Option>
      </Options>
      <DataContainer>

      </DataContainer>
    </Container>
  )
}

export default Profile