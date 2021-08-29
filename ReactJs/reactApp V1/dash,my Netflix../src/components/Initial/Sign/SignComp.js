import {Background, Error, Text,TextButton,InputConfirm,InputPassword,TextForgotten, TextSmall,HeroBg,DivIcon,IconWarn,IconCheck,IconError,Google,VideoBg, LinkButton, Input, Submit,SocialLogo,Container } from './SignCss';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LottieAnimation from '../../../lib/lottie'

function Pop(props) {
    const popover = (
      <Popover style={{opacity: props.warn.type !=='none' ? 1:0}} id="popover">
        {props.warn?.title && props.warn.title !=='' && <Popover.Title style={{marginBottom:0}} as="h3">{props.warn.title}</Popover.Title>}
        <Popover.Content>
          {props.warn.body}
        </Popover.Content>
      </Popover>
    );
    
    return (
  
      <DivIcon show={props.warn.type !=='none'} >
        {props.warn.type === 'load' && <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />}
        <div style={{position:'relative'}} className="App">
          <OverlayTrigger placement="right" overlay={popover}>
            <div style={{height:25,width:25,marginRight:-3}} > 
            {props.warn.type ==='check' ? <IconCheck/> :
              props.warn.type ==='warn' ?<IconWarn/> :
              props.warn.type ==='error' ? <IconError/>:
              <></>}
            </div>
          </OverlayTrigger>
        </div>
      </DivIcon>
    )
  
}

export default function Sign({children, ...restProps }) {
    return (
        <Background {...restProps}>
        {children}
        </Background>
    );
}

Sign.VideoBackground = function VideoBackground() {
    return(
      <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={'/videos/video.mp4'} type='video/mp4' >
            Seu browser não suporta HTML5, por favor utilizar outro para continuar navegando.
        </VideoBg>
      </HeroBg>
    )
}

Sign.Errors =  function Errors(props) {
    return(
      props.error && <Error data-testid="error"><IconError color='#fff'/>{`    ${props.error}`}</Error>
    )
}
  
Sign.Logo =  function Logo() {
    return(
      <Container>
        <SocialLogo to={'/'} >
          Simple<span>SST</span>
        </SocialLogo>
      </Container>  
    )
}
  
Sign.InputEmail = function InputEmail(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <Input
          placeholder="Email"
          value={props.data.emailAddress}
          onChange={({ target }) => props.onSetEmailAddress(target.value)}
          onKeyPress={props.onKerPress}
          onBlur={({ target }) => props.onBlurEmail(target.value)}
          login={'none'}
        />
        {props.data.warnMessage.type !=='none' ? <Pop warn={props.data.warnMessage}/> : null}
      </div>
    )
}
  
Sign.InputPass =  function InputPass(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <InputPassword
          ref={props.inputPass}
          type="password"
          value={props.data.password}
          autoComplete="off"
          placeholder="Senha"
          onKeyPress={props.onKerPress}
          onChange={({ target }) => props.onSetPassword(target.value)}
          login={props.login}
        />
        {props.data.warnPassMessage.type !=='none' ? <Pop warn={props.data.warnPassMessage}/> : null}
      </div>
    )
}
  
Sign.InputConfirmPass =  function InputConfirmPass(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <InputConfirm
          ref={props.inputConfirm}
          type="password"
          value={props.data.confirmPassword}
          autoComplete="off"
          placeholder="Confirmar senha"
          onChange={({ target }) => props.onSetConfirmPassword(target.value)}
          login={props.login}
        />
        {props.data.warnConfirmMessage.type !=='none' ? <Pop warn={props.data.warnConfirmMessage}/> : null}
      </div>
    )
}
  
Sign.ContinueButton =  function ContinueButton(props) {
    return(
      <Submit login={props.login} onClick={props.handleSignIn} type="submit" data-testid="sign-in">
        Continuar
      </Submit>
    )
}
  
Sign.ForgotPassword =  function ForgotPassword(props) {
    return(
      <TextForgotten login={props.login}>
        <LinkButton to="/recovery">Esqueceu a senha?</LinkButton>
      </TextForgotten>
    )
}
  
Sign.Duvida =  function Duvida() {
    return(
      <TextSmall>
      Alguma duvida? Entre em contato com nossa equipe para mais informações. <LinkButton to='/' style={{color:'#bbb'}}>Saiba mais.</LinkButton>
      </TextSmall>
    )
}