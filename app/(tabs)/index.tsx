import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/styles";

// Simula datos de botellas escaneadas con diferentes condiciones
const BOTTLE_DATABASE = {
  "7501234567890": {
    producto: "Glenlivet 12",
    aerolinea: "LX",
    sello: "Sellado",
    nivel: "> 80%",
    condicion: "Excelente/Intacto",
    action: "Keep",
    reason:
      "La botella cumple con todos los estándares de calidad: sello intacto, nivel óptimo y condición excelente.",
  },
  "7501234567891": {
    producto: "Johnnie Walker Black",
    aerolinea: "LX",
    sello: "Resellado",
    nivel: "60%-80%",
    condicion: "Aceptable/Ligeramente Dañado",
    action: "Refill",
    reason:
      "La regla LX requiere rellenar porque el sello fue resellado y el nivel está entre 60%-80%.",
  },
  "7501234567892": {
    producto: "Absolut Vodka",
    aerolinea: "LX",
    sello: "Abierto",
    nivel: "< 60%",
    condicion: "Pobre/Muy Dañado",
    action: "Replace",
    reason:
      "La botella requiere reemplazo debido a que el sello está abierto o la condición visual es muy dañada, según las reglas de seguridad del cliente.",
  },
  "7501234567893": {
    producto: "Hennessy VS",
    aerolinea: "LX",
    sello: "Sellado",
    nivel: "100%",
    condicion: "Excelente/Intacto",
    action: "Keep",
    reason:
      "La botella cumple con todos los estándares de calidad: sello intacto, nivel óptimo y condición excelente.",
  },
  "7501234567894": {
    producto: "Bacardi Rum",
    aerolinea: "LX",
    sello: "Resellado",
    nivel: "60%-80%",
    condicion: "Aceptable/Ligeramente Dañado",
    action: "Refill",
    reason:
      "La regla LX requiere rellenar porque el nivel está entre 60%-80% y la condición es aceptable.",
  },
};

