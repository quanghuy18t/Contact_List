import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsError, fetchContactsLoading, fetchContactsSuccess } from '../store/store';

const keyExtractor = ({phone}) => phone;

export default function Favorites({ navigation }) {
  const contacts = useSelector(state => state.contacts);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
    .then(
      contacts => {
        dispatch(fetchContactsSuccess(contacts));
      }
    )
    .catch(
      error => {
        dispatch(fetchContactsError());
      }
    )
  }, []);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail 
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  const favorites = contacts.slice().filter(contact => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size={'large'} />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList 
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});