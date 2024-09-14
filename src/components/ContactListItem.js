import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import colors from '../utility/colors'

export default function ContactListItem({ name, avatar, phone, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        <Image 
          style={styles.avatar}
          source={{ uri: avatar }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 24,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4,
  },
});