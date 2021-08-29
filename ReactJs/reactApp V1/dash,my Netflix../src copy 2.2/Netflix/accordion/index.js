import React, { useState} from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles/accordion';
import faqsData from '../../../fixtures/faqs';

export default function Accordion() {

  const [toggleShow, setToggleShow] = useState(-1);

  return (
      <>
      
        <Title>Frequently Asked Questions</Title>
        <Frame>
        {faqsData.map((item,index) => (
          <Item key={item.id}>
            <Header angular={toggleShow === index?true:false} onClick={() => setToggleShow(toggleShow === index? -1:index)}>
                {item.header}
                <img src="/images/icons/add.png" alt="Open" />
            </Header>
            <Body className={toggleShow === index? 'open' : 'closed'}>
              <span>{item.body}</span>
            </Body>
          </Item>
        ))}
      </Frame>
      </>
  );
}

Accordion.Container = function AccordionContainer({ children, ...restProps }) {
  return <Container {...restProps}><Inner>{children}</Inner></Container>;
};