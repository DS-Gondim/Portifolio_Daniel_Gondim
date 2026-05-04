import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MUSIC_STYLES } from "@/lib/mock-data";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function StyleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const style = MUSIC_STYLES.find((s) => s.id === id);

  if (!style) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.foreground }}>Estilo não encontrado</Text>
        </View>
      </ScreenContainer>
    );
  }

  const difficultyColor = { "Iniciante": colors.success, "Intermediário": colors.accent, "Avançado": "#EF4444" }[style.difficulty];

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 16, flexDirection: "row", alignItems: "center" }} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 16, marginLeft: 4, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", paddingHorizontal: 16, paddingBottom: 24 }}>
          <Text style={{ fontSize: 80 }}>{style.emoji}</Text>
          <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "800", marginTop: 14, textAlign: "center" }}>{style.name}</Text>
          <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
            <View style={{ backgroundColor: difficultyColor + "18", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ color: difficultyColor, fontSize: 13, fontWeight: "700" }}>{style.difficulty}</Text>
            </View>
            <View style={{ backgroundColor: colors.primary + "18", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "700" }}>{style.lessonCount} aulas</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 8 }}>Sobre</Text>
          <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 22 }}>{style.description}</Text>
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 12 }}>O que você vai aprender</Text>
          {["Técnicas fundamentais", "Ritmo e groove", "Improvisação", "Repertório clássico"].map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
              <Text style={{ color: colors.foreground, fontSize: 14, marginLeft: 10 }}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push(`/schedule/${style.id}`)}
          style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: "center" }}
          activeOpacity={0.85}
        >
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Agendar Aula de {style.name}</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
