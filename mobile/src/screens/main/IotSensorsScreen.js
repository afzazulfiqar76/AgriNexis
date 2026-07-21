import { StyleSheet, Text, View } from 'react-native'
import { Droplets, Gauge, Sun, Thermometer } from 'lucide-react-native'
import { AppCard } from '../../components/AppCard'
import { Header } from '../../components/Header'
import { ProgressBar } from '../../components/ProgressBar'
import { ScreenContainer } from '../../components/ScreenContainer'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { SENSOR_STATS } from '../../data/iotSensors'
import { IRRIGATION_RECOMMENDATION } from '../../data/irrigationRecommendation'
import { colors, fontFamily, typography } from '../../constants/theme'
import { radius, spacing } from '../../constants/spacing'
import { useLayout } from '../../utils/layout'

const ICONS = { droplets: Droplets, thermometer: Thermometer, sun: Sun, gauge: Gauge, cloud: Droplets }

export function IotSensorsScreen() {
  const { halfCard, isSmallPhone } = useLayout()
  const irrigation = IRRIGATION_RECOMMENDATION

  return (
    <ScreenContainer>
      <Header title="IoT Sensors" subtitle="Live telemetry from your urban farms" />

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
                {sensor.unit}
              </Text>
              <Text style={typography.caption}>{sensor.status}</Text>
            </AppCard>
          )
        })}
      </View>

      <AppCard style={styles.irrigation} padding={spacing.md}>
        <View style={styles.irrigationHead}>
          <Text style={styles.irrigationTitle}>Smart Irrigation</Text>
          <StatusBadge status="operational" label={irrigation.statusBadge} />
        </View>
        <Text style={styles.schedule}>{irrigation.scheduledTime}</Text>
        <Text style={typography.caption}>{irrigation.countdown}</Text>
        <View style={styles.irrigationRow}>
          <Text style={styles.irrigationValue}>45%</Text>
          <Text style={styles.irrigationLabel} numberOfLines={2}>
            Current soil moisture
          </Text>
        </View>
        <ProgressBar value={45} fillColor={colors.primary} />
        <Text style={styles.recommendation}>
          {irrigation.descriptionPrefix}
          <Text style={styles.waterAmount}>{irrigation.waterAmount}</Text>
          {irrigation.descriptionSuffix}
        </Text>
      </AppCard>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  sensor: { alignItems: 'flex-start', minHeight: 120 },
  fullWidth: { flexBasis: '100%', maxWidth: '100%' },
  sensorLabel: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.gray500,
    marginTop: spacing.sm,
  },
  sensorValue: { fontSize: 22, fontFamily: fontFamily.bold, color: colors.text, marginTop: 4 },
  irrigation: { borderRadius: radius.xl },
  irrigationHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  irrigationTitle: { fontSize: 18, fontFamily: fontFamily.bold, color: colors.text, flex: 1 },
  schedule: {
    fontSize: 15,
    fontFamily: fontFamily.semibold,
    color: colors.text,
    marginBottom: 2,
  },
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
  recommendation: {
    marginTop: spacing.md,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
    lineHeight: 22,
  },
  waterAmount: { fontFamily: fontFamily.semibold, color: colors.primary },
})
