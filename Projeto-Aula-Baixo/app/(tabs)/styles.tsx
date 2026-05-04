import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MUSIC_STYLES } from "@/lib/mock-data";
import { useColors } from "@/hooks/use-colors";

function StyleCard({ style }: { style: typeof MUSIC_STYLES[0] }) {
  const router = useRouter();
  const colors = useColors();
  const difficultyColor = { "Iniciante": colors.success, "Intermediário": colors.accent, "Avançado": "#EF4444" }[style.difficulty];

  return (
    <TouchableOpacity
      onPress={() => router.push(`/style/${style.id}`)}
      style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginHorizontal: 8, marginBottom: 12, borderWidth: 1, borderColor: colors.border, flex: 1 }}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 40, marginBottom: 8 }}>{style.emoji}</Text>
      <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16, marginBottom: 4 }}>{style.name}</Text>
      <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 8, lineHeight: 16 }} numberOfLines={2}>{style.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <View style={{ backgroundColor: difficultyColor + "18", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text style={{ color: difficultyColor, fontSize: 11, fontWeight: "700" }}>{style.difficulty}</Text>
        </View>
        <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600" }}>{style.lessonCount} aulas</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function StylesScreen() {
  const colors = useColors();
  return (
    <ScreenContainer containerClassName="bg-background">
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "800" }}>Estilos Musicais</Text>
        <Text style={{ color: colors.muted, fontSize: 14, marginTop: 2 }}>Escolha um estilo para aprender com Prof. Daniel</Text>
      </View>
      <FlatList
        data={MUSIC_STYLES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StyleCard style={item} />}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 32 }}
      />
    </ScreenContainer>
  );
}
