import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsError, fetchContactsLoading, fetchContactsSuccess } from '../store/store';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import debounce from 'lodash.debounce';

const keyExtractor = ({ phone }) => phone;

export default function Contacts({ navigation }) {
  const contacts = useSelector(state => state.contacts);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const [textSearch, setTextSearch] = useState('');
  const [newContacts, setNewContacts] = useState(contacts);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const searchFromData = async (text) => {
    const lowerText = text.toLowerCase();
    return contacts.filter(item => 
      item.name.toLowerCase().includes(lowerText) ||
      item.phone.includes(lowerText)
    );
  };

  const debouncedSearch = useCallback(
    debounce(async (text) => {
      if (text) {
        const results = await searchFromData(text);
        setNewContacts(results);
      }
      else {
        setNewContacts(contacts);
      }
    }, 300),
    []
  );

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
    .then(
      contacts => {
        dispatch(fetchContactsSuccess(contacts));
        setNewContacts(contacts);
      }
    )
    .catch(
      err => {
        dispatch(fetchContactsError());
      }
    )
  }, []); 

  const contactsSorted = newContacts.slice().sort((a,b) => a.name.localeCompare(b.name));
  const renderContact = ({item}) => {
    const { name, avatar, phone } = item;
    return <ContactListItem 
            name={name}
            avatar={avatar}
            phone={phone}
            onPress={() => navigation.navigate('Profile', { contact: item })}
          />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchContent}>
          <Feather name='search' size={25} color='black' />
          <TextInput 
            style={styles.textInputSearch}
            placeholder={t('search')}
            value={textSearch}
            onChangeText={(text) => {
              setTextSearch(text);
              debouncedSearch(text);
            }}
          />
        </View>
      </View>
      {loading && <ActivityIndicator color='blue' size='large' />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  textInputSearch: {
    flex: 1,
    marginLeft: 8,
  },
});