
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Header } from './components/Header';

export default function App() {
  return (
    <View style={styles.background}>
      <Header/>
      <div style={styles.primeiros}>
        <div style={styles.card}>
          <Text style={styles.moeda}>R$</Text>
          <div style={styles.nome}>Real</div>
        </div>
        <div style={styles.card}>
          <Text style={styles.moeda}>US$</Text>
          <div style={styles.nome}>Dólar</div>
        </div>
      </div>
      <div style={styles.outros}>
        <div style={styles.card}>
          <Text style={styles.moeda}>€</Text>
          <div style={styles.nome}>Euro</div>
        </div>
        <div style={styles.card}>
          <Text style={styles.moeda}>¥</Text>
          <div style={styles.nome}>Iene</div>
        </div>
      </div>
      <div style={styles.outros}>
        <div style={styles.card}>
          <Text style={styles.moeda}>£</Text>
          <div style={styles.nome}>Libra</div>
        </div>
        <div style={styles.card}>
          <Text style={styles.moeda}>₺</Text>
          <div style={styles.nome}>Lira</div>
        </div>
      </div>
    </View>
  );

}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#101f54',
    width: 414,
    height: 896
  },
  primeiros: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 100
  },
  outros: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 30
  },
  card: {
    backgroundColor: '#ffca2c',
    width: 180,
    height: 180,
    borderRadius: 20,
    textAlign: "center",
    shadowColor: "#e98b1b",
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 0,
    shadowRadius: 30,
  },
  moeda: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 90,
    textShadowColor: "#e98b1b",
    textShadowRadius: 1,
    textShadowOffset: { width: -8, height: 0 },
  },
  nome: {
    color: "#ffffff",
    fontSize: 50,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textShadowColor: "#e98b1b",
    textShadowRadius: 1,
    textShadowOffset: { width: -8, height: 0 }
  }
});