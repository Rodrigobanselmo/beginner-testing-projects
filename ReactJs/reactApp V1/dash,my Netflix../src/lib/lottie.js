import React from 'react'
import Lottie from 'react-lottie';
import loader from '../animations/loader2.json'

export default function LottieAnimation({ lotti, width, height,isClickToPauseDisabled }) {

  let animation = ''

  switch (lotti) {
    case 'loader':
       animation = loader
    break

    default:
       animation = lotti
    break
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} isClickToPauseDisabled={isClickToPauseDisabled} height={height} width={width} />
    </div>
  );
};