import { View, Text, StyleSheet } from 'react-native';

export function Header() {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>Cotação</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#ffca2c",
        width: 414,
        height: 100,
        display: "flex"
    },
    title: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 50,
        marginTop: 10,
        textAlign: "center",
        textShadowColor: "#e98b1b",
        textShadowRadius: 1,
        textShadowOffset: { width: -4, height: 0 },
    }
  });