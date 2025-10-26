import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scanStyles } from "../styles/scanStyles";

interface ScanScreenProps {
  onInitiateScan: () => void;
}

export default function ScanScreen({ onInitiateScan }: ScanScreenProps) {
  return (
    <SafeAreaView style={scanStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000064" />
      <View style={scanStyles.content}>
        {/* Logo/Título */}
        <View style={scanStyles.header}>
          <Text style={scanStyles.emoji}>📦</Text>
          <Text style={scanStyles.headerTitle}>GateCheck</Text>
          <Text style={scanStyles.headerSubtitle}>
            Manejo de Botellas de Alcohol
          </Text>
        </View>

        {/* Área de Escaneo */}
        <View style={scanStyles.scanCard}>
          <Image
            source={require("../images/phone.png")}
            style={scanStyles.scanImage}
          />
          <Text style={scanStyles.scanTitle}>Escanear Botella</Text>
          <Text style={scanStyles.scanSubtitle}>
            Detecta automáticamente código de barras y botella
          </Text>

          {/* Botón de Escaneo Grande */}
          <TouchableOpacity
            style={scanStyles.scanButton}
            onPress={onInitiateScan}
            activeOpacity={0.8}
          >
            <View style={scanStyles.scanButtonInner}>
              <AntDesign name="scan" size={20} color="white" style={scanStyles.buttonIcon} />
              <Text style={scanStyles.scanButtonText}>INICIAR ESCANEO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
