import React from 'react';
import SignIn from '../components/Initial/Sign';
import useScrollToTop from '../hooks/useScrollToTop';

function SignInPage() {

  useScrollToTop()

  return (
    <>
      <SignIn />
    </>
  );
}

export default SignInPage;
