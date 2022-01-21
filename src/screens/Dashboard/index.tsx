import React from 'react' 
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

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
  Title,
  TransitionList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){
  const data: DataListProps[] = [
    {     id: '1',
          type: "positive",
          title: "Desenvolvimento de site",
          amount: "12.000,00",
          category: {
            name: 'Vendas',
            icon: 'dollar-sign'
          },
          date:"13/01/2021"
    },
    {
      id: '2',
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "12.000,00",
      category: {
        name: 'Vendas',
        icon: 'coffee'
      },
      date:"13/01/2021"
    },
    {
      id: '3',
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "12.000,00",
      category: {
        name: 'Vendas',
        icon: 'shopping-bag'
      },
      date:"13/01/2021"
    }
];

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
        <TransitionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard  data={item}/> }
        >
        </TransitionList>
      </Transitions>

    </Container>
      
  )
}

function RFValue(arg0: number) {
  throw new Error('Function not implemented.')
}
