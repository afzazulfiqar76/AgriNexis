import { StyleSheet, Text, View } from 'react-native'
import { Droplets, Gauge, Sun, Thermometer } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ProgressBar } from '../../components/ProgressBar'
import { ScreenContainer } from '../../components/ScreenContainer'
import { SENSOR_STATS } from '../../data/iotSensors'
import { colors, fontFamily, typography } from '../../constants/theme'
import { radius, spacing } from '../../constants/spacing'
import { useLayout } from '../../utils/layout'

const ICONS = { droplets: Droplets, thermometer: Thermometer, sun: Sun, gauge: Gauge }

export function IotSensorsScreen() {
  const { halfCard, isSmallPhone } = useLayout()

  return (
    <ScreenContainer>
      <Header title="IoT Sensors" subtitle="Live telemetry from your urban farms" />
      <AppCard style={styles.irrigation} padding={spacing.md}>
        <Text style={styles.irrigationTitle}>Smart Irrigation</Text>
        <Text style={typography.caption}>Auto-mode active · Next cycle in 4h</Text>
        <View style={styles.irrigationRow}>
          <Text style={styles.irrigationValue}>68%</Text>
          <Text style={styles.irrigationLabel} numberOfLines={2}>
            Soil moisture optimal
          </Text>
        </View>
        <ProgressBar value={68} fillColor={colors.primary} />
      </AppCard>
      <View style={styles.grid}>
        {SENSOR_STATS.map((sensor) => {
          const Icon = ICONS[sensor.icon] ?? Gauge
          return (
            <AppCard
              key={sensor.id}
              style={[styles.sensor, halfCard, isSmallPhone && styles.fullWidth]}
              padding={spacing.md}
            >
              <Icon size={22} color={colors.orange500} strokeWidth={2} />
              <Text style={styles.sensorLabel} numberOfLines={1}>
                {sensor.label}
              </Text>
              <Text style={styles.sensorValue} numberOfLines={1}>
                {sensor.value}
              </Text>
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
    marginBottom: spacing.md,
    borderRadius: radius.xl,
  },
  irrigationTitle: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.text },
  irrigationRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  irrigationValue: { fontSize: 28, fontFamily: fontFamily.bold, color: colors.primary },
  irrigationLabel: {
    flex: 1,
    minWidth: 120,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  sensor: { alignItems: 'flex-start', minHeight: 120 },
  fullWidth: { flexBasis: '100%', maxWidth: '100%' },
  sensorLabel: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
    marginTop: spacing.sm,
  },
  sensorValue: { fontSize: 22, fontFamily: fontFamily.bold, color: colors.text, marginTop: 4 },
})
