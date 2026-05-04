import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useApp } from "@/lib/app-context";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PROFESSOR_DANIEL } from "@/lib/mock-data";

const STATUS_CONFIG = {
  agendada: { label: "Agendada", color: "#1A56DB", bg: "#1A56DB18" },
  em_andamento: { label: "Em andamento", color: "#10B981", bg: "#10B98118" },
  concluida: { label: "Concluída", color: "#64748B", bg: "#64748B18" },
  cancelada: { label: "Cancelada", color: "#EF4444", bg: "#EF444418" },
};

function LessonCard({ lesson, onPress }: { lesson: any; onPress: () => void }) {
  const colors = useColors();
  const router = useRouter();
  const statusCfg = STATUS_CONFIG[lesson.status];
  let dateLabel = lesson.date;
  try { dateLabel = format(parseISO(lesson.date), "dd 'de' MMM, yyyy", { locale: ptBR }); } catch {}

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: PROFESSOR_DANIEL.avatar }} style={{ width: 52, height: 52, borderRadius: 26 }} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 15 }} numberOfLines={1}>{PROFESSOR_DANIEL.name}</Text>
            <View style={{ backgroundColor: statusCfg.bg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: statusCfg.color, fontSize: 11, fontWeight: "700" }}>{statusCfg.label}</Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }} numberOfLines={1}>{lesson.style}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconSymbol name="clock.fill" size={13} color={colors.muted} />
          <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 5 }}>{dateLabel} às {lesson.time}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconSymbol name="person.fill" size={13} color={colors.muted} />
          <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 5 }}>{lesson.duration} min</Text>
        </View>
      </View>
      {lesson.topic ? <Text style={{ color: colors.muted, fontSize: 12, marginTop: 8 }} numberOfLines={1}>🎸 {lesson.topic}</Text> : null}
      {lesson.status === "agendada" && (
        <TouchableOpacity
          onPress={() => {
            const jitsiURL = `https://meet.jit.si/${lesson.roomName}?userInfo.displayName=Aluno`;
            router.push(jitsiURL);
          }}
          style={{ backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 10, alignItems: "center", marginTop: 12, flexDirection: "row", justifyContent: "center" }}
          activeOpacity={0.85}
        >
          <IconSymbol name="video.fill" size={16} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14, marginLeft: 8 }}>Entrar na Aula</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function LessonsScreen() {
  const { state } = useApp();
  const colors = useColors();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  useFocusEffect(
    React.useCallback(() => {
      // Refresh when screen is focused
      return () => {};
    }, [])
  );

  const upcoming = state.lessons.filter((l) => l.status === "agendada" || l.status === "em_andamento").sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
  const past = state.lessons.filter((l) => l.status === "concluida" || l.status === "cancelada").sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  const data = activeTab === "upcoming" ? upcoming : past;

  return (
    <ScreenContainer containerClassName="bg-background">
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "800" }}>Minhas Aulas</Text>
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
        renderItem={({ item }) => <LessonCard lesson={item} onPress={() => router.push(`/lesson/${item.id}`)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 60, paddingHorizontal: 32 }}>
            <IconSymbol name="clock.fill" size={52} color={colors.muted + "50"} />
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16, marginTop: 16, textAlign: "center" }}>
              {activeTab === "upcoming" ? "Nenhuma aula agendada" : "Nenhuma aula passada"}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 13, marginTop: 6, textAlign: "center" }}>
              {activeTab === "upcoming" ? "Agende uma aula com Prof. Daniel para começar" : "Suas aulas concluídas aparecerão aqui"}
            </Text>
            {activeTab === "upcoming" && (
              <TouchableOpacity
                onPress={() => router.push("/styles")}
                style={{ backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 20 }}
                activeOpacity={0.85}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Agendar Aula</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </ScreenContainer>
  );
}
