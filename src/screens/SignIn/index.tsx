import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg"
import GoogleSvg from "../../assets/google.svg"
import LogoSvg from "../../assets/logo.svg"
import { SignInSocialButton } from "../../components/SignInSocialButton";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from "./styles";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const [isLoading, setIsloading] = useState(false)

  async function handleSignInWithGoogle() {
    try {
      setIsloading(true)
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
      setIsloading(false)
    }


  }
  async function handleSignInWithApple() {
    try {
      setIsloading(true)
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
      setIsloading(false)
    }
  }


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'} finanças de forma muito simples
          </Title>

          <SignInTitle>
            Faça seu login com {'\n'}
            uma das contas abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>
        {
          isLoading &&

          <ActivityIndicator
            color={theme.colors.primary}
            size='large'
          />}
      </Footer>

    </Container>
  )
}