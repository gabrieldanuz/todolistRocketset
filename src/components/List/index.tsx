import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'

import { styles } from './styles'

type Props = {
  list: string
  toMark: () => void
  onRemove: () => void
}

export function List({ list, toMark, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toMark}>
        <Entypo name="circle" size={16} color="#4EA8DE" />
      </TouchableOpacity>
      <Text style={styles.list}>{list}</Text>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <AntDesign name="delete" size={16} color="#FFF" />
      </TouchableOpacity>
    </View>
  )
}
