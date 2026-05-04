import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useApp } from "@/lib/app-context";
import { Session } from "@/lib/types";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const STATUS_CONFIG = {
  agendada: { label: "Agendada", color: "#1A56DB", bg: "#1A56DB18" },
  em_andamento: { label: "Em andamento", color: "#10B981", bg: "#10B98118" },
  concluida: { label: "Concluída", color: "#64748B", bg: "#64748B18" },
  cancelada: { label: "Cancelada", color: "#EF4444", bg: "#EF444418" },
};

function SessionCard({ session, onPress }: { session: Session; onPress: () => void }) {
  const colors = useColors();
  const router = useRouter();
  const statusCfg = STATUS_CONFIG[session.status];
  let dateLabel = session.date;
  try { dateLabel = format(parseISO(session.date), "dd 'de' MMM, yyyy", { locale: ptBR }); } catch {}

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: session.mentorAvatar }} style={{ width: 52, height: 52, borderRadius: 26 }} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 15 }} numberOfLines={1}>{session.mentorName}</Text>
            <View style={{ backgroundColor: statusCfg.bg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: statusCfg.color, fontSize: 11, fontWeight: "700" }}>{statusCfg.label}</Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }} numberOfLines={1}>{session.mentorTitle}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconSymbol name="clock.fill" size={13} color={colors.muted} />
          <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 5 }}>{dateLabel} às {session.time}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconSymbol name="person.fill" size={13} color={colors.muted} />
          <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 5 }}>{session.duration} min</Text>
        </View>
      </View>
      {session.topic ? <Text style={{ color: colors.muted, fontSize: 12, marginTop: 8 }} numberOfLines={1}>📌 {session.topic}</Text> : null}
      {session.status === "agendada" && (
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/video-call", params: { roomName: session.roomName, sessionId: session.id, mentorName: session.mentorName } })}
          style={{ backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 10, alignItems: "center", marginTop: 12, flexDirection: "row", justifyContent: "center" }}
          activeOpacity={0.85}
        >
          <IconSymbol name="video.fill" size={16} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14, marginLeft: 8 }}>Entrar na Chamada</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function SessionsScreen() {
  const { state } = useApp();
  const colors = useColors();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = state.sessions
    .filter((s) => s.status === "agendada" || s.status === "em_andamento")
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

  const past = state.sessions
    .filter((s) => s.status === "concluida" || s.status === "cancelada")
    .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());

  const data = activeTab === "upcoming" ? upcoming : past;

  return (
    <ScreenContainer containerClassName="bg-background">
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "800" }}>Minhas Sessões</Text>
        <View style={{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: 12, padding: 4, marginTop: 16, borderWidth: 1, borderColor: colors.border }}>
          {(["upcoming", "past"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{ flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: "center", backgroundColor: activeTab === tab ? colors.primary : "transparent" }}
              activeOpacity={0.8}
            >
              <Text style={{ color: activeTab === tab ? "#fff" : colors.muted, fontWeight: "700", fontSize: 14 }}>
                {tab === "upcoming" ? `Próximas (${upcoming.length})` : `Passadas (${past.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionCard session={item} onPress={() => router.push(`/session/${item.id}`)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 60, paddingHorizontal: 32 }}>
            <IconSymbol name="clock.fill" size={52} color={colors.muted + "50"} />
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16, marginTop: 16, textAlign: "center" }}>
              {activeTab === "upcoming" ? "Nenhuma sessão agendada" : "Nenhuma sessão passada"}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 13, marginTop: 6, textAlign: "center" }}>
              {activeTab === "upcoming" ? "Agende uma sessão com um mentor para começar" : "Suas sessões concluídas aparecerão aqui"}
            </Text>
            {activeTab === "upcoming" && (
              <TouchableOpacity
                onPress={() => router.push("/mentors")}
                style={{ backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 20 }}
                activeOpacity={0.85}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Encontrar Mentor</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </ScreenContainer>
  );
}
