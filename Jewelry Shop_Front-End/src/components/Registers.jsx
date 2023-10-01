import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  margin-top: 22vh;
  position: relative;
  padding: 0 20px;
  width: 300px;
  height: 400px;
  border: 1px solid rgb(203, 195, 195);
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translate(-50%);
  box-shadow: rgba(60, 59, 59, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: 1px solid transparent;
  background: #ededed;
  color: black;
  padding: 10px;
  margin-bottom: 12px;
`;

const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 10px; 
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const EmailInput = styled(Input)`
border: 1px solid transparent;
background: #ededed;
color: black;
padding: 5px 20px;
margin-bottom: 12px; 
width: 232px;
height:30px
`;

const Button = styled.input`
  height: 30px;
  width: 95%;
  line-height: 55px;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: Arial;
  font-size: 13px;
`;

const Register = () => {
  return (
    <Container>
      <Header>
        <h1>Đăng ký</h1>
      </Header>
      <Form>
        <Input required type="text" placeholder="Họ và Tên" />
        <RadioContainer>
          <label htmlFor="radio1">
            <RadioInput type="radio" id="radio1" value={1} />
            Nam
          </label>
          <label htmlFor="radio2">
            <RadioInput type="radio" id="radio2" value={2} />
            Nữ
          </label>
        </RadioContainer>
        <Input type="text" placeholder="Tuổi" />
        <EmailInput type="email" placeholder="Email" /> 
        <Input type="password" placeholder="Mật khẩu" />
        <Button type="submit" value="Đăng Ký" className="btn" />
      </Form>
    </Container>
  );
};

export default Register;
