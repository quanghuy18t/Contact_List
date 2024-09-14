import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utility/colors';
import { useTranslation } from 'react-i18next';

export default function Profile({ route }) {
  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon='mail' title={t('email')} subTitle={email} />
        <DetailListItem icon='phone' title={t('work')} subTitle={phone} />
        <DetailListItem icon='smartphone' title={t('personal')} subTitle={cell} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
})