export default function App() {
  const [scanning, setScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [bottleDetected, setBottleDetected] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const detectionTimer = useRef(null);

  const handleInitiateScan = async () => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permiso Requerido",
          "Se necesita acceso a la cámara para escanear botellas.",
          [{ text: "OK" }]
        );
        return;
      }
    }

    setShowCamera(true);
    setScanning(true);

    // Simular detección de botella después de 2 segundos
    detectionTimer.current = setTimeout(() => {
      console.log("🍾 Botella detectada (simulación)");
      setBottleDetected(true);
    }, 2000);
  };

  const handleBarcodeScanned = ({ type, data }) => {
    if (scannedCode === data) {
      return;
    }

    console.log("=== CÓDIGO ESCANEADO ===");
    console.log("Tipo:", type);
    console.log("Datos:", data);
    console.log("========================");

    setScannedCode(data);
    setScanSuccess(true);

    const bottleData = BOTTLE_DATABASE[data];

    if (bottleData) {
      console.log(
        "✓ Botella encontrada en base de datos:",
        bottleData.producto
      );

      // Verificar si la botella ya fue detectada
      if (bottleDetected) {
        console.log("✓✓ Código Y botella detectados - Proceso completo");
        setScanning(false);
        setTimeout(() => {
          setResult(bottleData);
          setShowCamera(false);
          setScanSuccess(false);
          setScannedCode(null);
          setBottleDetected(false);
        }, 1000);
      } else {
        console.log("⚠ Esperando detección visual de la botella...");
        // Forzar detección después de 1 segundo
        setTimeout(() => {
          if (!bottleDetected) {
            console.log("🍾 Botella detectada (forzado)");
            setBottleDetected(true);
            setScanning(false);
            setTimeout(() => {
              setResult(bottleData);
              setShowCamera(false);
              setScanSuccess(false);
              setScannedCode(null);
              setBottleDetected(false);
            }, 1000);
          }
        }, 1000);
      }
    } else {
      console.log("✗ Código no encontrado en base de datos:", data);

      // Avanzar a pantalla de resultado mostrando el código escaneado (datos mínimos)
      setScanning(false);
      setTimeout(() => {
        setResult({
          producto: data,
          aerolinea: "N/D",
          sello: "N/D",
          nivel: "N/D",
          condicion: "No registrado",
          action: "Discard",
          reason: "Producto no registrado en la base de datos.",
        });
        setShowCamera(false);
        setScanSuccess(false);
        setScannedCode(null);
        setBottleDetected(false);
      }, 500);
    }
  };

  // Verificar si ambos están detectados
  useEffect(() => {
    if (scanSuccess && bottleDetected && scannedCode) {
      const bottleData = BOTTLE_DATABASE[scannedCode];
      if (bottleData) {
        console.log("✓✓ Código Y botella detectados - Proceso completo");
        setScanning(false);
        setTimeout(() => {
          setResult(bottleData);
          setShowCamera(false);
          setScanSuccess(false);
          setScannedCode(null);
          setBottleDetected(false);
        }, 1000);
      }
    }
  }, [scanSuccess, bottleDetected, scannedCode]);

  const handleCancelScan = () => {
    if (detectionTimer.current) {
      clearTimeout(detectionTimer.current);
    }
    setShowCamera(false);
    setScanning(false);
    setProcessing(false);
    setScanSuccess(false);
    setScannedCode(null);
    setBottleDetected(false);
  };

  const handleReset = () => {
    if (detectionTimer.current) {
      clearTimeout(detectionTimer.current);
    }
    setResult(null);
    setScanning(false);
    setShowCamera(false);
    setProcessing(false);
    setScanSuccess(false);
    setScannedCode(null);
    setBottleDetected(false);
  };

  const getActionStyles = (action) => {
    const palette = {
      Keep: { bg: "#22c55e", border: "#16a34a" },
      Refill: { bg: "#FAC460", border: "#eab308" },
      Replace: { bg: "#ef4444", border: "#dc2626" },
      Discard: { bg: "#6b7280", border: "#4b5563" },
    };
    return palette[action] || palette["Discard"];
  };

  // Pantalla de Cámara
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
          onBarcodeScanned={scanning ? handleBarcodeScanned : undefined}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
              "code128",
              "code39",
              "code93",
              "qr",
            ],
          }}
        >
          {/* Overlay con guía de posicionamiento */}
          <View style={styles.cameraOverlay}>
            {/* Header */}
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelScan}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>✕ Cancelar</Text>
              </TouchableOpacity>
            </View>

            {/* Área central con el recuadro de guía */}
            <View style={styles.cameraCenterArea}>
              <Text style={styles.cameraInstructionText}>
                {scanSuccess && bottleDetected
                  ? "✓✓ Código y botella detectados"
                  : scanSuccess
                  ? "✓ Código detectado - Verificando botella..."
                  : bottleDetected
                  ? "✓ Botella detectada - Escanee el código"
                  : "Posicione el código de barras y la botella"}
              </Text>

              {/* Recuadro de guía para la botella */}
              <View style={styles.frameContainer}>
                <View
                  style={[
                    styles.frame,
                    scanSuccess && styles.frameSuccess,
                    bottleDetected && styles.frameBottleDetected,
                    scanSuccess && bottleDetected && styles.frameComplete,
                  ]}
                >
                  {/* Esquinas del marco */}
                  <View
                    style={[
                      styles.corner,
                      styles.cornerTopLeft,
                      (scanSuccess || bottleDetected) && styles.cornerSuccess,
                    ]}
                  />
                  <View
                    style={[
                      styles.corner,
                      styles.cornerTopRight,
                      (scanSuccess || bottleDetected) && styles.cornerSuccess,
                    ]}
                  />
                  <View
                    style={[
                      styles.corner,
                      styles.cornerBottomLeft,
                      (scanSuccess || bottleDetected) && styles.cornerSuccess,
                    ]}
                  />
                  <View
                    style={[
                      styles.corner,
                      styles.cornerBottomRight,
                      (scanSuccess || bottleDetected) && styles.cornerSuccess,
                    ]}
                  />

                  {/* Icono de botella en el centro */}
                  <View style={styles.bottleIconContainer}>
                    <Text style={styles.bottleIcon}>
                      {scanSuccess && bottleDetected
                        ? <AntDesign name="check" size={60} color="white" />
                        : scanSuccess
                        ? "✓"
                        : !bottleDetected
                        ? "🍾"
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Simulación de cuadro de detección */}


              <Text style={styles.cameraHintText}>
                {scanSuccess && bottleDetected
                  ? "¡Perfecto! Procesando..."
                  : scanSuccess
                  ? "Mantenga la botella en posición..."
                  : bottleDetected
                  ? "Asegúrese de que el código de barras sea visible"
                  : "Enfoque el código de barras y la botella completa"}
              </Text>
            </View>

            {/* Indicador de estado */}
            <View style={styles.cameraFooter}>
              <View style={styles.statusContainer}>
                {/* Estado del código de barras */}
                <View
                  style={[
                    styles.statusItem,
                    scanSuccess && styles.statusItemSuccess,
                  ]}
                >
                  <Text style={styles.statusEmoji}>
                    {scanSuccess ? <AntDesign name="check-circle" size={24} color="black" /> : <AntDesign name="barcode" size={24} color="white" />}
                  </Text>
                  <Text style={styles.statusText}>Código</Text>
                </View>

                {/* Estado de la botella */}
                <View
                  style={[
                    styles.statusItem,
                    bottleDetected && styles.statusItemSuccess,
                  ]}
                >
                  <Text style={styles.statusEmoji}>
                    {bottleDetected ? <AntDesign name="check-circle" size={24} color="white" /> : "🍾"}
                  </Text>
                  <Text style={styles.statusText}>Botella</Text>
                </View>
              </View>

              {scanning && (
                <View style={styles.scanningIndicator}>
                  <View style={styles.scanningDot} />
                  <Text style={styles.scanningText}>Escaneando...</Text>
                </View>
              )}
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  // Pantalla de Resultado Final
  if (result) {
    const actionStyles = getActionStyles(result.action);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Acción Recomendada */}
          <View
            style={[
              styles.actionCard,
              {
                backgroundColor: actionStyles.bg,
                borderColor: actionStyles.border,
              },
            ]}
          >
            <Text style={styles.actionText}>{result.action.toUpperCase()}</Text>
            <Text style={styles.actionSubtext}>Acción Recomendada</Text>
          </View>

          {/* Datos de Apoyo */}
          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>📊 Datos Registrados:</Text>
            {[
              { label: "Producto", value: result.producto },
              { label: "Aerolínea", value: result.aerolinea },
              { label: "Sello", value: result.sello },
              { label: "Nivel", value: result.nivel },
              { label: "Condición", value: result.condicion },
            ].map((item, idx) => (
              <View key={idx} style={styles.dataRow}>
                <Text style={styles.dataLabel}>{item.label}:</Text>
                <Text style={styles.dataValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Botones de Acción */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>✓ CONFIRMAR Y PROCESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.scanAgainButtonText}>
              🔄 ESCANEAR OTRA BOTELLA
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Pantalla de Escaneo Inicial
  return (
    <SafeAreaView style={styles.scanContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000064" />
      <View style={styles.scanContent}>
        {/* Logo/Título */}
        <View style={styles.header}>
          <Text style={styles.emoji}>📦</Text>
          <Text style={styles.headerTitle}>GateCheck</Text>
          <Text style={styles.headerSubtitle}>
            Manejo de Botellas de Alcohol
          </Text>
        </View>

        {/* Área de Escaneo */}
        <View style={styles.scanCard}>
          <Image
            source={require("../../images/phone.png")}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <Text style={styles.scanTitle}>Escanear Botella</Text>
          <Text style={styles.scanSubtitle}>
            Detecta automáticamente código de barras y botella
          </Text>

          {/* Botón de Escaneo Grande */}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleInitiateScan}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="scan" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.scanButtonText}>INICIAR ESCANEO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
