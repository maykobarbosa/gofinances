import React from 'react' 
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'

import {
  Container, 
  Header,
  User,
  UserInfo,
  UserGreeting,
  UserName,
  Photo,  
  UserWrapper,
  Icon,
  HighlightCards,
  Transitions,
  Title
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

      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas" 
          amount="10.000,00" 
          lastTransaction="Última entrada dia 10 de janeiro"
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amount="1.500,00" 
          lastTransaction="Última saída dia 10 de janeiro"
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amount="8.500,00" 
          lastTransaction="01 à 13 de janeiro"
        />
      </HighlightCards>

      <Transitions>
        <Title>Listagem</Title>
        <TransactionCard />
      </Transitions>

    </Container>
      
  )
}

function RFValue(arg0: number) {
  throw new Error('Function not implemented.')
}
