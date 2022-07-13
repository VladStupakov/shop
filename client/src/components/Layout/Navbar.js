import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Box, Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../API/UserApi';

const languages = ["ENG", "UA", "FR", "DE"]

const Container = styled.div`
    height: 80px;
    padding: 10px 20px;
    background-color: rgb(34, 31, 31);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 40px;
`

const Language = styled.div`
    font-size: 16px;
    cursor: pointer;   
`
const SearchContainer = styled.div`
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 3px;
    background-color: white;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const ButtonListItem = styled.div`
    padding-left: 15px;
    align-items: center;
    display: flex;
    flex-wrap: 'wrap';
`

const CustomLink = styled(Link)`
    text-decoration: none;
    display: flex;
    color: white;
`
const SearchInput = styled(InputBase)`
    margin-left: 10px; 
    flex: 1;
    min-height: 30px;
    color: "grey"; 
    background-color: 'white';
`

const Navbar = () => {

    const [language, setLanguage] = useState('')
    const [searchQuery, setSearchQuery] = useState()
    const user = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSearchClick = () => {

    }

    const inputHandleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleLogoutClick = () =>{
        logoutRequest(dispatch)
    }



    return (
        <Container>
            <Left>
                <CustomLink to='/'>
                    <Logo>MY LOGO</Logo>
                </CustomLink>
            </Left>
            <Center>
                {/* <Language>
                        <Box sx={{ minWidth: 120, minHeight: "30px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Language</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={language}
                                    label="Language"
                                    onChange={handleLanguageChange}
                                >
                                    {languages.map(lang => {
                                        return <MenuItem value={lang} key={lang}>{lang}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Language> */}
                <SearchContainer>
                    <SearchInput
                        placeholder="Search..."
                        onChange={inputHandleChange}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
                        <SearchIcon color="primary" />
                    </IconButton>
                </SearchContainer>
            </Center>
            <Right>
                {
                    user ?
                        <>
                            <CustomLink to='/cart'>
                                <ButtonListItem>
                                    <Badge badgeContent={3} color="secondary" sx={{ cursor: "pointer" }}>
                                        <ShoppingCartOutlinedIcon color="primary" sx={{ border: '2px solid rgb(25, 118, 210)', borderRadius: '10px' }} />
                                    </Badge>
                                </ButtonListItem>
                            </CustomLink>
                            <ButtonListItem onClick={handleLogoutClick}>
                                <Button variant="contained" >LOGOUT</Button>
                            </ButtonListItem>
                        </>
                        :
                        <>
                            <CustomLink to='/login'>
                                <ButtonListItem>
                                    <Button variant="contained" >LOGIN</Button>
                                </ButtonListItem>
                            </CustomLink>
                            <CustomLink to='/register'>
                                <ButtonListItem>
                                    <Button variant="contained">REGISTER</Button>
                                </ButtonListItem>
                            </CustomLink>
                        </>
                }
            </Right>
        </Container>
    )
}

export default Navbar