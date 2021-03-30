import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppText from '../components/AppText'
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

function LoginScreen(props) {
    
    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.jpg')} />

            <Formik initialValues={{email: '', password: ''}} onSubmit={values => console.log(values)} validationSchema={validationSchema}>
                {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <AppTextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Email"
                            keyboardType="email-address"
                            onBlur={() => setFieldTouched("email")}
                            textContentType="emailAddress"
                            icon="email"
                            onChangeText={handleChange("email")}
                        />
                        <ErrorMessage error={errors.email} visible={touched.email} />
                        <AppTextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Password"
                            icon="lock"
                            onBlur={() => setFieldTouched("password")}
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={handleChange("password")}
                        />
                        <ErrorMessage error={errors.password} visible={touched.password} />
                        <AppButton title="Login" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
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