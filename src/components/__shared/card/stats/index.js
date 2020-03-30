import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';

// Sub Component for Employee Card
const Stats = ({styles,comments,likes,setShowComments}) => {
    return (
        <View style={styles.statsContainer}>
        <Text style={styles.likeStat}>{`${likes.length} ${
          likes.length === 1 ? "like" : "likes"
        }`}</Text>
        <TouchableOpacity onPress={() => setShowComments(true)}>
          <Text style={styles.commentStat}>{`${comments.length} ${
            comments.length === 1 ? "comment" : "comments"
          }`}</Text>
        </TouchableOpacity>
      </View>
    );
}

export default Stats;