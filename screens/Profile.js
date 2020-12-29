// kullanıcının bilgilerini görüntüleyebileceği
// admin kullanıcının kelime ekleme ekranına erişebilceği
// ve şifre değiştirilen ekran
import React from "react";
import { AuthContext } from "../context";
import { Text, Avatar, Card } from "react-native-elements";
import {
  StyleSheet,
  Share,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Firebase from "../Firebase";

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext); // çıkış fonk contextten eriş
  const [loading, setLoading] = React.useState(true); // yükleniyor iconu için
  const [userRole, setUserRole] = React.useState(false); // kullanıcı rolünü tutan state
  const [currentPassword, setCurrentPassword] = React.useState(); // mevcut şifre state
  const [newPassword, setNewPassword] = React.useState(); // yeni şifre tutacak state

  React.useEffect(() => {
    // kullanıcı rolünü getir
    Firebase.database()
      .ref("users/" + Firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot.child("role").val() == "admin") {
          setUserRole(true);
        }
      });

    // yükleniyor resmini gizle
    setLoading(false);

    // Üst barda başlık bilgisi değişiyor
    // üst bara çekmece menüyü açacak buton ekleniyor.
    navigation.setOptions({
      title: "Profil",
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => {
            // çekmece(sol) menüsünü aç kapat butonu
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={18} color="blue" />
        </TouchableOpacity>
      ),
    });
  }, []);

  // paylaşım butonu basıldığında paylaşım ekranı gelir.
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Finansal Terimler Sözlüğü çok güzel kesinlikle denemelisin.\n\nhttp://www.google.com",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // sayfa yüklenirken yükleniyor resm çıkar.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // kullanıcı şifre değiştirme
  function changePassword() {
    if (currentPassword == "" || newPassword == "") {
      alert("Gerekli alanları doldurunuz!");
    } else {
      //şifre değiştirmek için tekrar girmek gerekiyor.
      Firebase.auth()
        .currentUser.updatePassword(newPassword)
        .then(function () {
          currentPassword = "";
          newPassword = "";
          alert("Şifreniz değiştirildi! Yeniden giriş yapınız.");
        })
        .catch(function (error) {
          alert("Şifreniz değiştirilemedi! " + error);
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <Avatar
            title={Firebase.auth().currentUser.displayName.substring(0, 2)}
            size={80}
            containerStyle={{ backgroundColor: "gray" }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.title}>
              {Firebase.auth().currentUser.displayName}
            </Text>
            <Text style={styles.caption}>
              {Firebase.auth().currentUser.email}
            </Text>
            <Text style={styles.caption1}>
              {Firebase.auth().currentUser.uid}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        {userRole ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Admin");
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="format-annotation-plus" color="blue" size={25} />
              <Text style={styles.menuItemText}>Kelime Ekle</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorilerim");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="blue" size={25} />
            <Text style={styles.menuItemText}>Favori Kelimelerim</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="blue" size={25} />
            <Text style={styles.menuItemText}>Arkadaşlarına Tavsiye Et</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("Finansal Terimler Sözlüğü v1.0");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="information-outline" color="blue" size={25} />
            <Text style={styles.menuItemText}>Hakkında</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="blue" size={25} />
            <Text style={styles.menuItemText}>Çıkış</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Card>
        <Card.Title>Şifre Değiştir</Card.Title>
        <TextInput
          placeholder="Eski Şifre"
          style={styles.textInputStyle}
          errorStyle={{ color: "red" }}
          underlineColorAndroid="transparent"
          onChangeText={setCurrentPassword}
          value={currentPassword}
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Yeni Şifre"
          style={styles.textInputStyle}
          errorStyle={{ color: "red" }}
          underlineColorAndroid="transparent"
          onChangeText={setNewPassword}
          value={newPassword}
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <View
          style={{
            width: Dimensions.get("window").width - 75,
            height: 45,
            marginTop: 10,
          }}
        >
          <Button onPress={changePassword} title="Şifre Değiştir" />
        </View>
      </Card>
    </ScrollView>
  );
}

// stil tanımlamarı
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
  },
  caption1: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  textInputStyle: {
    width: Dimensions.get("window").width - 75,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
    color: "#00aced",
  },
});
