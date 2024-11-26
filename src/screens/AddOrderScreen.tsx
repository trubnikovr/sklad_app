import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, FAB, Modal, Portal, Button, TextInput } from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";
import { theme } from "../styles/theme.ts";
import OrderProductCard from "../components/Order/OrderProductCard.tsx";
import { IOrderItem } from "../interfaces/orderItem.ts";
import AddProductModal from "../components/Order/AddProductModal.tsx";


function AddOrder() {
  const [items, setItems] = useState<IOrderItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Добавление продукта в список
  const handleAddProduct = (name, quantity) => {
    setItems((prevItems) => [
      ...prevItems,
      { product_id: `${Date.now()}`, name, quantity },
    ]);
  };

  return (
    <View style={theme.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <OrderProductCard
            product={item}
            onAdd={(product) => console.log("Добавлено:", product)}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Пусто
          </Text>
        }
      />
      {/* Модальное окно */}
      <AddProductModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onAddProduct={handleAddProduct}
      />
      {/* Плавающая кнопка */}
      <FAB
        icon="plus"
        onPress={() => setIsModalVisible(true)}
        style={styles.fab}
        color="#fff"
        label=""
        theme={{
          colors: {
            primary: "#9c83f2",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#9c83f2",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  autocompleteContainer: {
    borderWidth: 0,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalButton: {
    marginTop: 10,
  },
});

export default AddOrder;
