import React, { memo, FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

interface Props {
    style?: ViewStyle,
    percent: number
}

const IndicatorFill: FC<Props> = ({ style={}, percent = 0 }: Props) => {
    const styles = StyleSheet.create({
        background: {
            height: 20,
            width: 20,
            // backgroundColor: 'red'
            transform: [{ rotateZ: '180deg' }, { rotateY: '180deg' }],
            elevation: 1,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
        },

    })
    const deg: number = percent < 1 ? Math.floor(360 * percent) : 360
    const d: Array<string> = [`M0 7`]
    for (let i = 0; i <= deg; i+= 5) {
        d.push(`L${7 * Math.sin(i * Math.PI / 180)} ${7 * Math.cos(i * Math.PI / 180)}`)
    }
    return (
        <View style={[style, styles.background]}>
            <Svg height={20} width={20} origin={[-10, -10]} style={{ borderRadius: 10, borderColor: '#F5F5F5', borderWidth: 3 }}>
                {/* <Circle cx={'10'} cy={'10'} r={'10'} fill={'black'}/> */}
                <Path
                    x={'10'}
                    y={'10'}
                    d={d.join(' ')}
                    fill={'none'}
                    stroke={'#86B738'}
                    strokeWidth={3}
                    
                />
                
            </Svg>
        </View>
    )
}

export default memo(IndicatorFill)