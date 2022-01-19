import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionTypes} from "./styles";

export function Register(){
    const [TransactionType, setTransactionType] = useState('')

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    <Input 
                        placeholder="Preço"
                    />
                    <TransactionTypes>
                        <TransactionTypeButton 
                            title="income"
                            type="up"
                            onPress={()=> handleTransactionsTypeSelect('up')}
                            isActive={TransactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            title="outcome"
                            type="down"
                            onPress={()=> handleTransactionsTypeSelect('down')}
                            isActive={TransactionType === 'down'}
                        />
                    </TransactionTypes>
                    <CategorySelect title="Categoria" />
                </Fields>
                
                <Button title="Enviar"/>
            </Form>
            
        </Container>
    );
}