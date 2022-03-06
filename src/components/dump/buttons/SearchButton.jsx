import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import SearchImage from '~assets/SearchImage.svg';

export function SearchButton({ onChange, onPress }) {
    const [isActivate, setIsActivate] = useState(false)
    const styles = StyleSheet.create({
        background: {
            padding: 10
        }
    })
    
    useEffect(() => {
      setIsActivate(onChange);
    }, [onChange]);

    if (isActivate) {
        return null
    }
    return (
      <TouchableOpacity style={styles.background} onPress={onPress}>
        <SearchImage />
      </TouchableOpacity>
    );
}

export default memo(SearchButton)