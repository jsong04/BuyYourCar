import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker,
} from "../components/forms";
import useApi from "../hooks/useApi";
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  age: Yup.number().required().min(16).max(100).label("Age"),
  budget: Yup.number().required().min(2000).max(1000000).label("Budget"),
});

const baseUrl = 'http://172.22.112.53:7000/api/'

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    // console.log(userInfo);
    // const result = await registerApi.request(userInfo);
    const res = await axios.post(baseUrl +"users", userInfo);
    // console.log(res);

    // if (res.status !== 201) {
    //   console.log("aaa");
    //   if (res.data) setError(res.data.error);
    //   else {
    //     setError("An unexpected error occurred.");
    //     console.log(res);
    //   }
    //   return;
    // }

    // const { data: authToken } = await loginApi.request(
    //   userInfo.email,
    //   userInfo.password
    // );
    const {data: authToken} = await axios.post(baseUrl + "auth", {
      email: userInfo.email,
      password: userInfo.password
    })
    console.log(authToken);
    auth.logIn(authToken);
  };

  return (
    <>
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "", age: 0, budget: 0 }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCorrect={false}
            icon="baby"
            name="age"
            placeholder="Age"
          />
          <AppFormField
            autoCorrect={false}
            icon="cash-usd"
            name="budget"
            placeholder="Budget"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;