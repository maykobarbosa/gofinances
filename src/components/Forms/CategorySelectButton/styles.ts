
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color:  ${({theme }) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    
    border-radius: 5px;
    padding: 18px 16px;
`;

export const Category = styled.Text`
    font-size: ${RFValue(14)};
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(14)};
    color:  ${({ theme }) => theme.colors.text};
`;