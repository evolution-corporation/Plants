import React, { useReducer, useEffect, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectPrice, InputPrice } from './dump';
import * as RNLocalize from 'react-native-localize';

export function PriceContainer ({ style, onChange }) {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case 'selectPrice':
          return { ...state, price: payload, isCustomePrice: false };
        case 'inputPrice':
          return { ...state, price: payload, isCustomePrice: true };
        case 'setCurrency':
          const prices = { RUB: [100, 300, 600] };
          return {
            ...state,
            currency: payload,
            prices: prices[payload.name],
            price: prices[payload.name][1],
          };
        default:
          break;
      }
    },
    {
      price: 300,
      isCustomePrice: false,
      prices: [100, 300, 600],
      currency: { symbol: '₽', name: 'RUB' },
    },
  );

  useEffect(() => {
    const userUsingCurrencies = RNLocalize.getCurrencies();
    const appUsingCurrencies = ['RUB'];
    for (let currency of userUsingCurrencies) {
      if (appUsingCurrencies.includes(currency)) {
        dispatch({ type: 'setCurrency', payload: {symbol: currency === 'RUB' ? '₽' : '$', name: currency }});
        break;
      }
    }
    selectPrice(state.price);
    return () => {};
  }, [dispatch]);

  const selectPrice = (price) => {
    onChange({ price, currency: state.currency.name });
    dispatch({ type: 'selectPrice', payload: price });
  }

  const inputPrice = (price) => {
    onChange({ price: +price, currency: state.currency.name });
    dispatch({ type: 'inputPrice', payload: price });
  }

  const styles = StyleSheet.create({
    background: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    prices: {
      marginHorizontal: 3,
      flex: 1
    },
  });
  if (state.prices.length == 0) return null;

  return (
    <View style={[style, styles.background]}>
      <SelectPrice
        price={state.prices[0]}
        isSelected={state.price == state.prices[0] && !state.isCustomePrice}
        style={styles.prices}
        currency={state.currency.symbol}
        onChange={() => selectPrice(state.prices[0])}
      />
      <SelectPrice
        price={state.prices[1]}
        isSelected={state.price == state.prices[1] && !state.isCustomePrice}
        style={styles.prices}
        currency={state.currency.symbol}
        onChange={() => selectPrice(state.prices[1])}
      />
      <SelectPrice
        price={state.prices[2]}
        isSelected={state.price == state.prices[2] && !state.isCustomePrice}
        style={styles.prices}
        currency={state.currency.symbol}
        onChange={() => selectPrice(state.prices[2])}
      />
      <InputPrice
        onChange={(price) => inputPrice(price)}
        isSelected={state.isCustomePrice}
        style={[styles.prices, { flex: 2 }]}
        currency={state.currency.symbol}
      />
    </View>
  );
}

export default memo(PriceContainer);