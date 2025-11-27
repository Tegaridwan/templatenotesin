import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Pressable, TextInput, View } from 'react-native';
import { addNote as addNoteToDB, updateNote } from '../../services/db'; // Asumsi nama fungsinya adalah addNote


export default function AddNotePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (params.id) {
      setTitle(params.title as string);
      setContent(params.content as string);
    }
  } , []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Judul atau konten tidak boleh kosong.');
      return;
    }
    try {
      if (params.id) {
        await updateNote(params.id as string, title, content);
      } else {
        await addNoteToDB(title, content);
      }
      router.back();
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert('Error', 'Gagal menyimpan catatan.');
    }
  }
  
  // Using useCallback for handleSave to prevent re-creation on every render
  const memoizedHandleSave = useCallback(handleSave, [title, content, params.id]);

  useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerShadowVisible: false,
            headerRight: () => (
                <Pressable onPress={memoizedHandleSave} style={{ marginRight: 15 }}>
                    <Ionicons name="save-outline" size={24} color="black" />
                </Pressable>
            ),
            // Header kiri, dll...
        });
    }, [navigation, memoizedHandleSave]);

  return (
    <View className='flex-1 bg-white'>
      {/* <Stack.Screen options={{
        headerTitle: '',
        headerShadowVisible: false,
        headerRight: () => ( // This is the headerRight component
          <Pressable onPress={handleSave} style={{ marginRight: 15 }}>
            <Ionicons name="save-outline" size={24} color="black" />
            <Text style={{ color: '#4B0082', fontWeight: 'bold' }}>
              {params.id ? 'Update' : 'Simpan'}
            </Text>

          </Pressable>
        )
      }} /> */}
      <View className='flex-1 bg-white p-4'>
        <TextInput
          className='w-full rounded-3xl p-4 text-3xl'
          placeholder='Judul'
          placeholderTextColor='gray'
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          className='w-full  border-gray-400 rounded-3xl p-4 text-lg mt-2 flex-1'
          placeholder='Catatan'
          placeholderTextColor='gray'
          multiline={true}
          textAlignVertical='top'
          value={content}
          onChangeText={setContent}
        />
      </View>
    </View>
  )
}