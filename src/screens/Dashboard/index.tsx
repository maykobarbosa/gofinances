import React from 'react' 

import {
  Container, 
  Header,
  User,
  UserInfo,
  UserGreeting,
  UserName,
  Photo,  
  UserWrapper,
  Icon
} from './styles'

export function Dashboard(){
  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/67514858?v=4'}}/>  
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Mayko </UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>        
      </Header>

    </Container>
      
  )
}

function RFValue(arg0: number) {
  throw new Error('Function not implemented.')
}
