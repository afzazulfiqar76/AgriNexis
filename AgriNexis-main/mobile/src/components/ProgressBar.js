import { StyleSheet, View } from 'react-native'
import { progressTrack } from '../constants/uiStyles'

export function ProgressBar({ value = 0, fillColor, trackColor }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <View style={[styles.track, progressTrack, trackColor && { backgroundColor: trackColor }]}>
      <View
        style={[
          styles.fill,
          { width: `${pct}%` },
          fillColor && { backgroundColor: fillColor },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: { width: '100%' },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#059669',
  },
})
