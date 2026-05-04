import { useEffect, useRef } from "react";
import { View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { useKeepAwake } from "expo-keep-awake";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function VideoCallScreen() {
  const { roomName, lessonId } = useLocalSearchParams<{ roomName: string; lessonId: string }>();
  const router = useRouter();
  const colors = useColors();
  const webViewRef = useRef<WebView>(null);

  useKeepAwake();

  if (!roomName) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <TouchableOpacity onPress={() => router.back()} style={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>
          <IconSymbol name="xmark" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>
    );
  }

  const jitsiURL = `https://meet.jit.si/${roomName}?userInfo.displayName=Aluno`;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <WebView
        ref={webViewRef}
        source={{ uri: jitsiURL }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
          Alert.alert("Erro", "Não foi possível carregar a videoconferência. Tente novamente.");
        }}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: colors.primary,
          borderRadius: 12,
          padding: 12,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
        activeOpacity={0.8}
      >
        <IconSymbol name="chevron.left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
