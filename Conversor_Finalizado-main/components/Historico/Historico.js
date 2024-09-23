import { View, Text, StyleSheet, Button } from 'react-native';

export function Historico() {
    return (
        <View style={styles.background}>
            <Button title="Conversor" onPress={() => navigation.navigate('Conversor')} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Text style={styles.title}>Histórico</Text>
            <div style={styles.box}>

            </div>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#101f54",
        width: 414,
        height: 796,
        display: "flex",
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
    },
    box: {
        width: 400,
        height: 500,
        backgroundColor: "#ffca2c",
        margin: 'auto',
        marginTop: 20,
        borderRadius: 20,
    },
})