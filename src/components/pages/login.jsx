import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

export const Login = () => {

  let {loginUser} = useContext(AuthContext)
  // let navigate = useNavigate();

  const [typePassword, setTypePassword] = useState("password");
  const [username, setUsername] = useState();
  const [password, setPasword] = useState();

  const changeTypePassword = () => {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  // const login = event => {
  //   console.log({username:username, password:password});
  //   fetch("http://127.0.0.1:8000/auth/",{
  //     method:'POST',
  //     headers:{'Content-Type': 'application/json'},
  //     body: JSON.stringify({username:username, password:password})
  //   })
  //   .then(data => data.json())
  //   .then(
  //     data => {
  //       console.log(data.token);
  //       if(data.token != undefined){
  //         navigate('/');
  //       }
  //       else{
  //         alert("username or password is not correct !");
  //       }
  //     }
  //   ).catch(error => console.error(error))
    
  // };

  return (
    <Div>
      <Container>
        <Content>
          <form onSubmit={loginUser}>
          <InputContent>
            <FaUserAlt />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContent>
          <InputContent>
            <FaLock />
            <Input
              type={typePassword}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
            />

            {typePassword === "password" ? (
              <FaEye onClick={changeTypePassword} />
            ) : (
              <FaEyeSlash onClick={changeTypePassword} />
            )}
          </InputContent>

          <ButtonLogin disabled={!username || !password}
          //  onClick={() => {
          //   login();
          //   }}
             type="submit">Login</ButtonLogin>
          </form>
        </Content>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121214;
`;

const Container = styled.div`
    width: 400px;
    height: 280px;
    background-color: #202024;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 415px) {
      width: 100%;
    }
`;

const Content = styled.div`
    width: 80%;
    height: 75%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContent = styled.div`
    background-color: #121214;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 2px solid #121214;
    padding: 0 5px;
    margin-bottom: 10px;
    svg {
      color: #353434;
      margin: 0 10px;
      width: 20px;
      height: 20px;
    }
    &:focus-within {
      outline: 3px ridge rgba(105, 122, 33, .8);
      border-radius: 1rem;
    }
`;

const Input = styled.input`
    outline: none;
    background-color: #121214;
    color: white;
    border: none;
    height: 50px;
    width: 100%;
    font-size: 15px;
`;

const ButtonLogin = styled.button`
    width: 100%;
    cursor: pointer;
    background: #697A21;
    border-radius: 5px;
    border: none;
    color: white;
    font-weight: bold;
    font-size:16px;
    height: 50px;
    opacity: 0.9;
    margin: 20px 0;
    &:hover {
      ${(props) =>
        props.disabled === false
          ? "transition: 0.2s ease; opacity: 1;"
          : "cursor: not-allowed;"}
    }
`;