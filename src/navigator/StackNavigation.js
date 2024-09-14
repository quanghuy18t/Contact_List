import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import colors from "../utility/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Favorites from "../screens/Favorites";
import Options from "../screens/Options";
import { createDrawerNavigator } from "@react-navigation/drawer";
import User from "../screens/User";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{color: tintColor}} />
)

const ContactsScreens = () => {

  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name='Contacts' 
        component={Contacts} 
        options={{title: 'Contacts'}} 
      />
      <Stack.Screen 
        name='Profile' 
        component={Profile} 
        options={({route}) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            }
          };
        }} 
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Favorites" 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Favorites' component={Favorites} options={{title: 'Favorites'}} />
      <Stack.Screen name='Profile' component={Profile} options={{title: 'Profile'}} />
    </Stack.Navigator>
  );
};

const UserScreen = ({navigation}) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen 
        name="User" 
        component={User} 
        options={{
          headerTitle: t('me'),
          headerTintColor: 'white',
          headerStyle: {backgroundColor: colors.blue},
          headerRight: () => (
            <MaterialIcons
              name='settings'
              size={24}
              style={{color: 'white', marginRight: 10}}
              onPress={() => navigation.navigate('Option')}
            />
          )
        }}
      />
      <Stack.Screen name="Option" component={Options} options={{title: t('option')}} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

export default function StackNavigation() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName='Contact'
      >
        <Drawer.Screen 
          name='Contact' 
          component={ContactsScreens} 
          options={{
            drawerIcon: getDrawerItemIcon('list'),
            title: t('contact')
          }} 
        />
        <Drawer.Screen 
          name='Favorite' 
          component={FavoritesScreens} 
          options={{
            drawerIcon: getDrawerItemIcon('star'),
            title: t('favorite')
          }}
        />
        <Drawer.Screen 
          name='Users' 
          component={UserScreen} 
          options={{
            drawerIcon: getDrawerItemIcon('person'),
            title: t('user')
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}