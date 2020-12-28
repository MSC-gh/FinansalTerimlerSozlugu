import React from "react";
import { TouchableOpacity } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Firebase from "./Firebase";
import { AuthContext } from "./context";
import SignIn from "./screens/Login";
import CreateAccount from "./screens/Signup";
import SplashScreen from "./screens/Splash";
import NewsScreen from "./screens/News";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import WordDetailScreen from "./screens/WordDetail";
import FavoriteWordDetailScreen from "./screens/FavoriteWordDetail";
import FavoriteScreen from "./screens/Favorite";
import DovizKurlariScreen from "./screens/DovizKurlari";
import AdminScreen from "./screens/Admin";

// giriş ve kayıt ekranları
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Giriş", headerShown: false }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Kayıt Ol", headerShown: false }}
    />
  </AuthStack.Navigator>
);

// tab navigatoru yaratılıyor.
const Tabs = createBottomTabNavigator();

//home stack ekranları yaratılıyor
const HomeStack = createStackNavigator();

// anasayfa stackleri tanımlanıyor
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Anasayfa"
      component={Home}
      options={({ navigation }) => ({
        // başlık ve menü açma iconu tanımlanıyor
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Ionicons name="grid-outline" size={18} color="blue" />
          </TouchableOpacity>
        ),
      })}
    />
    <HomeStack.Screen name="WordDetail" component={WordDetailScreen} />
    <HomeStack.Screen
      name="FavoriteWordDetail"
      component={FavoriteWordDetailScreen}
    />
  </HomeStack.Navigator>
);

// profil stack ekrani
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profilim" component={Profile} />
    <ProfileStack.Screen name="Admin" component={AdminScreen} />
  </ProfileStack.Navigator>
);

// haberler ekranı
const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen name="Haberler" component={NewsScreen} />
  </NewsStack.Navigator>
);

// favori kelimeler ekranı
const FavoriteStack = createStackNavigator();
const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen name="Favorilerim" component={FavoriteScreen} />
  </FavoriteStack.Navigator>
);

// döviz kurları ekranı
const DovizKurlariStack = createStackNavigator();
const DovizKurlariStackScreen = () => (
  <DovizKurlariStack.Navigator>
    <DovizKurlariStack.Screen name="Döviz" component={DovizKurlariScreen} />
  </DovizKurlariStack.Navigator>
);

// tab navigator içerisinde görüntülenecek ekranlar tanımlanıyor.
// varsayılan ekran Anasayfa
const TabsScreen = () => (
  <Tabs.Navigator
    initialRouteName="Anasayfa"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconName;

        if (route.name === "Anasayfa") {
          iconName = focused ? "md-home" : "md-home";
        } else if (route.name === "Haberler") {
          iconName = focused ? "ios-list" : "ios-list";
        } else if (route.name === "Search") {
          iconName = focused ? "ios-search" : "ios-search";
        } else if (route.name === "Profil") {
          iconName = focused ? "ios-person" : "ios-person";
        } else if (route.name === "Favorilerim") {
          iconName = focused ? "ios-heart" : "ios-heart";
        } else if (route.name === "Döviz") {
          iconName = focused ? "ios-stats-chart" : "md-stats-chart";
        }
        return (
          <Ionicons name={iconName} size={size} color="rgb(10, 132, 255)" />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: "blue",
      inactiveTintColor: "gray",
    }}
  >
    <Tabs.Screen name="Anasayfa" component={HomeStackScreen} />
    <Tabs.Screen name="Favorilerim" component={FavoriteStackScreen} />
    <Tabs.Screen name="Döviz" component={DovizKurlariStackScreen} />
    <Tabs.Screen name="Haberler" component={NewsStackScreen} />
    <Tabs.Screen name="Profil" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

// sol menü - kayan çekmece menü yarat
// içerisine görüntülenecek sayfaları göster.
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Anasayfa">
    <Drawer.Screen
      name="Anasayfa"
      component={TabsScreen}
      options={{
        drawerIcon: () => <Ionicons name="md-home" size={24} color="blue" />,
      }}
    />
    <Drawer.Screen
      name="Profil"
      component={ProfileStackScreen}
      options={{
        drawerIcon: () => <Ionicons name="md-person" size={24} color="blue" />,
      }}
    />
  </Drawer.Navigator>
);

// kök stack
// tüm ekranları içerisinde barındırır.
// eğer kullanıcı giriş yaptı ise drawerscreen ve diğer ekranları gösterir
// eğer kullancıı giriş yapmadı ise login ve signup ekranlarını görüntüler
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

// app.js buradan başlar
export default () => {
  const [isLoading, setIsLoading] = React.useState(true); // yükleniyor state
  const [userToken, setUserToken] = React.useState(null); // kullanıcı giriş yapmış mı bilgisi tutan state

  // tüm uygulama boyunca kullanılacak sign out fonk tanımlanıyor
  const authContext = React.useMemo(() => {
    return {
      signOut: () => {
        Firebase.auth().signOut(); // firebase çıkış
        setIsLoading(false); // yükleniyor iconu gizlenir
        setUserToken(false); // çıkış yapıldığı için userToken unset edilir.
      },
    };
  }, []);

  //app.js initalize
  React.useEffect(() => {
    setTimeout(() => {
      // kullanıcı aktif mi aktif ise user bilgilerini true
      Firebase.auth().onAuthStateChanged((user) => {
        setUserToken(user ? true : false); // kullanıcı giriş yapmış bilgisi set et
        setIsLoading(false); // yükleniyor iconu gizlenir
      });
    }, 1000);
  }, []);

  // yükleniyor iconu goster
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
