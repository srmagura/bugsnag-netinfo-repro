import React, { useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { View, Text } from 'react-native'

// No error if these 2 lines commented out
import bugsnag from '@bugsnag/expo'
bugsnag()

interface AppProps {
    skipLoadingScreen: boolean
}

export default function App(props: AppProps) {
    const { skipLoadingScreen } = props

    const [loadingComplete, setLoadingComplete] = useState(false)

    async function loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            })
        ])
    }

    if (!loadingComplete && !skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onFinish={() => setLoadingComplete(true)}
            />
        )
    }

    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}