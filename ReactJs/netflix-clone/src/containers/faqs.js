import React from 'react';
import { Accordion, OptForm } from '../components';

export function FaqsContainer() {
  return (
    <Accordion.Container>
      <Accordion/>
      <OptForm>
        <OptForm.Input placeholder="Email address" />
        <OptForm.Button>Try it now</OptForm.Button>
        <OptForm.Break />
        <OptForm.Text>Ready to watch? Enter your email to create or restart your membership.</OptForm.Text>
      </OptForm>
    </Accordion.Container>
  );
}
