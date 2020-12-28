// kullanıcı kayıt ekranı
import React from "react";
import { Text, View, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { StackActions } from "@react-navigation/native";
import styles from "../styles/LoginStyle";

// ekran genişliğini al
const { width, height } = Dimensions.get("window");

export default class SignUpScreen extends React.Component {
  state = {
    email: "", // email bilgisini tutacak state
    name: "", // ad soyad bilgisini tutacak state
    password: "", // şifre bilgisini tutacak state
  };

  // yeni kullanıcı oluşturacak fonksiyon
  // firebase auth kullanıldı
  signUpApp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password) // email ve şifre ile kullanıcıyı kayıt et
      .then((auth) => {
        // kayıt basarılı ise kullanıcıyı veritabanına users tablosuna ekle
        let uid = auth.user.uid;
        this.createUser(uid);

        // yeni eklenen kullanıcının ad soyad bilgisini set et
        auth.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((err) => {
        // hata olursa uyarı ver
        this.setState({ loading: false });
        console.log(err);
        Alert.alert("Oops", "Kayıt Olunamadı. Lütfen tekrar deneyiniz.", [
          { text: "Tamam" },
        ]);
      });
  };

  // firebase veritabanında kullanıcı oluşturan fonksiyon
  // veritabanında oluşturmamızı sebebi rol tanımı yapabilmek firebase auth role tanımı desteklemez???
  createUser = (uid) => {
    firebase.database().ref("users").child(uid).set({
      email: this.state.email,
      uid: uid,
      name: this.state.name,
      role: "user",
    });
  };

  render() {
    return (
      // görsel arayüz tanımı
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.logoText}>Finansal Terimler Sözlüğü</Text>
        <View
          style={{
            width: width,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Kayıt Ol
          </Text>
        </View>
        <View
          style={{
            margin: 25,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Input
            placeholder="Ad Soyad"
            style={{
              paddingVertical: 5,
              borderBottomWidth: 0.5,
              borderColor: "lightgray",
              color: "#00aced",
            }}
            underlineColorAndroid="transparent"
            onChangeText={(name) => this.setState({ name: name })}
            value={this.state.name}
            placeholderTextColor="gray"
          />
          <Input
            placeholder="E-posta"
            style={{
              width: width - 20,
              paddingVertical: 5,
              borderBottomWidth: 0.5,
              borderColor: "lightgray",
              color: "#00aced",
            }}
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
              width: width - 20,
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
        </View>
        <View style={{ width: width, alignItems: "center" }}>
          <Button
            onPress={() => this.signUpApp()}
            title="Kayıt"
            buttonStyle={{
              width: width - 75,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={
              /*buradaki butona tıklandığında giriş ekranına yönlendirilir*/ () =>
                this.props.navigation.dispatch(StackActions.pop(1))
            }
          >
            <Text style={{ fontSize: 12, color: "#000" }}>
              Hesabınız var mı?{" "}
              <Text style={{ fontWeight: "bold", fontSize: 12, color: "#000" }}>
                Giriş Yap
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
