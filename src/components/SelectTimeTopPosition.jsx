import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectButtonSmall } from '~components';

export default function ({ setTime }) {
  const [_time, set_Time] = useState('week');
  const styles = StyleSheet.create({
    background: {
      flexDirection: 'row',
      height: 28,
      flex: 1,
    },
  });

  const RenderItem = ({ name, translate }) => {
    const styles = StyleSheet.create({
      main: {
        marginHorizontal: 5.5,
      },
    });
    return (
      <SelectButtonSmall
        isSelected={name == _time}
        style={styles.main}
        setSelected={() => {
          set_Time(name);
        }}
        colorSelected={{
          background: '#84B838',
          text: '#FFFFFF',
          border: 'transparent',
        }}
        colorNoSelected={{
          background: 'transparent',
          text: '#75B904',
          border: '#75B904',
        }}
        text={
          <SelectButtonSmall
            isSelected={'week' == _time}
            style
            setSelected={() => {
              set_Time('week');
            }}
            colorSelected={{
              background: '#84B838',
              text: '#FFFFFF',
              border: 'transparent',
            }}
            colorNoSelected={{
              background: 'transparent',
              text: '#75B904',
              border: '#75B904',
            }}
            text={translate}
          />
        }
      />
    );
  };

  return (
    <View style={styles.background}>
      {[
        { name: 'week', translate: { ru: 'За неделю' } },
        { name: 'month', translate: { ru: 'Месяц' } },
        { name: 'all', translate: { ru: 'Всё время' } },
      ].map(({ name, translate }) => (
        <RenderItem name={name} translate={translate} />
      ))}
    </View>
  );
}
