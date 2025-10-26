import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { resultStyles } from "../styles/resultStyles";

interface BottleData {
  producto: string;
  aerolinea: string;
  sello: string;
  nivel: string;
  condicion: string;
  action: string;
  reason: string;
}

interface ResultScreenProps {
  result: BottleData;
  onReset: () => void;
}

export default function ResultScreen({ result, onReset }: ResultScreenProps) {
  const getActionStyles = (action: string) => {
    const palette = {
      Keep: { bg: "#22c55e", border: "#16a34a" },
      Refill: { bg: "#FAC460", border: "#eab308" },
      Replace: { bg: "#ef4444", border: "#dc2626" },
      Discard: { bg: "#6b7280", border: "#4b5563" },
    };
    return palette[action as keyof typeof palette] || palette["Discard"];
  };

  const actionStyles = getActionStyles(result.action);

  return (
    <SafeAreaView style={resultStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <ScrollView contentContainerStyle={resultStyles.scrollContent}>
        {/* Acción Recomendada */}
        <View
          style={[
            resultStyles.actionCard,
            {
              backgroundColor: actionStyles.bg,
              borderColor: actionStyles.border,
            },
          ]}
        >
          <Text style={resultStyles.actionText}>{result.action.toUpperCase()}</Text>
          <Text style={resultStyles.actionSubtext}>Acción Recomendada</Text>
        </View>

        {/* Datos de Apoyo */}
        <View style={resultStyles.dataCard}>
          <Text style={resultStyles.dataTitle}>📊 Datos Registrados:</Text>
          {[
            { label: "Producto", value: result.producto },
            { label: "Aerolínea", value: result.aerolinea },
            { label: "Sello", value: result.sello },
            { label: "Nivel", value: result.nivel },
            { label: "Condición", value: result.condicion },
          ].map((item, idx) => (
            <View key={idx} style={resultStyles.dataRow}>
              <Text style={resultStyles.dataLabel}>{item.label}:</Text>
              <Text style={resultStyles.dataValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Botones de Acción */}
        <TouchableOpacity
          style={resultStyles.confirmButton}
          onPress={onReset}
          activeOpacity={0.8}
        >
          <Text style={resultStyles.confirmButtonText}><AntDesign name="check-circle" size={24} color="white" /> CONFIRMAR Y PROCESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={resultStyles.scanAgainButton}
          onPress={onReset}
          activeOpacity={0.8}
        >
          <Text style={resultStyles.scanAgainButtonText}>
          <AntDesign name="reload" size={24} color="black" /> ESCANEAR OTRA BOTELLA
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
