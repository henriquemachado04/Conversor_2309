import * as React from 'react';
import { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, Text, Image, TextInput } from 'react-native';
import { Header } from './components/Header';
import { Dropdown } from 'react-native-element-dropdown';

// Contexto para o histórico de conversões
const HistoricoContext = createContext();

const data = [
  { label: 'Real', value: 'BRL' },
  { label: 'Dólar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'Iene', value: 'JPY' },
  { label: 'Libra', value: 'GBP' },
  { label: 'Lira', value: 'TRY' }
];

function HomeTela({ navigation }) {
  return (
    <View style={styles.background}>
      <Header />
      <div style={styles.primeiros}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Conversor')}>
          <Text style={styles.moeda}>Conversor</Text>
          <div />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Historico')}>
          <Text style={styles.moeda}>Histórico</Text>
          <div />
        </TouchableOpacity>
      </div>
      <div style={styles.outros}>
        <TouchableOpacity style={styles.cardMoe} onPress={() => navigation.navigate('Conversor')}>
          <div />
          <Text style={styles.nome}>Moedas Disponiveis</Text>
          <Text style={styles.descricao}>R$ ----------------- REAL</Text>
          <Text style={styles.descricao}>£ ------------------ LIBRA</Text>
          <Text style={styles.descricao}>€ ------------------ EURO</Text>
          <Text style={styles.descricao}>US$ ---------------- DOLAR</Text>
          <Text style={styles.descricao}>₤ ------------------ LIRA</Text>
        </TouchableOpacity>
      </div>
    </View>
  );
}

function ConversorTela({ navigation }) {
  const [cotacoes, setCotacoes] = useState({});
  const [valorOrigem, setValorOrigem] = useState('');
  const [valorConvertido, setValorConvertido] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('BRL');
  const [moedaDestino, setMoedaDestino] = useState('USD');
  const { historico, setHistorico } = useContext(HistoricoContext);

  const converterMoeda = async () => {
    try {
      let response, data, cotacao;
      if (moedaDestino === 'BRL') {
        response = await fetch(`https://economia.awesomeapi.com.br/last/${moedaOrigem}-BRL`);
        data = await response.json();
        cotacao = data[`${moedaOrigem}BRL`]?.bid;
      } else {
        response = await fetch(`https://economia.awesomeapi.com.br/last/${moedaDestino}-BRL`);
        data = await response.json();
        cotacao = data[`${moedaDestino}BRL`]?.bid;
      }

      console.log(data);
      setCotacoes(data);

      if (cotacao) {
        const valorConvertido = moedaDestino === 'BRL'
          ? valorOrigem * parseFloat(cotacao)
          : valorOrigem / parseFloat(cotacao);
        setValorConvertido(valorConvertido.toFixed(2));
        console.log(`Valor convertido: ${valorConvertido.toFixed(2)}`);

        // Adicionar a conversão ao histórico
        const novaConversao = {
          moedaOrigem,
          moedaDestino,
          valorOrigem,
          valorConvertido: valorConvertido.toFixed(2),
          data: new Date().toLocaleString()
        };
        setHistorico([...historico, novaConversao]);
      } else {
        console.error('Cotações não disponíveis para as moedas selecionadas.');
      }
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
  };

  return (
    <View style={styles.background}>
      <Header />
      <Text style={styles.title}>Conversor</Text>
      <div style={styles.box}>
        <div style={styles.boxOg}>
          <Dropdown
            style={styles.lista}
            data={data}
            labelField={'label'}
            valueField={'value'}
            value={moedaOrigem}
            onChange={item => setMoedaOrigem(item.value)}
          />
          <TextInput
            style={styles.valorOg}
            keyboardType='numeric'
            value={valorOrigem}
            onChangeText={setValorOrigem}
          />
        </div>
        <Image style={styles.seta} source={require("./assets/seta-para-baixo.png")} />
        <div style={styles.boxOg}>
          <Dropdown
            style={styles.lista}
            data={data}
            labelField={'label'}
            valueField={'value'}
            value={moedaDestino}
            onChange={item => setMoedaDestino(item.value)}
          />
          <Text style={styles.valorOg}>{valorConvertido}</Text>
        </div>
        <TouchableOpacity style={styles.converter} onPress={converterMoeda}>
          Converter
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoHistorico1} onPress={() => navigation.navigate('Home')}>
          Home
        </TouchableOpacity>
      </div>
    </View>
  );
}

function HistoricoTela({ navigation }) {
  const { historico } = useContext(HistoricoContext);

  return (
    <View style={styles.background}>
      <Header />
      <Text style={styles.title}>Histórico</Text>
      <View style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Moeda</Text>
          <Text style={styles.tableHeaderText}>Valor</Text>
          <Text style={styles.tableHeaderText}>Data</Text>
        </View>
        {historico.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.moedaOrigem} / {item.moedaDestino}</Text>
            <Text style={styles.tableCell}>{item.valorOrigem} / {item.valorConvertido}</Text>
            <Text style={styles.tableCell}>{item.data}</Text>
          </View>
        ))}
      <TouchableOpacity style={styles.botaoHistorico2} onPress={() => navigation.navigate('Home')}>
        Home
      </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [historico, setHistorico] = useState([]);

  return (
    <HistoricoContext.Provider value={{ historico, setHistorico }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeTela} />
          <Stack.Screen name="Conversor" component={ConversorTela} />
          <Stack.Screen name="Historico" component={HistoricoTela} />
        </Stack.Navigator>
      </NavigationContainer>
    </HistoricoContext.Provider>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e98b1b',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  tableHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    color: '#101f54',
    fontSize: 18,
    width: '30%', // Define a largura de cada célula
  },
  background: {
    backgroundColor: '#101f54',
    width: 414,
    height: 896
  },
  lista: {
    backgroundColor: '#ffffff',
    width: 140,
    height: 40,
    borderRadius: 10,
    color: "#e98b1b"
  },
  primeiros: {
    justifyContent: "center",
    marginLeft: 50,
    marginTop: 50
  },
  outros: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 30
  },
  cardMoe: {
    backgroundColor: '#ffca2c',
    width: 350,
    height: 400,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  card: {
    backgroundColor: '#ffca2c',
    width: 300,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    display: "grid",
  },
  moeda: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 40,
    textShadowColor: "#e98b1b",
    textShadowRadius: 1,
    textShadowOffset: { width: -4, height: 0 },
    textAlign: "center"
  },
  nome: {
    color: "#ffffff",
    fontSize: 30,
    marginTop: 10,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#e98b1b",
    textShadowRadius: 1,
    textShadowOffset: { width: -4, height: 0 }
  },
  descricao: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
    padding: 15,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textShadowColor: "#e98b1b",
    textShadowRadius: 1,
    textShadowOffset: { width: -4, height: 0 }
  },
  botaoHistorico1: {
    backgroundColor: "#e98b1b",
    width: 170,
    height: 40,
    border: 'none',
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    borderRadius: 20,
    marginTop: 70,
    marginLeft: 90
  },
  botaoHistorico2: {
    backgroundColor: "#e98b1b",
    width: 170,
    height: 40,
    border: 'none',
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    borderRadius: 20,
    marginTop: 70,
    marginLeft: 120
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
    width: 350,
    height: 300,
    backgroundColor: "#ffca2c",
    margin: 'auto',
    marginTop: 20,
    borderRadius: 20,
  },
  boxOg: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20
  },
  valorOg: {
    width: 140,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    color: "#e98b1b",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 33,
    textAlign: "center"
  },
  seta: {
    width: 50,
    height: 50,
    margin: "auto",
    marginTop: 25
  },
  converter: {
    backgroundColor: "#e98b1b",
    width: 170,
    height: 40,
    border: 'none',
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 95,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  content: {
    width: 400,
    height: 500,
    backgroundColor: "#ffca2c",
    margin: 'auto',
    marginTop: 20,
    borderRadius: 20,
  },
});

export default App;