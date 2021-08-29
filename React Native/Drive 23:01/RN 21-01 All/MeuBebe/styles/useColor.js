import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorsDark from './ColorsDark';
import ColorsLight from './ColorsLight';

const useColor = () => {
const theme = useSelector(state => state.notes.theme);

  const [colors, setColors] = useState({});

  useEffect(() => {
    if (theme == 0) {
        setColors(ColorsLight);
      } else {
        setColors(ColorsDark)
      }
  }, [theme]);

  return [colors];
};

export default useColor;
