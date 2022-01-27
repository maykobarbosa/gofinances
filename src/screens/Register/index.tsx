import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Title, Form, Fields, TransactionTypes} from "./styles";
import uuid from 'react-native-uuid'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { useAuth } from "../../hooks/auth";
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

    
  const {user} = useAuth()

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const navigation = useNavigation()
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type)
    }
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }

    async function handleRegister (form: FormData){
        if(!TransactionType)
            return Alert.alert('Selecione o tipo da transação')
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')
        
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: TransactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`

            const data = await AsyncStorage.getItem(dataKey)
            const currentData = data ? JSON.parse(data!) : []

            const dataFormatted = [
                newTransaction,
                ...currentData
                
            ]

            //cadastra transação
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

            //limpa campos com string vazia
            reset()
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            })
            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possível salvar")
        }
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
                            title="Entrada"
                            type="up"
                            onPress={()=> handleTransactionsTypeSelect('positive')}
                            isActive={TransactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                            title="Saída"
                            type="down"
                            onPress={()=> handleTransactionsTypeSelect('negative')}
                            isActive={TransactionType === 'negative'}
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

