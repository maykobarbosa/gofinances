import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Title, Form, Fields, TransactionTypes} from "./styles";

export function Register(){
    
    const [TransactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
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
                    <CategorySelectButton 
                        title="Categoria" 
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                
                <Button title="Enviar"/>
            </Form>
            

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}