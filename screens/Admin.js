// Yönetim ekranı bu ekrana yalnızca admin kullanıcılar erişebilir.
// veritabanına kelime eklemek için kullanılır.
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import Firebase from "../Firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

// ekran genişliği alınıyor.
const { width } = Dimensions.get("window");

export default function Admin2({ navigation }) {
  const [kelime, setKelime] = React.useState(""); // kelime state
  const [aciklama, setAciklama] = React.useState(""); // açıklama state
  const [harf, setHarf] = React.useState(""); // harf state

  React.useEffect(() => {
    // navigation bar başlık ve sağ menü tanımlamaları yapılıyor.
    // saü menüde ana sayfa butonu ekleniyor.
    navigation.setOptions({
      title: "Yönetim Paneli",
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => {
            navigation.navigate("Anasayfa");
          }}
        >
          <Ionicons name="md-home" size={18} color="blue" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // girilen kelime, açıklama ve harf bilgilerini firebase rtdb'ye kaydetmek için
  function save() {
    // eğer istenilen bilgiler boş ise uyarı ver
    // değilse girilen bilgileri firebae rtdb'ye kaydet.
    if (kelime == "" || aciklama == "" || harf == "") {
      alert("Gerekli alanları doldurunuz!");
    } else {
      Firebase.database()
        .ref("kelimeler")
        .push({
          kelime,
          aciklama,
          harf,
        })
        .then((data) => {
          // kayıt işlemi başarılı olduğunda
          setKelime("");
          setAciklama("");
          setHarf("");
          alert("Kelime sözlüğe eklendi!");
        })
        .catch((error) => {
          // kayıt işlemi esnasında hata olduğunda
          alert("Kelime sözlüğe eklenemedi!");
          console.log("error ", error);
        });
    }
  }

  return (
    // bilgi giriş ekranı tasarımı
    <View style={styles.container}>
      <Text style={styles.title}>Yönetim Paneli</Text>
      <Text style={styles.subTitle}>Kelime Ekle</Text>
      <TextInput
        placeholder="Kelime"
        style={styles.textInputStyle}
        errorStyle={{ color: "red" }}
        underlineColorAndroid="transparent"
        onChangeText={(data) => {
          setKelime(data);
          setHarf(data.substring(0, 1));
        }}
        value={kelime}
        placeholderTextColor="gray"
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Açıklama"
        style={styles.textInputStyle}
        errorStyle={{ color: "red" }}
        underlineColorAndroid="transparent"
        onChangeText={setAciklama}
        value={aciklama}
        placeholderTextColor="gray"
        autoCapitalize="none"
      />
      <View style={{ width: width - 75, height: 45, marginTop: 10 }}>
        <Button onPress={save} title="Kaydet" />
      </View>
    </View>
  );
}

// stil tanımlamaları yapılıyor.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    width: width - 75,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
    color: "#00aced",
  },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 25 },
});
