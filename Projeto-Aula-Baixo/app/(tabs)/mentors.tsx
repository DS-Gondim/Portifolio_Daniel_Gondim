import { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MOCK_MENTORS, EXPERTISE_CATEGORIES } from "@/lib/mock-data";
import { Mentor } from "@/lib/types";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

function MentorListCard({ mentor }: { mentor: Mentor }) {
  const router = useRouter();
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/mentor/${mentor.id}`)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.border,
      }}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: mentor.avatar }}
        style={{ width: 64, height: 64, borderRadius: 32 }}
      />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 15 }} numberOfLines={1}>
              {mentor.name}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }} numberOfLines={1}>
              {mentor.title} · {mentor.company}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
            <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 14 }}>
              R${mentor.pricePerHour}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>/hora</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="star.fill" size={13} color="#F59E0B" />
            <Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "600", marginLeft: 3 }}>
              {mentor.rating}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 3 }}>
              ({mentor.reviewCount})
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconSymbol name="person.fill" size={13} color={colors.muted} />
            <Text style={{ color: colors.muted, fontSize: 12, marginLeft: 3 }}>
              {mentor.sessionCount} sessões
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {mentor.expertise.slice(0, 3).map((tag) => (
            <View
              key={tag}
              style={{
                backgroundColor: colors.primary + "15",
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 3,
                marginRight: 6,
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 11, fontWeight: "600" }}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

export default function MentorsScreen() {
  const colors = useColors();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filtered = useMemo(() => {
    return MOCK_MENTORS.filter((m) => {
      const matchSearch =
        search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()));
      const matchCategory =
        selectedCategory === "Todos" || m.expertise.includes(selectedCategory as any);
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  return (
    <ScreenContainer containerClassName="bg-background">
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "800" }}>
          Mentores
        </Text>
        <Text style={{ color: colors.muted, fontSize: 14, marginTop: 2 }}>
          {MOCK_MENTORS.length} profissionais disponíveis
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 10,
            marginTop: 14,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar por nome, cargo ou área..."
            placeholderTextColor={colors.muted}
            style={{ flex: 1, marginLeft: 10, color: colors.foreground, fontSize: 14 }}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <IconSymbol name="xmark" size={16} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
          contentContainerStyle={{ gap: 8 }}
        >
          {EXPERTISE_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? colors.primary : colors.surface,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderWidth: 1,
                borderColor: selectedCategory === cat ? colors.primary : colors.border,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: selectedCategory === cat ? "#fff" : colors.muted,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MentorListCard mentor={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 60 }}>
            <IconSymbol name="magnifyingglass" size={48} color={colors.muted + "60"} />
            <Text style={{ color: colors.foreground, fontWeight: "700", fontSize: 16, marginTop: 16 }}>
              Nenhum mentor encontrado
            </Text>
            <Text style={{ color: colors.muted, fontSize: 13, marginTop: 6 }}>
              Tente ajustar os filtros ou a busca
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
