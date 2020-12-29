// web servis üzerinden türkiye gündemini haberleri çeker
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";
import prettyTime from "../utils/PrettyTime";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem, Avatar } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

const NewsScreen = ({ navigation }) => {
  const [headlines, setHeadlines] = useState({}); // haber başlıklarını tutan state
  const [refreshing, setRefreshing] = useState(false); // sayfa yenileme değişkenini tutan state
  const [visible, setVisible] = useState(false); // görüntüleme bilgisi tutan değişken

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const category = "general"; // haber kategorisi
  const country = "tr"; // ülke
  const API_KEY = "23fb07474d034e25977bc0c34e337153"; // api key
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`; // web servis adresi

  //haberleri çek
  useEffect(() => {
    fetchData();
  }, []);

  // haberleri web servisten çek
  async function fetchData() {
    (await fetch(url)).json().then((res) => setHeadlines(res));
  }

  // başlıktaki websitesi adresini sil
  function removeSource(title) {
    if (title == null || title.indexOf(" - ") < 0) return title;
    var parts = title.split(" - ");
    parts.pop();
    return parts.join(" - ");
  }

  // habere tıklandığında haber url'yi aç
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  // haber listesi itemlerini oluştur
  function renderItem({ item }) {
    return (
      <ListItem
        key={item}
        bottomDivider
        onPress={() => {
          //tıklandığında fonksiyon çalıştır
          _handlePressButtonAsync(item.url);
        }}
      >
        <Avatar size="large" source={{ uri: item.urlToImage }} />
        <ListItem.Content>
          <ListItem.Title>{removeSource(item.title)}</ListItem.Title>
          <View style={{ marginTop: 15 }} />
          <ListItem.Subtitle>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="newspaper" size={15} style={{ paddingRight: 5 }} />
              <Text>{item.source.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Icon
                name="clock-outline"
                size={15}
                style={{ paddingRight: 5 }}
              />
              <Text>{prettyTime(item.publishedAt)}</Text>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={headlines.articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        onRefresh={() => {
          // refresh yap bazen hata verebilir nedenini bulamadım
          setRefreshing(true);
        }}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default NewsScreen;
