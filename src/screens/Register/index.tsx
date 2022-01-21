import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Title, Form, Fields, TransactionTypes} from "./styles";

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

interface FormData {
    name: string;
    amount: string;
}
const schema = Yup.object().shape({
    name:Yup.string().required('Nome é obrigatório'),
    amount:Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório')
})

export function Register(){
    
    const [TransactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
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

    function handleRegister (form: FormData){
        if(!TransactionType)
            return Alert.alert('Selecione o tipo da transação')
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')
        
        const data = {
            name: form.name,
            amount: form.amount,
            TransactionType,
            category: category.key
        }
        console.log(data)
    }



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        name="name" 
                        control={control}
                        placeholder="Nome"
                        autoCapitalize="sentences" ///deixa primeira letra maiuscula
                        //autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        name="amount" 
                        control={control}
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
                    
                        
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
                        title={category.name} 
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                
                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>
            

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
        </TouchableWithoutFeedback>
    );
}

