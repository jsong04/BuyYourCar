import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import * as Location from 'expo-location';
import listingsApi from '../api/listings';
import categoriesApi from '../api/categories';

import { AppForm, AppFormField, AppFormPicker, SubmitButton, ErrorMessage } from '../components/forms';
import ImageInputList from '../components/ImageInputList';
import Screen from '../components/Screen';
import colors from '../config/colors';
import FormImagePicker from '../components/forms/FormImagePicker';
import AppText from '../components/AppText';
import axios from 'axios';
import AppButton from '../components/AppButton';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(1000000).label("Price"),
    description: Yup.string().label("Description"),
    brand: Yup.object().required().nullable().label("Brand"),
    images: Yup.array().min(1, "Please upload at least one image!")
});


function ListingEditScreen(props) {
    const [location, setLocation] = useState();
    const [categories, setCategories] = useState([]);

    const getLocation = async () => {
        const { granted } = await Location.requestPermissionsAsync();
        if (!granted) return;
        const { coords: { latitude, longitude }} = await Location.getLastKnownPositionAsync();
        setLocation({ latitude, longitude });
    }

    const getBrands = async () => {
        const brands = [];
        const res = await categoriesApi.getCategories();
        if (!res.data) return;
        
        for (let c of res.data) {
            let { id, name } = c;
            let d = {}
            d.label = name;
            d.value = id;
            brands.push(d);
        }
        setCategories(brands);
    }

    useEffect(() => {
        getLocation();
        getBrands();
        
    }, []);

    const handleSubmit = async (listing) => {
        const data = {...listing, location};
        console.log(data);
        const res = await listingsApi.addListings({ ...listing, location });
        if (!res.ok) return alert("Could not save the listing.");
        alert("Success!");
    }

    return (
        <Screen style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <AppText style={{color: 'royalblue'}}>Sell your car in best price </AppText>
            </View>
            <AppForm 
                initialValues={{title: "", price: "", description: "", brand: null, images: []}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <AppFormField maxLength={255} name="title" placeholder="Title" />
                <AppFormField keyboardType="numeric" maxLength={8} name="price" placeholder="Price" />
                <AppFormPicker items={categories} name="brand" placeholder="Brands" />
                <AppFormField maxLength={255} multiline name="description" numberOflines={3} placeholder="Description" />
                <SubmitButton title="Post"/>
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default ListingEditScreen;