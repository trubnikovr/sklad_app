import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { UtilsService } from "../../utils/UtilsService.ts";
import { IProduct } from "../../interfaces/product.ts";

const OrderProductCard = ({ product, onAdd } : { product: IProduct , onAdd: (product: IProduct) => void }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{UtilsService.printCurrency(product.price)}</Text>
        <Text style={styles.description}>{product.qty} {product.unit}</Text>
      </View>
    </View>
  );
};

export default OrderProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 12,
  },
  price: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
