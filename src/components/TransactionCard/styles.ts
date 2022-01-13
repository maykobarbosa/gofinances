import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.shape};

  width: ${RFValue(300)};
  border-radius: 5px;
  
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  
`;
