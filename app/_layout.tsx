import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  // const _layout = () => {
  //   // Tambahkan useEffect ini
  //   useEffect(() => {
  //       initDB()
  //           .then(() => console.log('Database initialized'))
  //           .catch(err => console.error('DB Init Failed:', err));
  //   }, []);

  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen 
      name="movies/[id]"
      options={{ headerShown: false }}
    /> */}
  </Stack>;
}

