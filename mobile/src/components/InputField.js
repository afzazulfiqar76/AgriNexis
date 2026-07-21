import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import { colors, fontFamily } from '../constants/theme'
import { inputError, inputFocused, inputSurface } from '../constants/uiStyles'
import { spacing } from '../constants/spacing'

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  error,
  leftIcon,
  editable = true,
}) {
  const [hidden, setHidden] = useState(secureTextEntry)
  const [focused, setFocused] = useState(false)

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputRow}>
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithIcon,
            secureTextEntry && styles.inputWithRight,
            focused && inputFocused,
            error && inputError,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray400}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((v) => !v)} style={styles.eye} hitSlop={8}>
            {hidden ? (
              <EyeOff size={18} color={colors.gray400} strokeWidth={2} />
            ) : (
              <Eye size={18} color={colors.gray400} strokeWidth={2} />
            )}
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md, gap: 6 },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.gray700,
    letterSpacing: 0.5,
  },
  inputRow: { position: 'relative' },
  leftIcon: {
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  input: {
    ...inputSurface,
    width: '100%',
  },
  inputWithIcon: { paddingLeft: 42 },
  inputWithRight: { paddingRight: 44 },
  eye: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    zIndex: 1,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { fontSize: 12, fontFamily: fontFamily.medium, color: colors.danger },
})
