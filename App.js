import React, {useState, } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextAreaView,
  StatusBar,
  LogBox,
  SafeAreaView,
} from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

LogBox.ignoreAllLogs();

export default function App() {
  const [capital, setCapital] = useState(null);
  const [interes, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const calculate = () => {
    if (!capital) {
      setErrorMessage('No has ingresado ninguna cantidad');
    } else if (!interes) {
      setErrorMessage('Añade los intereses');
    } else if (!months) {
      setErrorMessage('Añade los meses');
    } else {
      // Convrtir interés a porcentaje
      const i = interes / 100;

      // Obtener el total ya aplicado el interés
      var _total = {};
      _total.totalPayable = capital * (1 + i);
      _total.monthlyFee = _total.totalPayable / months;
      setErrorMessage('');
      setTotal(_total);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <Footer />
      <ResultCalculation
        capital={capital}
        interest={interes}
        months={months}
        total={total}
        errorMessage={errorMessage}
        calculationHandler={calculate}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
  },
});
