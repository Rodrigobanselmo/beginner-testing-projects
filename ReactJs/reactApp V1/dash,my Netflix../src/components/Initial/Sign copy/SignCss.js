import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { BsCheckCircle,BsExclamationTriangle,BsXOctagon } from 'react-icons/bs';

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index:-1;
`;


export const IconCheck = styled(BsCheckCircle)`
  color: green;
  margin-right: 5px;
`;
export const IconWarn = styled(BsExclamationTriangle)`
  color: #DBA901;
  margin-right: 5px;
`;
export const IconError = styled(BsXOctagon)`
  color: #e91c1c;
  margin-right: 5px;
`;

export const DivIcon = styled.div`
  position: absolute;
  opacity:${({ show }) => (show ? 1 : 0)};
  top: 11px;
  right: 7px;
  transition: opacity 0.5s ease;
  user-select: none;
  overflow: hidden;
  z-index:11;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #000000;
`;
export const Background = styled.div`
  display: flex;
  position:fixed;
  justify-content:center;
  top:0;
  right:0;
  left:0;
  bottom: 0;
  flex-direction: column;
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;

  &:hover {
    color: #fff;
    transform: scale(1.02);
    transition: 0.15s ease-out;
    text-decoration: none;
  }

span {
  color:#d9560b;
}

`;

export const Container = styled.div`
  display: flex;
  margin: 0 86px;
  height: 100px;
  margin-bottom:-100px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  align-self: center;
  max-width: 1100px;

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 660px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  width: 100%;
  margin: auto;
  max-width: 450px;
  padding: 60px 68px 40px;
  align-self:center;

`;

export const Error = styled.div`
  background: #e0bf00;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: black;
  padding: 15px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 38px;
  opacity: ${({fade})=>(fade===true ? 1 : 0)};
  transition: opacity 0.40s ease-out;

`;

export const Text = styled.p`
  color: #737373;
  font-size: 16px;
  font-weight: 500;
  opacity: ${({fade})=>(fade===true ? 1 : 0)};
  transition: opacity 0.40s ease-out;

`;

export const TextForgotten = styled.p`
  color: #737373;
  font-size: 12.5px;
  font-weight: 500;
  margin-top:${({login})=>(!login===true ? '-30px' : 0)};
  margin-bottom:${({login})=>(!login===true? '30px' : 10)};
  opacity:${({login})=>(!login===true ? 0 : 1)};
  transition: all 0.85s ease-out;
  z-index:0;

`;

export const TextSmall = styled.p`
  margin-top: 10px;
  font-size: 13px;
  text-align: justify;
  line-height: normal;
  color: #8c8c8c;
  
`;

export const LinkButton = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color:#d9560b;
    transition: 0.15s ease-out;
  }
`;

export const TextButton = styled.span`
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color:#d9560b;
    transition: 0.15s ease-out;
  }
`;

export const Input = styled.input`
  background-color: #ddd;
  border-radius: 4px;
  border: 0;
  color: #000;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  width:100%;
  padding-right:50px;
  z-index:1;

`;

export const InputConfirm = styled.input`
  background: #ddd;
  opacity:${({login})=>(login ? 0 : 1)};
  border-radius: 4px;
  border: 0;
  color: #000;
  position:absolute;
  top:${({login})=>(login ? '-70px' : '0px')};
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  width:100%;
  padding-right:50px;
  transition: all 0.85s ease-out;
  z-index:0;

/*   &:last-of-type {
    margin-bottom: 20px;
  } */
`;

export const Submit = styled.button`
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 5px;
  margin-top: ${({login})=>(login ? '5px' : '70px')};
  padding: 16px;
  border: 0;
  background: #d9560b;
  color: white;
  cursor: pointer;
  z-index:1;

  &:disabled {
    color: #fff;
    background: #d9560b;
  }

&:hover {
  background: #c6460b
}

transition: margin-top 0.85s ease-out;

`;
export const Google = styled.button`
  background: '#fff';
  display:flex;
  position:relative;
  align-items:center;
  justify-content:center;
  border-radius: 4px;
  font-size: 16px;
  margin: 20px 0 20px;
  padding: 16px;
  font-weight: bold;
  border: 0;
  color: '#000';
  cursor: pointer;

  img {
  width:25px;
  height:25px;
  margin-right:10px;
  }
`;
