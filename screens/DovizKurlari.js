// Döviz kurlarını web servisten alır
// Ekranda gösterir.
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

function DovizKurlari() {
  const [doviz, setDoviz] = useState([]); // doviz state doviz bilgisi tutar
  const [yukleniyor, setYukleniyor] = useState(true); // sayfa yukleniyor iconu göster/gizle için kullanılır.

  // component yüklendiğinde
  // https://finans.truncgil.com/today.json web servisinden döviz kurlarını anlık olarak çeker.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("https://finans.truncgil.com/today.json") // verileri çek
        .then((response) => response.json()) //jsona dönüştür.
        .then((json) => {
          // işlemlerden sonra döviz dizisini(state) set et
          setDoviz(json);
          setYukleniyor(false); //yukleniyoru kapat
        })
        .catch((error) => {
          console.error(error);
        });
    }, 3000);
    return () => clearTimeout(timer); // timer sıfırlar
  }, [doviz]);

  return (
    <ScrollView style={styles.container}>
      {yukleniyor ? ( // datalar getiriliyor ise yukleniyor iconunu göster
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color="blue"
            textContent="Yükleniyor..."
          />
        </View>
      ) : (
        // datalar yüklendi ise döviz kurlarını ekrana bas
        // her döviz kuru card şeklinde ekranda gösterilir.
        <View style={styles.boxW}>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              USD/TL
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["ABD DOLARI"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["ABD DOLARI"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              EURO/TL
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["EURO"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["EURO"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Ons Altın $
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Ons Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Ons Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Gram Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Gram Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Gram Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Çeyrek Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Çeyrek Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Çeyrek Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Yarım Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Yarım Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Yarım Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Tam Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Tam Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Tam Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Cumhuriyet Altını
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Cumhuriyet Altını"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Cumhuriyet Altını"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Ata Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Ata Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Ata Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              İkibuçuk Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["İkibuçuk Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["İkibuçuk Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Gremse Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Gremse Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Gremse Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Beşli Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Beşli Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Beşli Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              14 Ayar Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["14 Ayar Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["14 Ayar Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              18 Ayar Altın
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["18 Ayar Altın"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["18 Ayar Altın"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              22 Ayar Bilezik
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["22 Ayar Bilezik"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["22 Ayar Bilezik"].Satış}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Gümüş
            </Text>

            <View style={styles.boxIn}>
              <Text>Alış</Text>
              <Text>{doviz["Gümüş"].Alış}</Text>
            </View>
            <View style={styles.boxIn}>
              <Text>Satış</Text>
              <Text>{doviz["Gümüş"].Satış}</Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.veriKaynagiAciklamaTextStyle}>
              Kur bilgileri https://finans.truncgil.com/today.json adresinden{" "}
              {new Date().toUTCString()} tarihinde alınmıştır.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// stil yapılandırmaları
const styles = StyleSheet.create({
  container: {},
  boxW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    flexWrap: "wrap",
  },
  box: {
    width: "48%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
  boxIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  veriKaynagiAciklamaTextStyle: {
    color: "gray",
    fontSize: 7.5,
    textAlign: "center",
  },
});
export default DovizKurlari;
