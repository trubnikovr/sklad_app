import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Modal, Portal, Button, TextInput } from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";
import { ProductsRepository } from "../../model/repositaries/ProductsRepository.ts";

function AddProductModal({ visible, onDismiss, onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Поиск продуктов по имени
  const handleSearch = async (text) => {
    setProductName(text);

    if (text === "") {
    //  setFilteredProducts([]);
    } else {
      try {
        const products = await ProductsRepository.searchProductsByName(text);

        console.log('products', products);
      //  setFilteredProducts(products);
      } catch (error) {
        console.error("Ошибка поиска продуктов:", error);
      }
    }
  };

  const handleSelectProduct = (product) => {
    setProductName(product.name);
    setFilteredProducts([]); // Скрываем список после выбора
  };

  const handleAddProduct = () => {
    if (productName && productQuantity) {
      onAddProduct(productName, productQuantity);
      setProductName("");
      setProductQuantity("");
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.modalTitle}>Добавить продукт</Text>
        {/* Поле с автозаполнением */}
        <Autocomplete
          data={filteredProducts}
          value={productName}
          onChangeText={handleSearch}
          placeholder="Введите название продукта"
          flatListProps={{
            keyExtractor: (item) => item.id,
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectProduct(item)}
                style={styles.dropdownItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ),
          }}
          inputContainerStyle={styles.autocompleteContainer}
        />
        <Button mode="contained" onPress={handleAddProduct} style={styles.modalButton}>
          Добавить
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
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

export default AddProductModal;
