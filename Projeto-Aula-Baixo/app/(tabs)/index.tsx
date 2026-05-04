import { ScrollView, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useApp } from "@/lib/app-context";
import { MUSIC_STYLES, PROFESSOR_DANIEL } from "@/lib/mock-data";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatLessonDate(dateStr: string, time: string): string {
  try {
    const date = parseISO(dateStr);
    if (isToday(date)) return `Hoje às ${time}`;
    if (isTomorrow(date)) return `Amanhã às ${time}`;
    return format(date, "dd 'de' MMM 'às' " + time, { locale: ptBR });
  } catch {
    return `${dateStr} às ${time}`;
  }
}

function UpcomingLessonCard({ lesson }: { lesson: any }) {
  const router = useRouter();
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/lesson/${lesson.id}`)}
      style={{ backgroundColor: colors.primary, borderRadius: 20, padding: 20, marginHorizontal: 16, marginBottom: 8 }}
      activeOpacity={0.85}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Image source={{ uri: PROFESSOR_DANIEL.avatar }} style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" }} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "500" }}>PRÓXIMA AULA</Text>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 2 }}>{PROFESSOR_DANIEL.name}</Text>
          <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{lesson.style}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <IconSymbol name="clock.fill" size={14} color="rgba(255,255,255,0.8)" />
        <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginLeft: 6 }}>
          {formatLessonDate(lesson.date, lesson.time)} · {lesson.duration} min
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/video-call", params: { roomName: lesson.roomName, lessonId: lesson.id } })}
        style={{ backgroundColor: "#fff", borderRadius: 12, paddingVertical: 12, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
        activeOpacity={0.85}
      >
        <IconSymbol name="video.fill" size={18} color={colors.primary} />
        <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 15, marginLeft: 8 }}>Entrar na Aula</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function StyleCard({ style }: { style: typeof MUSIC_STYLES[0] }) {
  const router = useRouter();
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/style/${style.id}`)}
      style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 14, marginRight: 12, width: 140, borderWidth: 1, borderColor: colors.border }}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 36, marginBottom: 8 }}>{style.emoji}</Text>
      <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 14 }} numberOfLines={1}>{style.name}</Text>
      <Text style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>{style.lessonCount} aulas</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { state } = useApp();
  const colors = useColors();
  const router = useRouter();

  const upcomingLessons = state.lessons.filter((l) => l.status === "agendada").sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
  const nextLesson = upcomingLessons[0] ?? null;

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 }}>
          <View>
            <Text style={{ color: colors.muted, fontSize: 14 }}>Bem-vindo de volta 👋</Text>
            <Text style={{ color: colors.foreground, fontSize: 22, fontWeight: "800", marginTop: 2 }}>{state.user.name}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")} activeOpacity={0.8}>
            <Image source={{ uri: state.user.avatar }} style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.primary }} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: "row", marginHorizontal: 16, marginBottom: 24, gap: 10 }}>
          {[
            { label: "Aulas", value: state.user.lessonsCompleted, icon: "checkmark.circle.fill" as const, color: colors.success },
            { label: "Horas", value: state.user.hoursStudied, icon: "clock.fill" as const, color: colors.accent },
            { label: "Estilos", value: state.user.stylesLearned, icon: "paperplane.fill" as const, color: colors.primary },
          ].map((stat) => (
            <View key={stat.label} style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: colors.border }}>
              <IconSymbol name={stat.icon} size={22} color={stat.color} />
              <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: "800", marginTop: 6 }}>{stat.value}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Next Lesson */}
        {nextLesson ? (
          <UpcomingLessonCard lesson={nextLesson} />
        ) : (
          <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 20, padding: 24, alignItems: "center", borderWidth: 1, borderColor: colors.border, marginBottom: 8 }}>
            <IconSymbol name="video.fill" size={40} color={colors.primary + "80"} />
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16, marginTop: 12 }}>Nenhuma aula agendada</Text>
            <Text style={{ color: colors.muted, fontSize: 13, textAlign: "center", marginTop: 6 }}>Agende uma aula com Prof. Daniel para começar</Text>
            <TouchableOpacity
              onPress={() => router.push("/styles")}
              style={{ backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 16 }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Agendar Aula</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Professor Info */}
        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: PROFESSOR_DANIEL.avatar }} style={{ width: 56, height: 56, borderRadius: 28 }} />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16 }}>{PROFESSOR_DANIEL.name}</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{PROFESSOR_DANIEL.title}</Text>
              <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 12, marginTop: 4 }}>R$ {PROFESSOR_DANIEL.pricePerHour}/hora</Text>
            </View>
          </View>
        </View>

        {/* Music Styles */}
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginBottom: 14 }}>
            <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "800" }}>Estilos Musicais</Text>
            <TouchableOpacity onPress={() => router.push("/styles")} activeOpacity={0.7}>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={MUSIC_STYLES.slice(0, 5)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
            renderItem={({ item }) => <StyleCard style={item} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
