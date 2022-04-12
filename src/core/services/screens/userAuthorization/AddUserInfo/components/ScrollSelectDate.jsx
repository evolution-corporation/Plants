import React, { useState, useReducer, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectScrollDate } from './dump';
import { i18n } from '~services';

export default function ({ setDate, style }) {
  const [age, setAge] = useState(16);
  const monthList = [
    i18n.t('jan'),
    i18n.t('feb'),
    i18n.t('march'),
    i18n.t('apr'),
    i18n.t('may'),
    i18n.t('june'),
    i18n.t('july'),
    i18n.t('aug'),
    i18n.t('sep'),
    i18n.t('oct'),
    i18n.t('nov'),
    i18n.t('dec'),
  ];
  //const [listYear, setListYear] = useState([])
  const toDay = new Date();
  toDay.setHours(0, 0, 0, 0);
  const [state, dispatch] = useReducer(
    (_state, { type, payload }) => {
      switch (type) {
        case 'date':
          _state = { ..._state, date: payload };
          break;
        case 'month':
          _state = { ..._state, month: payload };
          break;
        case 'year':
          _state = { ..._state, year: payload };
          break;
        default:
          break;
      }
      setDate(new Date(_state.year, _state.month, _state.date));
      const rAge = new Date(
        toDay.getFullYear() - _state.year,
        toDay.getMonth() - _state.month,
        toDay.getDate() - _state.date,
      ).getYear();
      setAge(rAge >= 0 ? rAge : 0);
      return _state;
    },
    {
      date: toDay.getDate(),
      month: toDay.getMonth(),
      year: toDay.getFullYear() - 16,
    },
  );

    const fixState = () => {
      setDate(new Date(state.year, state.month, state.date));
      const rAge = new Date(
        toDay.getFullYear() - state.year,
        toDay.getMonth() - state.month,
        toDay.getDate() - state.date,
      ).getYear();
      setAge(rAge >= 0 ? rAge : 0);
    };

  useEffect(() => {
    setDate(new Date(state.year, state.month, state.date));
  }, [dispatch]);

  const listYear = [];
  for (let i = 100; i >= 0; i--) {
    listYear.push(toDay.getFullYear() - i);
  }
  //listYearsetListYear(listyear);

  const listDates = useMemo(() => {
    const lastDate = new Date(state.year, state.month + 1, 0).getDate();
    const listDate = [];
    for (let i = 1; i <= lastDate; i++) {
      listDate.push(i);
    }
    return listDate;
  }, [state.month, state.year]);

  const styles = StyleSheet.create({
    bakground: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 167,
    },
    listDate: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAge: {
      color: '#FFFFFF',
      fontFamily: Platform.OS == 'android' ? 'Roboto_500Medium' : 'System',
      fontSize: 11,
      fontStyle: 'normal',
      marginTop: 25,
    },
    dateScroll: { width: 61, marginHorizontal: 1 },
  });

  return (
    <View style={[styles.bakground, style]}>
      <View style={styles.listDate}>
        <SelectScrollDate
          style={styles.dateScroll}
          Dates={listDates}
          initialDate={state.date}
          onChangeDate={(date) => {
            dispatch({ type: 'date', payload: date });
            //fixState();

          }}
        />
        <SelectScrollDate
          style={styles.dateScroll}
          Dates={monthList}
          initialDate={monthList[state.month]}
          onChangeDate={(date) => {
            dispatch({ type: 'month', payload: monthList.indexOf(date) });
            // fixState();

          }}
        />
        <SelectScrollDate
          style={styles.dateScroll}
          Dates={listYear}
          initialDate={state.year}
          onChangeDate={(date) => {
            dispatch({ type: 'year', payload: date });
            //fixState();

          }}
        />
      </View>
      <Text style={styles.textAge}>{i18n.t('age', { count: age })}</Text>
    </View>
  );
}
