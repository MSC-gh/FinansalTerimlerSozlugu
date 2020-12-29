// firebase auth kullanılarak hazırlanan kullanıcı giriş sayfası
import React from "react";
import { Text, View, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { StackActions } from "@react-navigation/native";
import styles from "../styles/LoginStyle";
import Firebase from "../Firebase";

// ekranın genişlik bilgisi alınıyor.
const { width } = Dimensions.get("window");

export default class LoginScreen extends React.Component {
  state = {
    email: "", // kullanıcı mail
    password: "", // kullanıcı şifre
  };

  loginApp = () => {
    if (
      // eğer email ve şifre boş veya null ise uyarı verir.
      this.state.email == null ||
      this.state.email == "" ||
      this.state.password == null ||
      this.state.password == ""
    ) {
      Alert.alert("Hata", "Kullanıcı Adı veya Şifre boş geçilemez!", [
        { text: "Tamam" },
      ]);
    } else {
      // eğer değilse yukleniyor iconu kaldır
      this.setState({ loading: false });

      // firebase auth ile email ve şifreye karşılık gelen kullanıcı olup olmadığını kontrol et.
      Firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
          this.setState({ loading: false });
          if (err.code === "auth/user-not-found") {
            // kullanıcı bulunamadı ise hata uyarısı ver
            Alert.alert(
              "Oops",
              "Eposta adresi ile kayıtlı kullanıcı bulunamadı!",
              [{ text: "Tamam" }]
            );
          } else if (err.code === "auth/wrong-password") {
            // şifre yanlış ise hata mesajı göster
            Alert.alert("Oops", "Şifreniz hatalıdır!", [{ text: "Tamam" }]);
          } else {
            // bunların dışında bir hata meydana geldi ise hata mesajını görüntüle
            Alert.alert("Oops", "Bilinmeyen hata!\n" + err.message, [
              { text: "Tamam" },
            ]);
          }
        });
    }
  };

  // kullanıcı kayıtlı değil ise kayıt olmak için kayıt ol butonuna tıklandığında çalışır
  // kullanıcı kayıt sayfasında yönlendirir
  goSignUp = () => {
    const pushAction = StackActions.push("CreateAccount");
    this.props.navigation.dispatch(pushAction);
  };

  render() {
    return (
      // kullancıı giriş form tanımlamaları
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: width,
            padding: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.logoText}>Finansal Terimler Sözlüğü</Text>
          <View
            style={{
              width: width,
              alignContent: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Giriş
            </Text>
          </View>
          <Input
            placeholder="E-posta adresi"
            style={{
              width: width,
              paddingVertical: 5,
              borderBottomWidth: 0.5,
              borderColor: "lightgray",
              color: "#00aced",
            }}
            errorStyle={{ color: "red" }}
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
            keyboardType="email-address"
            placeholderTextColor="gray"
            autoCapitalize="none"
          />
          <Input
            placeholder="Şifre"
            style={{
              paddingVertical: 5,
              borderBottomWidth: 0.5,
              borderColor: "lightgray",
              color: "#00aced",
            }}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({ password: password })}
            value={this.state.password}
            secureTextEntry
            placeholderTextColor="gray"
          />
          <View style={{ width: width, alignItems: "center", padding: 25 }}>
            <Button // kullanıcı girişr butonu tıklandığında loginApp fonk çalışır.
              onPress={() => this.loginApp()}
              title="Giriş"
              buttonStyle={{
                width: width - 75,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <TouchableOpacity
              onPress={() => this.goSignUp()}
              style={{ marginTop: 15 }}
            >
              <Text style={{ fontSize: 12, color: "#000" }}>
                Hesabın mı yok?{" "}
                <Text
                  style={{ fontWeight: "bold", fontSize: 12, color: "#000" }}
                >
                  Kayıt Ol!
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
