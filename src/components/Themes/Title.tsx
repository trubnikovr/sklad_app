import React from 'react';
import { Title as PaperTitle } from 'react-native-paper';
import { theme } from '../../styles/theme';

const Title = ({text}: { text :string}) => {

  return (
    <PaperTitle style={theme.title} >
      {text}
    </PaperTitle>
  );
};

export default Title;
