import {Text, View, ScrollView, Pressable, Alert} from 'react-native';
import * as styles from '../css/SocialScreen.module.css';
import * as globalStyles from '../css/globals.css';
import {Ionicon} from '../assets/Ionicons';

const SocialScreen = () => {
  return (
    <><View style={globalStyles.banner}>
      <Text style={globalStyles.bannerText}>Social</Text>
    </View>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Nearby Users</Text>
        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>

        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>

        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>

        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>

        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>

        <Pressable style={styles.profileContainer} onPress={() => Alert.alert("Chat opened")}>
            <View style={styles.profileImageContainer}>
                <Ionicon
                size="extraLarge"
                color="black"
                name="person-outline"
            />
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileDetails}>100 points</Text>
                <Text style={styles.profileDetails}>50m away</Text>
            </View>
        </Pressable>
        
    </ScrollView>
    </>
  );
};

export default SocialScreen;
