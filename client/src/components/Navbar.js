import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';;

const languages = ["ENG", "UA", "FR", "DE"]

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.select`
    font-size: 16px;
    cursor: pointer;
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 20px;
`

const SearchInput = styled.input`
    border: none;
    height: 30px;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h2`
    font-weight: bold;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const MenuItem = styled.div`
    padding-left: 10px;
`

const Login = styled.button`

`

const Register = styled.button`

`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>
                        {languages.map(item => {
                            return <option value={item}>{item}</option>
                        })}
                    </Language>
                    <SearchContainer>
                        <SearchInput></SearchInput>
                        <SearchIcon />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>MY LOGO</Logo>
                </Center>
                <Right>
                    <MenuItem>
                        <Login>
                            LOGIN
                        </Login>
                    </MenuItem>
                    <MenuItem>
                        <Register>
                            REGISTER
                        </Register>
                    </MenuItem>
                    <MenuItem>
                        <Badge badgeContent={3} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar