import React, { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as Yup from "yup";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import { useAuth } from "../../hooks/auth";

import getValidationsErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container } from "./styles";

interface SignInFormData {
  empweblogin: string;
  empwebsenha: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          empweblogin: Yup.string().required("Usuário é obrigatório!"),
          empwebsenha: Yup.string().min(
            6,
            "A senha deve ter no mínimo 6 dígitos."
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ ...data });

        console.log(data);
      } catch (err) {
        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert("Erro na autenticação!");
      }
    },
    [signIn]
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="empweblogin"
                placeholder="Usuário"
                returnKeyType="next"
              />
              <Input
                name="empwebsenha"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current.submitForm();
                }}
              />
            </Form>
            <Button
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
