import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useApp } from "@/lib/app-context";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PROFESSOR_DANIEL } from "@/lib/mock-data";

function SettingRow({ icon, label, onPress, danger }: { icon: any; label: string; onPress?: () => void; danger?: boolean }) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}
      activeOpacity={0.7}
    >
      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: danger ? "#EF444418" : colors.primary + "15", alignItems: "center", justifyContent: "center", marginRight: 14 }}>
        <IconSymbol name={icon} size={18} color={danger ? "#EF4444" : colors.primary} />
      </View>
      <Text style={{ flex: 1, color: danger ? "#EF4444" : colors.foreground, fontSize: 15, fontWeight: "500" }}>{label}</Text>
      {!danger && <IconSymbol name="chevron.right" size={16} color={colors.muted} />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { state } = useApp();
  const colors = useColors();
  const { user } = state;

  const completedLessons = state.lessons.filter((l) => l.status === "concluida").length;
  const totalHours = state.lessons.filter((l) => l.status === "concluida").reduce((acc, l) => acc + l.duration / 60, 0);
  const uniqueStyles = new Set(state.lessons.filter((l) => l.status === "concluida").map((l) => l.style)).size;

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, alignItems: "center" }}>
          <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "800", alignSelf: "flex-start" }}>Perfil</Text>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image source={{ uri: user.avatar }} style={{ width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: colors.primary }} />
            <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800", marginTop: 12 }}>{user.name}</Text>
            <Text style={{ color: colors.muted, fontSize: 14, marginTop: 4 }}>{user.email}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: "row", marginHorizontal: 16, marginBottom: 24, gap: 10 }}>
          {[
            { label: "Aulas", value: completedLessons, icon: "checkmark.circle.fill" as const, color: colors.success },
            { label: "Horas", value: Math.round(totalHours * 10) / 10, icon: "clock.fill" as const, color: colors.accent },
            { label: "Estilos", value: uniqueStyles, icon: "paperplane.fill" as const, color: colors.primary },
          ].map((stat) => (
            <View key={stat.label} style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: colors.border }}>
              <IconSymbol name={stat.icon} size={22} color={stat.color} />
              <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800", marginTop: 6 }}>{stat.value}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Professor Info */}
        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600", marginBottom: 10 }}>SEU PROFESSOR</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: PROFESSOR_DANIEL.avatar }} style={{ width: 56, height: 56, borderRadius: 28 }} />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16 }}>{PROFESSOR_DANIEL.name}</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{PROFESSOR_DANIEL.title}</Text>
              <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 12, marginTop: 4 }}>R$ {PROFESSOR_DANIEL.pricePerHour}/hora</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginBottom: 16 }}>
          <SettingRow icon="bell.fill" label="Notificações" onPress={() => Alert.alert("Em breve", "Configurações de notificação em breve.")} />
          <SettingRow icon="gear" label="Configurações" onPress={() => Alert.alert("Em breve", "Configurações gerais em breve.")} />
          <SettingRow icon="person.fill" label="Editar Perfil" onPress={() => Alert.alert("Em breve", "Edição de perfil em breve.")} />
        </View>

        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }}>
          <SettingRow
            icon="xmark.circle.fill"
            label="Sair da Conta"
            danger
            onPress={() =>
              Alert.alert("Sair", "Deseja sair da conta?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", style: "destructive", onPress: () => {} },
              ])
            }
          />
        </View>

        <Text style={{ color: colors.muted, fontSize: 12, textAlign: "center", marginTop: 24 }}>BassClass v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}
