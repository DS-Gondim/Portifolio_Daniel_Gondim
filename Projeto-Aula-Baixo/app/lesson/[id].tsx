import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useApp } from "@/lib/app-context";
import { PROFESSOR_DANIEL } from "@/lib/mock-data";
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

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const { state, cancelLesson } = useApp();

  const lesson = state.lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.foreground }}>Aula não encontrada</Text>
        </View>
      </ScreenContainer>
    );
  }

  const statusCfg = STATUS_CONFIG[lesson.status];
  let dateLabel = lesson.date;
  try { dateLabel = format(parseISO(lesson.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR }); } catch {}

  function handleCancel() {
    Alert.alert("Cancelar Aula", "Tem certeza que deseja cancelar esta aula?", [
      { text: "Manter", style: "cancel" },
      {
        text: "Cancelar Aula",
        style: "destructive",
        onPress: async () => {
          await cancelLesson(lesson.id);
          Alert.alert("Aula cancelada", "Sua aula foi cancelada com sucesso.");
          router.back();
        },
      },
    ]);
  }

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 16, flexDirection: "row", alignItems: "center" }} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 16, marginLeft: 4, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <View>
              <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600" }}>AULA DE</Text>
              <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800", marginTop: 4 }}>{lesson.style}</Text>
            </View>
            <View style={{ backgroundColor: statusCfg.bg, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ color: statusCfg.color, fontSize: 12, fontWeight: "700" }}>{statusCfg.label}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border }}>
            <Image source={{ uri: PROFESSOR_DANIEL.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 15 }}>{PROFESSOR_DANIEL.name}</Text>
              <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{PROFESSOR_DANIEL.title}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 12 }}>Detalhes da Aula</Text>

          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="calendar" size={18} color={colors.primary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Data</Text>
              <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 14, marginTop: 2, textTransform: "capitalize" }}>{dateLabel}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="clock.fill" size={18} color={colors.primary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Horário</Text>
              <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 14, marginTop: 2 }}>{lesson.time} ({lesson.duration} minutos)</Text>
            </View>
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="tag.fill" size={18} color={colors.primary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Tema</Text>
              <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 14, marginTop: 2 }}>{lesson.topic}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="dollarsign.circle.fill" size={18} color={colors.primary} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: colors.muted, fontSize: 12 }}>Valor</Text>
              <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 14, marginTop: 2 }}>R$ {lesson.price.toFixed(0)}</Text>
            </View>
          </View>
        </View>

        {lesson.notes && (
          <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Observações</Text>
            <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20 }}>{lesson.notes}</Text>
            </View>
          </View>
        )}

        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Código da Sala</Text>
          <View style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 6 }}>Jitsi Meet Room</Text>
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 14, fontFamily: "monospace" }}>{lesson.roomName}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 }}>
        {lesson.status === "agendada" && (
          <>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/video-call", params: { roomName: lesson.roomName, lessonId: lesson.id } })}
              style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
              activeOpacity={0.85}
            >
              <IconSymbol name="video.fill" size={18} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16, marginLeft: 8 }}>Entrar na Aula</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={{ backgroundColor: "#EF444420", borderRadius: 16, paddingVertical: 16, alignItems: "center" }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#EF4444", fontWeight: "700", fontSize: 16 }}>Cancelar Aula</Text>
            </TouchableOpacity>
          </>
        )}
        {lesson.status === "concluida" && (
          <TouchableOpacity
            onPress={() => Alert.alert("Feedback", "Deixe seu feedback sobre a aula!")}
            style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: "center" }}
            activeOpacity={0.85}
          >
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Deixar Avaliação</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
}
