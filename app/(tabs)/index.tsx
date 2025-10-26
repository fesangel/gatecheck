import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { BarcodeScannedData, BottleData, CameraScreen, ResultScreen, ScanScreen } from "../../screens";

// Simula datos de botellas escaneadas con diferentes condiciones
const BOTTLE_DATABASE: Record<string, BottleData> = {
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
  const [result, setResult] = useState<BottleData | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [bottleDetected, setBottleDetected] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const detectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleBarcodeScanned = ({ type, data }: BarcodeScannedData) => {
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


  // Pantalla de Cámara
  if (showCamera) {
    return (
      <CameraScreen
        cameraRef={cameraRef}
        scanning={scanning}
        scanSuccess={scanSuccess}
        bottleDetected={bottleDetected}
        scannedCode={scannedCode}
        onBarcodeScanned={handleBarcodeScanned}
        onCancelScan={handleCancelScan}
      />
    );
  }

  // Pantalla de Resultado Final
  if (result) {
    return <ResultScreen result={result} onReset={handleReset} />;
  }

  // Pantalla de Escaneo Inicial
  return <ScanScreen onInitiateScan={handleInitiateScan} />;
}
