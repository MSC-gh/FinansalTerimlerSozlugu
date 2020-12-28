// kelimelerin listelendiği ekran
import React, { Component } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../Firebase";

export default class Fetch extends Component {
  // state tanımlamaları yapılıyor.
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  // component yüklendiğinde
  // kelimeler firebae database'den getiriliyor.
  // list state'e atılıyor.
  componentDidMount() {
    firebase
      .database()
      .ref("kelimeler")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            kelime: child.val().kelime,
            aciklama: child.val().aciklama,
            harf: child.val().harf,
          });
        });
        this.setState({ list: li });
      });
  }

  //flatlist itemları render ediliyor.
  // listedeki her kelimeye karşılık bir satır oluşturulur.
  renderItem({ item }) {
    return (
      <ListItem
        key={item}
        bottomDivider
        onPress={() => {
          //kelimeye tıklandığında WordDetail ekranına geçer
          // parametre olarak aciklama ve kelime gönderir diğer ekrana
          this.props.navigation.navigate("WordDetail", {
            url: item.aciklama,
            title: item.kelime,
          });
        }}
      >
        <Avatar rounded title={item.kelime} />
        <ListItem.Content>
          <ListItem.Title>{item.kelime}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  }

  render() {
    return (
      // safearea scrollview gibi çalışır.
      // flatlist tanımlanıyor.
      // flatlistin datası list state
      // renderItem her satırı oluşturacak renderItem fonksiyonunu gösterir.
      <SafeAreaView>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.list}
          keyExtractor={(item) => item.key}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}
