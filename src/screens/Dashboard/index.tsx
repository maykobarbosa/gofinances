import React, { useCallback, useEffect, useState } from 'react' 
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
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
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  saldo: HighlightProps;
}

export function Dashboard(){
  const [data, setData] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)


  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)

    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions
    .map((item) => {

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount)
      }else{
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })

    setData(transactionsFormatted)

    const total = entriesTotal - expensiveTotal
    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      saldo: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
    console.log(transactionsFormatted)
  
      
  }

  useEffect(() => {
    loadTransactions()
    // const dataKey = '@gofinances:transactions'
    // AsyncStorage.removeItem(dataKey)
  
  },[])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  },[]))

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
          amount={highlightData.entries.total} 
          lastTransaction="Última entrada dia 10 de janeiro"
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amount={highlightData.expensives.total} 
          lastTransaction="Última saída dia 10 de janeiro"
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amount={highlightData.saldo.total} 
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
