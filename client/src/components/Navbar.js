import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Box, Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
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

const Language = styled.div`
    font-size: 16px;
    cursor: pointer;
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 3px;
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

const Navbar = () => {

    const [language, setLanguage] = useState('');
    const [searchQuery, setSearchQuery] = useState()

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSearchClick = () => {

    }

    const inputHandleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
       
    }, [])

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>
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
                    </Language>
                    <SearchContainer>
                        <InputBase
                            sx={{ ml: 1, flex: 1, minWidth: 30 }}
                            placeholder="Search..."
                            onChange={inputHandleChange}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
                            <SearchIcon />
                        </IconButton>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>MY LOGO</Logo>
                </Center>
                <Right>
                    <ButtonListItem>
                        <Button variant="contained" >LOGIN</Button>
                    </ButtonListItem>
                    <ButtonListItem>
                        <Button variant="contained">REGISTER</Button>
                    </ButtonListItem>
                    <ButtonListItem>
                        <Badge badgeContent={3} color="primary" sx={{ cursor: "pointer" }}>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </ButtonListItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar