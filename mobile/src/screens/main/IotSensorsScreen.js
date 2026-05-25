import { StyleSheet, Text, View } from 'react-native'
import { Droplets, Gauge, Sun, Thermometer } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ProgressBar } from '../../components/ProgressBar'
import { ScreenContainer } from '../../components/ScreenContainer'
import { SENSOR_STATS } from '../../data/iotSensors'
import { colors, fontFamily, typography } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

const ICONS = { droplets: Droplets, thermometer: Thermometer, sun: Sun, gauge: Gauge }

export function IotSensorsScreen() {
  return (
    <ScreenContainer>
      <Header title="IoT Sensors" subtitle="Live telemetry from your urban farms" />
      <AppCard style={styles.irrigation}>
        <Text style={styles.irrigationTitle}>Smart Irrigation</Text>
        <Text style={typography.caption}>Auto-mode active · Next cycle in 4h</Text>
        <View style={styles.irrigationRow}>
          <Text style={styles.irrigationValue}>68%</Text>
          <Text style={styles.irrigationLabel}>Soil moisture optimal</Text>
        </View>
        <ProgressBar value={68} fillColor={colors.primary} />
      </AppCard>
      <View style={styles.grid}>
        {SENSOR_STATS.map((sensor) => {
          const Icon = ICONS[sensor.icon] ?? Gauge
          return (
            <AppCard key={sensor.id} style={styles.sensor}>
              <Icon size={24} color={colors.orange500} strokeWidth={2} />
              <Text style={styles.sensorLabel}>{sensor.label}</Text>
              <Text style={styles.sensorValue}>{sensor.value}</Text>
              <Text style={typography.caption}>{sensor.unit}</Text>
            </AppCard>
          )
        })}
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  irrigation: {
    marginBottom: spacing.lg,
    backgroundColor: colors.base100,
    borderRadius: 24,
    overflow: 'hidden',
  },
  irrigationTitle: { fontSize: 20, fontFamily: fontFamily.bold, color: colors.text },
  irrigationRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginVertical: spacing.md },
  irrigationValue: { fontSize: 28, fontFamily: fontFamily.bold, color: colors.primary },
  irrigationLabel: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray600 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  sensor: { width: '47%', alignItems: 'flex-start' },
  sensorLabel: { fontSize: 13, fontFamily: fontFamily.medium, color: colors.gray500, marginTop: spacing.sm },
  sensorValue: { fontSize: 22, fontFamily: fontFamily.bold, color: colors.text, marginTop: 4 },
})
