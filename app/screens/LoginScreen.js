import React, { useContext, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/forms';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import AuthStorage from '../auth/storage';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

function LoginScreen(props) {
    const authContext = useContext(AuthContext);
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({ email, password }) => {
        const res = await authApi.login(email, password);
        if (!res.ok) {
            return setLoginFailed(true)
        }
        setLoginFailed(false);
        console.log(res.data);
        const user = jwtDecode(res.data);
        console.log(user);
        authContext.setUser(user);
        AuthStorage.storeToken(res.data);
    }
    
    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.jpg')} />

            <AppForm initialValues={{email: '', password: ''}} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <ErrorMessage error="Invalid email or password!" visible={loginFailed} />
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
                    secureTextEntry={true}
                    textContentType="password"
                />
                <SubmitButton title="Login" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})

export default LoginScreen;