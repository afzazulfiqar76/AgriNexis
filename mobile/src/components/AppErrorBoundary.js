import { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../constants/theme'
import { spacing } from '../constants/spacing'

/** Shows render/bootstrap errors instead of a blank white screen. */
export class AppErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[AppErrorBoundary]', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      const message = this.state.error?.message || String(this.state.error)
      const stack = this.state.error?.stack || ''
      return (
        <View style={styles.wrap}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.msg}>{message}</Text>
          <ScrollView style={styles.stack}>
            <Text style={styles.stackText}>{stack}</Text>
          </ScrollView>
        </View>
      )
    }
    return this.props.children
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
    padding: spacing.lg,
    paddingTop: 64,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  msg: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.md,
  },
  stack: { flex: 1 },
  stackText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.gray600,
  },
})
