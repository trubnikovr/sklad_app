import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { theme } from "../styles/theme.ts";
import CustomTextInput from "../components/Forms/CustomTextInput.tsx";
import { ShowcaseService } from "../application/services/showcase.service.ts";
import ProductCard from "../components/ProductCard/ProductCard.tsx";

function ShowCaseScreen() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для поля поиска
  const [products, setProducts] = useState<any[]>([]); // Состояние для продуктов
  const [refreshing, setRefreshing] = useState<boolean>(false); // Состояние для обновления
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // Состояние для загрузки следующих страниц
  const [page, setPage] = useState<number>(1); // Текущая страница
  const [hasMore, setHasMore] = useState<boolean>(true); // Флаг, есть ли ещё данные для загрузки

  // Загрузка продуктов
  const loadProducts = async (currentPage: number = 1, append: boolean = false, text ='') => {
    try {

      const fetchedProducts = await ShowcaseService.getProducts(currentPage, 10, text); // Загружаем данные по странице
      if (fetchedProducts.length === 0) {
        if (text) {
          setProducts([]);
        }
        setHasMore(false); // Если данные закончились
        return;
      }

      setProducts((prev) =>
        append ? [...prev, ...fetchedProducts] : fetchedProducts
      ); // Добавляем новые продукты или заменяем

    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  // Обновление продуктов при потягивании
  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1); // Сбрасываем на первую страницу
    setHasMore(true); // Разрешаем загрузку новых данных
    await loadProducts(1);
    setRefreshing(false);
  };

  // Загрузка следующих страниц при прокрутке
  const loadMore = async () => {
    if (loadingMore || !hasMore) return; // Предотвращаем множественные вызовы
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await loadProducts(nextPage, true);
    setLoadingMore(false);
  };

  // Загрузка продуктов при загрузке экрана
  useEffect(() => {
    loadProducts();
  }, []);

  // Обновление фильтрации при изменении запроса
  useEffect(() => {
    loadProducts(1, false, searchQuery);
  }, [searchQuery]);

  return (
    <View style={theme.screen}>
      <CustomTextInput
        label="Поиск"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} // Обновляем состояние при вводе
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onAdd={(product) => console.log("Добавлено:", product)} />
        )}
        ListEmptyComponent={
          <Text style={{
            marginTop: 10,
            textAlign: 'center'
          }}>Ничего не найдено</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore} // Обработчик прокрутки до конца
        onEndReachedThreshold={0.1} // Порог срабатывания (10% от конца)
        ListFooterComponent={() =>
          loadingMore ? <ActivityIndicator size="small" color="#6200ee" /> : null
        } // Индикатор загрузки
      />
    </View>
  );
}

export default ShowCaseScreen;
