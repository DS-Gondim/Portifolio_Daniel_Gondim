import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MOCK_MENTORS } from "@/lib/mock-data";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MentorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const mentor = MOCK_MENTORS.find((m) => m.id === id);

  if (!mentor) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.foreground }}>Mentor não encontrado</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ padding: 16, flexDirection: "row", alignItems: "center" }}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 16, marginLeft: 4, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>

        {/* Hero */}
        <View style={{ alignItems: "center", paddingHorizontal: 16, paddingBottom: 24 }}>
          <Image source={{ uri: mentor.avatar }} style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: colors.primary }} />
          <Text style={{ color: colors.foreground, fontSize: 22, fontWeight: "800", marginTop: 14, textAlign: "center" }}>{mentor.name}</Text>
          <Text style={{ color: colors.muted, fontSize: 15, marginTop: 4 }}>{mentor.title}</Text>
          <Text style={{ color: colors.primary, fontSize: 14, fontWeight: "600", marginTop: 2 }}>{mentor.company}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconSymbol name="star.fill" size={16} color="#F59E0B" />
              <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 15, marginLeft: 4 }}>{mentor.rating}</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginLeft: 4 }}>({mentor.reviewCount} avaliações)</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 20, marginTop: 14 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: colors.foreground, fontWeight: "800", fontSize: 18 }}>{mentor.sessionCount}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Sessões</Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.border }} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: colors.foreground, fontWeight: "800", fontSize: 18 }}>R${mentor.pricePerHour}</Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>por hora</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 8 }}>Sobre</Text>
          <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 22 }}>{mentor.bio}</Text>
        </View>

        {/* Expertise */}
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Áreas de Expertise</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {mentor.expertise.map((tag) => (
              <View key={tag} style={{ backgroundColor: colors.primary + "15", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Available Slots */}
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Horários Disponíveis</Text>
          <View style={{ gap: 8 }}>
            {mentor.availableSlots.slice(0, 4).map((slot) => {
              let dateLabel = slot.date;
              try { dateLabel = format(parseISO(slot.date), "EEE, dd 'de' MMM", { locale: ptBR }); } catch {}
              return (
                <View key={slot.id} style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border }}>
                  <IconSymbol name="clock.fill" size={16} color={colors.primary} />
                  <Text style={{ color: colors.foreground, fontSize: 14, marginLeft: 10, flex: 1, textTransform: "capitalize" }}>{dateLabel}</Text>
                  <View style={{ backgroundColor: colors.primary + "15", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 13 }}>{slot.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push(`/schedule/${mentor.id}`)}
          style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: "center" }}
          activeOpacity={0.85}
        >
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Agendar Sessão</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
