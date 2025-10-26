import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraView } from "expo-camera";
import React, { RefObject } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { cameraStyles } from "../styles/cameraStyles";

interface CameraScreenProps {
  cameraRef: RefObject<CameraView | null>;
  scanning: boolean;
  scanSuccess: boolean;
  bottleDetected: boolean;
  scannedCode: string | null;
  onBarcodeScanned: (data: { type: string; data: string }) => void;
  onCancelScan: () => void;
}

export default function CameraScreen({
  cameraRef,
  scanning,
  scanSuccess,
  bottleDetected,
  scannedCode,
  onBarcodeScanned,
  onCancelScan,
}: CameraScreenProps) {
  return (
    <View style={cameraStyles.cameraContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <CameraView
        style={cameraStyles.camera}
        facing="back"
        ref={cameraRef}
        onBarcodeScanned={scanning ? onBarcodeScanned : undefined}
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
        <View style={cameraStyles.cameraOverlay}>
          {/* Header */}
          <View style={cameraStyles.cameraHeader}>
            <TouchableOpacity
              style={cameraStyles.cancelButton}
              onPress={onCancelScan}
              activeOpacity={0.8}
            >
              <Text style={cameraStyles.cancelButtonText}>✕ Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Área central con el recuadro de guía */}
          <View style={cameraStyles.cameraCenterArea}>
            <Text style={cameraStyles.cameraInstructionText}>
              {scanSuccess && bottleDetected
                ? "✓✓ Código y botella detectados"
                : scanSuccess
                ? "✓ Código detectado - Verificando botella..."
                : bottleDetected
                ? "✓ Botella detectada - Escanee el código"
                : "Posicione el código de barras y la botella"}
            </Text>

            {/* Recuadro de guía para la botella */}
            <View style={cameraStyles.frameContainer}>
              <View
                style={[
                  cameraStyles.frame,
                  scanSuccess && cameraStyles.frameSuccess,
                  bottleDetected && cameraStyles.frameBottleDetected,
                  scanSuccess && bottleDetected && cameraStyles.frameComplete,
                ]}
              >
                {/* Esquinas del marco */}
                <View
                  style={[
                    cameraStyles.corner,
                    cameraStyles.cornerTopLeft,
                    (scanSuccess || bottleDetected) && cameraStyles.cornerSuccess,
                  ]}
                />
                <View
                  style={[
                    cameraStyles.corner,
                    cameraStyles.cornerTopRight,
                    (scanSuccess || bottleDetected) && cameraStyles.cornerSuccess,
                  ]}
                />
                <View
                  style={[
                    cameraStyles.corner,
                    cameraStyles.cornerBottomLeft,
                    (scanSuccess || bottleDetected) && cameraStyles.cornerSuccess,
                  ]}
                />
                <View
                  style={[
                    cameraStyles.corner,
                    cameraStyles.cornerBottomRight,
                    (scanSuccess || bottleDetected) && cameraStyles.cornerSuccess,
                  ]}
                />

                {/* Icono de botella en el centro */}
                <View style={cameraStyles.bottleIconContainer}>
                  <Text style={cameraStyles.bottleIcon}>
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

            <Text style={cameraStyles.cameraHintText}>
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
          <View style={cameraStyles.cameraFooter}>
            <View style={cameraStyles.statusContainer}>
              {/* Estado del código de barras */}
              <View
                style={[
                  cameraStyles.statusItem,
                  scanSuccess && cameraStyles.statusItemSuccess,
                ]}
              >
                <Text style={cameraStyles.statusEmoji}>
                  {scanSuccess ? <AntDesign name="check-circle" size={24} color="black" /> : <AntDesign name="barcode" size={24} color="white" />}
                </Text>
                <Text style={cameraStyles.statusText}>Código</Text>
              </View>

              {/* Estado de la botella */}
              <View
                style={[
                  cameraStyles.statusItem,
                  bottleDetected && cameraStyles.statusItemSuccess,
                ]}
              >
                <Text style={cameraStyles.statusEmoji}>
                  {bottleDetected ? <AntDesign name="check-circle" size={24} color="white" /> : "🍾"}
                </Text>
                <Text style={cameraStyles.statusText}>Botella</Text>
              </View>
            </View>

            {scanning && (
              <View style={cameraStyles.scanningIndicator}>
                <View style={cameraStyles.scanningDot} />
                <Text style={cameraStyles.scanningText}>Escaneando...</Text>
              </View>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
}
