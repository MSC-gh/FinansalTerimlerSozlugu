// favori kelimeyi görüntüler
import React from "react";
import {
  Share,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Firebase from "../Firebase";

export default function WordDetail({ route, navigation }) {
  const { kelime, aciklama, favori, key } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: kelime });
  }, []);

  // kelimeyi sosyal medya, wp, mail vb. ortamlarda paylaşmaya yarar.
  // kodlandığı esnada play store linki olmadığı için ekleyemedik
  // sonraki güncellemede adresi ekleyerek paylaşılan kişinin indirmesi sağlanabilir.
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: kelime + ": " + aciklama + "\n Finansal Terimler Sözlüğü",
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

  return (
    <View>
      <Card>
        <Card.Title>{JSON.stringify(kelime)}</Card.Title>
        <Card.Divider />
        <Text style={{ paddingBottom: 25, textAlign: "center" }}>
          {JSON.stringify(aciklama)}
        </Text>
        <Card.Divider />
        <View style={styles.boxW}>
          <View style={styles.box}>
            <View style={styles.boxIn}>
              <TouchableHighlight
                onPress={() => {
                  //favori kelimelerden kelimenin kaldırılması sağlanır
                  // bunun için kelime bilgisi firebase databaseden silinir.
                  Firebase.database()
                    .ref(
                      "kelimelerim/" +
                        Firebase.auth().currentUser.uid +
                        "/" +
                        key
                    )
                    .remove()
                    .then((data) => {
                      // silme işlemi başarılı olduğunda uyarı verir.
                      console.log("data ", data);
                      alert("Kelime favorilerden kaldırıldı.");
                      navigation.navigate("Favorilerim");
                    })
                    .catch((error) => {
                      console.log("error ", error);
                    });
                }}
              >
                {favori ? ( // eğer kelime favorilerde ise kalp içersi dolu iconu gösterilir.
                  <View>
                    <Icon name="heart" size={24} color="pink" />
                  </View>
                ) : (
                  <View>
                    <Icon name="heart-outline" size={24} color="pink" />
                  </View>
                )}
              </TouchableHighlight>
              <TouchableHighlight onPress={onShare}>
                {/*paylaş butonuna basıldığında onShare fonksiyonu çalışır ve paylaşım ekranı gelir*/}
                <View>
                  <Icon name="share-social-outline" size={24} color="blue" />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

// stil yapılandırmaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
  },
  boxW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  box: {
    width: "25%",
    backgroundColor: "white",
  },
  boxIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
