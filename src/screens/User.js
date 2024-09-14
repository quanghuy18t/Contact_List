import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchUserContact } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { avatar, name, phone } = user;

  useEffect(() => {
    fetchUserContact()
    .then(
      users => {
        setUser(users);
        setLoading(false);
        setError(false);
      }
    )
    .catch(
      err => {
        setLoading(false);
        setError(true);
      }
    )
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size={'large'} />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  }
})