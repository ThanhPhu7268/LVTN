import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 5,
    },
});

const Invoice = ({ orderNumber, purchaseDate, totalPrice, paymentMethod, products }) => {
    let totalQuantity = 0;
    let totalCost = 0;

    return (
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Otis Watch</Text>
                    <Text style={styles.text}>123 Street Name, City, Country</Text>
                    <Text style={styles.text}>Date: {purchaseDate}</Text>
                    <Text style={styles.text}>Phone: 0372 898 163</Text>
                    <Text style={styles.title}>Invoice</Text>
                    <Text style={styles.text}>Thông tin người mua: Your Name</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Thông tin chi tiết sản phẩm:</Text>
                    {products.map((product, index) => {
                        totalQuantity += product.quantity;
                        totalCost += product.totalPrice;
                        return (
                            <View key={index}>
                                <Text style={styles.text}>Product Name: {product.productName}</Text>
                            </View>
                        );
                    })}
                    <Text style={styles.text}>Total quantity: {totalQuantity}</Text>
                    <Text style={styles.text}>Total Price: {totalCost}</Text>
                    <Text style={styles.text}>paymentMethod: {paymentMethod}</Text>
                </View>
                <Text style={styles.text}>Thank you for purchasing at Otis Watch Store!</Text>
            </Page>
        </Document>
    );
};

export default Invoice;
