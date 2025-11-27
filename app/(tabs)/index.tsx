import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { deleteNote, getNotes } from "../../services/db";
// import { TextInput } from "react-native-gesture-handler";

// const notesData = [
//   { id: 1, title: "Catatan Pertama", content: "Ini adalah isi catatan pertama." },
//   { id: 2, title: "Catatan Kedua", content: "Ini adalah isi catatan kedua." },
//   { id: 3, title: "Catatan Ketiga", content: "Ini adalah isi catatan ketiga." },
// ]




export default function Index() {
  const router = useRouter();
  const [notesData, setNotes] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const isSelectionMode = selectedIds.length > 0;
  const navigation = useNavigation();

  // --- AMBIL DATA DARI DATABASE ---
  // Fungsi ini jalan setiap kali halaman dibuka/dilihat
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Fungsi untuk mengambil data dari database
  const loadData = async () => {
    try {
      const data = await getNotes();
      setNotes(data); // Simpan data ke state
    } catch (error) {
    }
  }

  // --- HAPUS CATATAN ---
  const handleDelete = async () => {
    try {
      await deleteNote(selectedIds); // Gunakan fungsi deleteNote yang sudah diupdate
      await loadData();
      setSelectedIds([]);
    } catch (error) {
      console.error("Failed to delete notes:", error);
    }
  }

  // --- ATUR HEADER DINAMIS ---
  useEffect(() => {
    if (isSelectionMode) {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Pressable onPress={() => setSelectedIds([])}>
              <Ionicons name="close" size={24} color="black" style={{ marginRight: 15 }} />
            </Pressable>
            <Pressable onPress={() => alert('arsipkan')}>
              <Ionicons name="archive-outline" size={24} color="black" style={{ marginRight: 20 }} />
            </Pressable>
            <Pressable onPress={() => handleDelete()}>
              <Ionicons name="trash-outline" size={24} color="black" style={{ marginRight: 15 }} />
            </Pressable>
          </View>
        )
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={() => { }}>
              <Ionicons name='moon-outline' size={29} style={{ marginRight: 15 }} />
            </Pressable>
            <Pressable onPress={() => router.push('/(tabs)/arsip')}>
              <Ionicons name='person-circle-outline' size={33} style={{ marginRight: 15 }} />
            </Pressable>
          </View>
        )
      });
    }
  }, [navigation, isSelectionMode, selectedIds]
  );

  const handleLongPress = (id: number) => {
    if (!selectedIds.includes(id)) setSelectedIds([...selectedIds, id]);
  };

  interface Note {
    id: number;
    title: string;
    content: string;
    date? : string;
  }
   
  const handlePress = (note: Note) => {
    if (isSelectionMode) {
      if (selectedIds.includes(note.id)) {
        setSelectedIds(selectedIds.filter(item => item !== note.id));
      } else {
        setSelectedIds([...selectedIds, note.id]);
      }
    } else {
      router.push({
        pathname: '/luaran/add',
        params: {
          id: note.id,
          title: note.title,
          content: note.content
        }
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 pb-0">
        <View className="flex-row items-center w-full border border-gray-400 rounded-3xl bg-gray-50">
          <Ionicons name="search-outline" size={24} color="gray" style={{ marginHorizontal: 8 }} />
          <TextInput
            placeholder="Cari"
            className="flex-1 text-lg"
          />
        </View>
      </View>
      <FlatList
        data={notesData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Pressable
              onLongPress={() => handleLongPress(item.id)}
              onPress={() => handlePress(item)}
              className={`
                p-4 mb-3 rounded-2xl border 
                ${isSelected ? 'bg-purple-100 border-purple-500' : 'bg-white border-gray-300'}
              `}
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">{item.title}</Text>
                {isSelected && <Ionicons name="checkmark-circle" size={24} color="#4B0082" />}
              </View>
              <Text className="text-gray-500 mt-1">{item.content}</Text>
            </Pressable>
          )
        }}
      />
      {!isSelectionMode && (
        <Pressable
          className="absolute bottom-20 right-8 bg-purple-50 w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg"
          onPress={() => router.push("/luaran/add")}
        >
          <Ionicons
            name="add" size={32} color="black"
          />
        </Pressable>
      )}

    </View>
  );
}