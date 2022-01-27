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
  LogoutButton,
  LoadContainer
} from './styles'
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from "../../hooks/auth";

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
  const[isLoading, setIsloading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()  

  const {user, signOut, userStorageLoading} = useAuth()
  
  async function handleSignOut() {
    signOut()
  }
  function getLasTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
    ){
    //obter a data mais recente de entrada
    const lastTransaction = new Date(Math.max.apply(Math, collection
    .filter((transaction: DataListProps) => transaction.type === type)
    .map((transaction: DataListProps) => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction
      .toLocaleString('pt-BR', {month: 'long'})}`
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
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

    
    
    const lastTransactionEntries =  getLasTransactionDate(transactions, 'positive')
    const lastTransactionExpensive =  getLasTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionEntries}`

    const total = entriesTotal - expensiveTotal
    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`
      },
      saldo: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsloading(false)
  
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
      { 
      isLoading && !userStorageLoading ? 
        <LoadContainer> 
          <ActivityIndicator 
            color={theme.colors.primary} 
            size='large'
          /> 
        </LoadContainer>  
      :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{uri: user.photo}}/>  
              <User>
                <UserGreeting>Olá, </UserGreeting>
                <UserName>{user.name} </UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={handleSignOut}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>        
        </Header>

        <HighlightCards>
          <HighlightCard 
            type="up"
            title="Entradas" 
            amount={highlightData?.entries?.total} 
            lastTransaction={highlightData?.entries?.lastTransaction}
          />
          <HighlightCard 
            type="down"
            title="Saídas" 
            amount={highlightData?.expensives?.total} 
            lastTransaction={highlightData?.expensives?.lastTransaction}
          />
          <HighlightCard 
            type="total"
            title="Total" 
            amount={highlightData?.saldo?.total} 
            lastTransaction={highlightData?.saldo?.lastTransaction}
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
      </> }
    </Container>
      
  )
}

function RFValue(arg0: number) {
  throw new Error('Function not implemented.')
}
