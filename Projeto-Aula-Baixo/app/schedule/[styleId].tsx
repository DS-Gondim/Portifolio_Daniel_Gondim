import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MUSIC_STYLES, PROFESSOR_DANIEL, AVAILABLE_SLOTS } from "@/lib/mock-data";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useApp } from "@/lib/app-context";
import { Lesson, LessonDuration } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Haptics from "expo-haptics";

function generateRoomName(lessonId: string): string {
  return `bassclass-${lessonId.replace(/[^a-zA-Z0-9]/g, "")}`;
}

export default function ScheduleScreen() {
  const { styleId } = useLocalSearchParams<{ styleId: string }>();
  const router = useRouter();
  const colors = useColors();
  const { addLesson } = useApp();
  const style = MUSIC_STYLES.find((s) => s.id === styleId);

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [duration, setDuration] = useState<LessonDuration>(60);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!style) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.foreground }}>Estilo não encontrado</Text>
        </View>
      </ScreenContainer>
    );
  }

  const selectedSlot = AVAILABLE_SLOTS.find((s) => s.id === selectedSlotId);
  const price = (PROFESSOR_DANIEL.pricePerHour * duration) / 60;

  async function handleConfirm() {
    if (!selectedSlot) {
      Alert.alert("Atenção", "Selecione um horário disponível.");
      return;
    }
    if (!topic.trim()) {
      Alert.alert("Atenção", "Informe o tema da aula.");
      return;
    }

    setIsLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const lessonId = `lesson_${Date.now()}`;
    const lesson: Lesson = {
      id: lessonId,
      style: style.name,
      date: selectedSlot.date,
      time: selectedSlot.time,
      duration,
      topic: topic.trim(),
      notes: notes.trim(),
      status: "agendada",
      roomName: generateRoomName(lessonId),
      price,
      createdAt: new Date().toISOString(),
    };

    try {
      await addLesson(lesson);
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/(tabs)");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", "Não foi possível agendar a aula. Tente novamente.");
      console.error(error);
    }
  }

  return (
    <>
      <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 16, flexDirection: "row", alignItems: "center" }} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 16, marginLeft: 4, fontWeight: "600" }}>Voltar</Text>
          </TouchableOpacity>

          <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: "800", paddingHorizontal: 16, marginBottom: 20 }}>Agendar Aula</Text>

          <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 8 }}>ESTILO SELECIONADO</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 32 }}>{style.emoji}</Text>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 18 }}>{style.name}</Text>
                <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>Prof. {PROFESSOR_DANIEL.name}</Text>
              </View>
              <Text style={{ color: colors.primary, fontWeight: "800", fontSize: 16 }}>R${PROFESSOR_DANIEL.pricePerHour}/h</Text>
            </View>
          </View>

          <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 12 }}>Escolha o Horário</Text>
            <View style={{ gap: 10 }}>
              {AVAILABLE_SLOTS.slice(0, 6).map((slot) => {
                let dateLabel = slot.date;
                try { dateLabel = format(parseISO(slot.date), "EEE, dd 'de' MMM", { locale: ptBR }); } catch {}
                const isSelected = selectedSlotId === slot.id;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    onPress={() => { setSelectedSlotId(slot.id); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                    style={{ flexDirection: "row", alignItems: "center", backgroundColor: isSelected ? colors.primary : colors.surface, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: isSelected ? colors.primary : colors.border }}
                    activeOpacity={0.8}
                  >
                    <IconSymbol name="clock.fill" size={18} color={isSelected ? "#fff" : colors.primary} />
                    <Text style={{ color: isSelected ? "#fff" : colors.foreground, fontSize: 14, marginLeft: 12, flex: 1, textTransform: "capitalize", fontWeight: "500" }}>{dateLabel}</Text>
                    <View style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : colors.primary + "15", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text style={{ color: isSelected ? "#fff" : colors.primary, fontWeight: "700", fontSize: 14 }}>{slot.time}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 12 }}>Duração da Aula</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {([30, 60, 90] as LessonDuration[]).map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => { setDuration(d); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                  style={{ flex: 1, backgroundColor: duration === d ? colors.primary : colors.surface, borderRadius: 14, paddingVertical: 14, alignItems: "center", borderWidth: 2, borderColor: duration === d ? colors.primary : colors.border }}
                  activeOpacity={0.8}
                >
                  <Text style={{ color: duration === d ? "#fff" : colors.foreground, fontWeight: "700", fontSize: 16 }}>{d} min</Text>
                  <Text style={{ color: duration === d ? "rgba(255,255,255,0.8)" : colors.muted, fontSize: 12, marginTop: 2 }}>R${(PROFESSOR_DANIEL.pricePerHour * d / 60).toFixed(0)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Tema da Aula *</Text>
            <TextInput
              value={topic}
              onChangeText={setTopic}
              placeholder="Ex: Técnica de slap bass"
              placeholderTextColor={colors.muted}
              style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, color: colors.foreground, fontSize: 14, borderWidth: 1, borderColor: colors.border }}
              returnKeyType="next"
            />
          </View>

          <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: 10 }}>Observações (opcional)</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Descreva seus objetivos ou dúvidas..."
              placeholderTextColor={colors.muted}
              multiline
              numberOfLines={4}
              style={{ backgroundColor: colors.surface, borderRadius: 14, padding: 14, color: colors.foreground, fontSize: 14, borderWidth: 1, borderColor: colors.border, minHeight: 100, textAlignVertical: "top" }}
            />
          </View>
        </ScrollView>

        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ color: colors.muted, fontSize: 14 }}>Total estimado</Text>
            <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800" }}>R$ {price.toFixed(0)}</Text>
          </View>
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={isLoading}
            style={{ backgroundColor: isLoading ? colors.muted : colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: "center" }}
            activeOpacity={0.85}
          >
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>
              {isLoading ? "Agendando..." : "Confirmar Agendamento"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: colors.background, borderRadius: 20, padding: 32, alignItems: "center", maxWidth: 300 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.success + "20", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Text style={{ fontSize: 40 }}>✅</Text>
            </View>
            <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 8 }}>Aula Agendada!</Text>
            <Text style={{ color: colors.muted, fontSize: 14, textAlign: "center", lineHeight: 20 }}>
              Sua aula de {style?.name} foi agendada com sucesso para {selectedSlot?.date} às {selectedSlot?.time}.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
