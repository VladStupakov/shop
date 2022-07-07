import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
flex:1;
display: flex;
flex-direction: column;
padding: 20px;
`

const Logo = styled.h1`
text-align: center;
`

const Description = styled.p`
    margin: 20px 0px;
`

const SocialsContainer = styled.div`
    display: flex;
    justify-content: center;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    background-color: #${props => props.color};
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const Title = styled.h2`
    margin-bottom: 30px;
    text-align: center;
`

const ContactItem = styled.div`
display: flex;
margin-bottom: 20px;
align-items: center;
justify-content: center;
`

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
`
const Payment = styled.img`
    width: 30%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>MY LOGO</Logo>
                <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eaque assumenda non fugiat praesentium illum aliquid tempore ea neque harum.
                </Description>
                <SocialsContainer>
                    <SocialIcon color="3B5999">
                        <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <InstagramIcon />
                    </SocialIcon>
                </SocialsContainer>
            </Left>
            <Right>
                <Title>Contacts</Title>
                <ContactItem>
                    <LocationOnOutlinedIcon style={{marginRight:"10px"}}/>Zhytomyr, Korolenko st.
                </ContactItem>
                <ContactItem>
                    <PhoneIphoneOutlinedIcon style={{marginRight:"10px"}}/>+38 098 123 45 67
                </ContactItem>
                <ContactItem>
                    <EmailOutlinedIcon style={{marginRight:"10px"}}/>stupakov41@gmail.com
                </ContactItem>
                <ImageContainer>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"></Payment>
                </ImageContainer>
            </Right>
        </Container>
    )
}

export default Footer