import React, { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'
import {Link} from 'react-router-dom'


export const Navbar = () => {

    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        //cuando esta true lo pasa p false y vice versa
        setClicked(!clicked)
    }

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <>
            <NavContainer>
                <h2>Ahorcados <span>VS</span></h2>
                <div className={`links ${clicked ? 'active' : ''}`}>
                  <Link to='/' style={{
                    textDecoration: 'none',
                    }}>
                    <p>Home</p>
                  </Link>

                  <Link to='/login' style={{
                    textDecoration: 'none',
                  }}>
                    <p>Login/Signup</p>
                  </Link>

                  <Link to='/' style={{
                    textDecoration: 'none',
                  }}>
                    <p onClick={handleLogout}>Logout</p>
                  </Link>

                  <Link to='/about' style={{
                    textDecoration: 'none',
                  }}>
                    <p>About</p>
                  </Link>

                  <Link to='/rules' style={{
                    textDecoration: 'none',
                  }}>
                    <p>Rules</p>
                  </Link>  

                </div>
                <div className='burguer'>
                    <BurguerButton clicked={clicked} handleClick={handleClick} />
                </div>
                <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
            </NavContainer>
        </>
    )
}

export default Navbar

const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight: 400;
    font-size: 3rem;
    span{
      font-weight: bold;
    }
  }
  padding: 4rem;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    p{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 1095px){
      position: initial;
      margin: 0;
      p{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }

    @media(min-width: 1050px){
        p{
            font-size: 1.5rem;
        }
    }
  }
  @media(min-width: 768px){
    h2 {
        margin-right: 6rem;
    }
  }

  @media(max-width: 600px){
      h2 {
          font-size: 2rem;
      }
      padding: 2rem;
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    p{
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
  .burguer{
    z-index:2 ;
    @media(min-width: 1095px){
      display: none;
    }
  }
`

const BgDiv = styled.div`
  background-color: #000000;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
