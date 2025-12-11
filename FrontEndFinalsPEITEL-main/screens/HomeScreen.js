// frontend/screens/HomeScreen.js (FINAL FIX: Passing navigation to MediaList)

import React, { useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { AuthContext } from '../context/AuthContext'; 

// Import your existing MediaList component
import MediaList from './MediaList'; 

const HomeScreen = ({ navigation }) => {
    // HomeScreen receives the 'navigation' prop automatically from the stack navigator
    
    const { userInfo, logout } = useContext(AuthContext); 

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                {/* *** CRITICAL FIX APPLIED HERE ***
                  We explicitly pass the 'navigation' prop received by HomeScreen 
                  down to the MediaList component, allowing MediaList to navigate 
                  to 'MediaEdit' and 'MediaAdd' screens.
                */}
                <MediaList navigation={navigation} /> 

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutButtonText}>LOGOUT ({userInfo.username})</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa', 
    },
    container: {
        flex: 1,
        width: '100%',
    },
    logoutButton: {
        width: '100%',
        padding: 16,
        backgroundColor: '#dc3545',
        borderRadius: 0,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});

export default HomeScreen;