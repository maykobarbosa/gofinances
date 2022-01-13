import React from 'react'

import {
  Container
} from './styles'



export function TransactionCard(){
  return(
    <Container >
      <Title>Desenvolvimento de site</Title>
      <Amount>R$ 12.000,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>110/01/2022</Date>
      </Footer>

    </Container>
  )
}