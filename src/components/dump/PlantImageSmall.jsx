import React from 'react';
import {
  ShrubSmall,
  DeciduousSmall,
  FlowerSmall,
  СoniferousSmall,
  FruitSmall,
} from './assets';

export default function ({ style, type='Deciduous' }) {
  return type === 'Shrub' ? (
    <ShrubSmall style={style} />
  ) : type === 'Сoniferous' ? (
    <СoniferousSmall style={style} />
  ) : type === 'Deciduous' ? (
    <DeciduousSmall style={style} />
  ) : type === 'Flower' ? (
    <FlowerSmall style={style} />
  ) : type === 'Fruit' ? (
    <FruitSmall style={style} />
  ) : null;
}
