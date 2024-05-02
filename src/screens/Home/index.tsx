import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from 'react-native'

import { List } from '../../components/List'

import { styles } from './styles'

export default function Home() {
  const [addLists, setAddlists] = useState<string[]>([])
  const [completedLists, setCompletedLists] = useState<string[]>([])
  const [toList, setToList] = useState('')

  function handleParticipantAdd() {
    if (addLists.includes(toList)) {
      return Alert.alert(
        'Tarefa Existente',
        'Já existe uma tarefa com o mesmo nome.'
      )
    }
    setAddlists(prevState => [...prevState, toList])
    setToList('')
  }

  function handleListMark(name: string) {
    Alert.alert('Finalizar', `Marcar tarefa como realizada ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setAddlists(prevState =>
            prevState.filter(participant => participant !== name)
          )
          setCompletedLists(prevState => [...prevState, name])
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    console.log(`Você clicou no botão de finalizar ${name}`)
  }

  function handleListRemove(name: string) {
    Alert.alert('Remover', `Excluir tarefa ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setAddlists(prevState =>
            prevState.filter(participant => participant !== name)
          )
          setCompletedLists(prevState =>
            prevState.filter(participant => participant !== name)
          )
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    console.log(`Você clicou no botão de remover ${name}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../assets/Logo.png')} />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#6B6B6B"
          onChangeText={setToList}
          value={toList}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tarefas}>
        <Text style={styles.textTask}>Criadas</Text>
        <Text style={styles.textCompleted}>Concluídas</Text>
      </View>
      <FlatList
        data={addLists}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <List
            key={item}
            list={item}
            onRemove={() => handleListRemove(item)}
            toMark={() => handleListMark(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}
              source={require('../../../assets/Clipboard.png')}
            />
            <Text style={styles.listEmptyText}>
              Você ainda não tem tarefas cadastradas, crie tarefas e organize
              seus itens a fazer.
            </Text>
          </View>
        )}
      />
      <FlatList
        data={completedLists}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <List
            key={item}
            list={item}
            onRemove={() => handleListRemove(item)}
            toMark={() => handleListMark(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
