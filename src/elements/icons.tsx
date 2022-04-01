import React from 'react'
import { View } from 'react-native'
import * as Icons from '~assets/icons'

import type { FC } from 'react' 
import type { ViewStyle } from 'react-native'


export enum IconName {
    GOOGLE = 'google',
}

interface IconProp {
    name: IconName,
    style?: ViewStyle
}

const Icon: FC<IconProp> = ({ name, style }: IconProp) => {
    return (
        <View style={style}>
            {
               Icons[name]({  })
            }
        </View>
    )
}

export default Icon