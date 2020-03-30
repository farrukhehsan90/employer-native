import React from 'react';
import { View,Text } from 'react-native';
import Avatar from '../../avatar/Avatar';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

// Sub Component for Employee Card
const CommentBox = ({styles,item}) => {
    return (
        <View style={styles.commentContainer}>
        <Avatar
          source={item.image}
          style={styles.commentAvatar}
          isAvatar
        />
        <TextInput
          placeholder="Write a comment"
          style={styles.commentInput}
        />
        <Ionicons name="ios-send" size={20} />
      </View>
    );
}

export default CommentBox;