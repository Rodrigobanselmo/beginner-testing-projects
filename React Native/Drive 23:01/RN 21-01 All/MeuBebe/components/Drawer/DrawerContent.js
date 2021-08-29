import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export function DrawerContent(props) {

    const [ dark, setDark ] = useState(false);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const Logout = () => {
        console.log(user)
        dispatch({
            type: 'LOGOUT_USER',
        });
        
        props.navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [
                { name: 'SignStack' }
            ],
            })
        );

        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        
        signOut = async () => {
          try {
            await GoogleSignin.revokeAccess();
          } catch (error) {
            console.error(error);
          }
        };
    
        signOut()
        
        

    }

    const toggleTheme = () => {
        setDark(!dark);
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{ uri: user.photoURL }}                                
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Gamma Jr.</Title>
                                <Caption style={styles.caption}>@gammajrengenharia</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>26</Paragraph>
                                <Caption style={styles.caption}>Menbros</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
                                <Caption style={styles.caption}>Projetos</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                                            <DrawerItem 
                                                icon={({color, size}) => (
                                                    <Icon 
                                                    name="home-outline" 
                                                    color={color}
                                                    size={size}
                                                    />
                                                )}
                                                label="Home"
/*                                                 onPress={() => {props.navigation.navigate('Home')}} */
                                            />
                                            <DrawerItem 
                                                icon={({color, size}) => (
                                                    <Icon 
                                                    name="account-outline" 
                                                    color={color}
                                                    size={size}
                                                    />
                                                )}
                                                label="Profile"
/*                                                 onPress={() => {props.navigation.navigate('Profile')}} */
                                            />
                                            <DrawerItem 
                                                icon={({color, size}) => (
                                                    <Icon 
                                                    name="bookmark-outline" 
                                                    color={color}
                                                    size={size}
                                                    />
                                                )}
                                                label="Bookmarks"
/*                                                 onPress={() => {props.navigation.navigate('BookmarkScreen')}} */
                                            />
                                            <DrawerItem 
                                                icon={({color, size}) => (
                                                    <Icons 
                                                    name="ios-settings-outline" 
                                                    color={color}
                                                    size={size}
                                                    />
                                                )}
                                                label="Settings"
/*                                                 onPress={() => {props.navigation.navigate('SettingsScreen')}} */
                                            />
                                            <DrawerItem 
                                                icon={({color, size}) => (
                                                    <Icon 
                                                    name="account-check-outline" 
                                                    color={color}
                                                    size={size}
                                                    />
                                                )}
                                                label="Support"
/*                                                 onPress={() => {props.navigation.navigate('SupportScreen')}} */
                                            />
                                        </Drawer.Section>
                                        <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={Logout}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
