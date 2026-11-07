import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AppCard } from '../AppCard'
import { colors, fontFamily } from '../../constants/theme'
import { spacing } from '../../constants/spacing'

export function DataTable({ title, columns, data, keyExtractor = (item) => item.id }) {
  return (
    <AppCard padding={0} style={styles.card}>
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : null}
      <View style={styles.headerRow}>
        {columns.map((col) => (
          <Text key={col.key} style={[styles.headerCell, col.flex && { flex: col.flex }]}>
            {col.header}
          </Text>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {columns.map((col) => (
              <View key={col.key} style={[styles.cell, col.flex && { flex: col.flex }]}>
                {col.render ? col.render(item) : (
                  <Text style={styles.cellText}>{item[col.key]}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      />
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  title: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    padding: spacing.md,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    backgroundColor: colors.gray50,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray500,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  cell: { flex: 1, justifyContent: 'center' },
  cellText: { fontSize: 14, fontFamily: fontFamily.regular, color: colors.text },
})
