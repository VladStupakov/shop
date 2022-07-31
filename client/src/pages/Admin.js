import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from "styled-components"
import Categories from '../components/Admin/Categories'

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
  border-radius: 10px;
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
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
`
const Admin = () => {

    const [activeOption, setActiveOption] = useState(0)

    useEffect(() => {

    }, [])

    const renderComponent = () => {
        switch (activeOption) {
            case 0:
                return <Categories/>
            case 1:
                return
        }
    }
    return (
        <Container>
            <Options>
                <Option onClick={() => setActiveOption(0)} active={activeOption === 0}>
                    Categories
                </Option>
                <Option onClick={() => setActiveOption(1)} active={activeOption === 1}>
                    Orders
                </Option>
            </Options>
            <DataContainer>
                {
                    renderComponent()
                }
            </DataContainer>
        </Container>
    )
}

export default Admin