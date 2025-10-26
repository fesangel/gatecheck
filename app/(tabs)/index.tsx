import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/styles';

// Simula datos de botellas escaneadas con diferentes condiciones
const BOTTLE_DATABASE = {
  '7501234567890': {
    producto: 'Glenlivet 12',
    aerolinea: 'LX',
    sello: 'Sellado',
    nivel: '> 80%',
    condicion: 'Excelente/Intacto',
    action: 'Keep',
    reason: 'La botella cumple con todos los estándares de calidad: sello intacto, nivel óptimo y condición excelente.',
  },
  '7501234567891': {
    producto: 'Johnnie Walker Black',
    aerolinea: 'LX',
    sello: 'Resellado',
    nivel: '60%-80%',
    condicion: 'Aceptable/Ligeramente Dañado',
    action: 'Refill',
    reason: 'La regla LX requiere rellenar porque el sello fue resellado y el nivel está entre 60%-80%.',
  },
  '7501234567892': {
    producto: 'Absolut Vodka',
    aerolinea: 'LX',
    sello: 'Abierto',
    nivel: '< 60%',
    condicion: 'Pobre/Muy Dañado',
    action: 'Replace',
    reason: 'La botella requiere reemplazo debido a que el sello está abierto o la condición visual es muy dañada, según las reglas de seguridad del cliente.',
  },
  '7501234567893': {
    producto: 'Hennessy VS',
    aerolinea: 'LX',
    sello: 'Sellado',
    nivel: '100%',
    condicion: 'Excelente/Intacto',
    action: 'Keep',
    reason: 'La botella cumple con todos los estándares de calidad: sello intacto, nivel óptimo y condición excelente.',
  },
  '7501234567894': {
    producto: 'Bacardi Rum',
    aerolinea: 'LX',
    sello: 'Resellado',
    nivel: '60%-80%',
    condicion: 'Aceptable/Ligeramente Dañado',
    action: 'Refill',
    reason: 'La regla LX requiere rellenar porque el nivel está entre 60%-80% y la condición es aceptable.',
  },
};

export default function App() {
  const [scanning, setScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const handleInitiateScan = async () => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permiso Requerido',
          'Se necesita acceso a la cámara para escanear botellas.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    setShowCamera(true);
    setScanning(true);
  };

  const handleBarcodeScanned = ({ type, data }) => {
    if (scannedCode === data) {
      return; // Evitar escaneos duplicados
    }

    console.log('=== CÓDIGO ESCANEADO ===');
    console.log('Tipo:', type);
    console.log('Datos:', data);
    console.log('========================');

    setScannedCode(data);
    setScanSuccess(true);
    setScanning(false);

    // Vibración de éxito (si está disponible)
    // Vibration.vibrate(100);

    // Buscar en la base de datos
    const bottleData = BOTTLE_DATABASE[data];

    if (bottleData) {
      console.log('✓ Botella encontrada en base de datos:', bottleData.producto);
      
      // Mostrar estado de éxito por 1 segundo antes de procesar
      setTimeout(() => {
        setResult(bottleData);
        setShowCamera(false);
        setScanSuccess(false);
        setScannedCode(null);
      }, 1000);
    } else {
      console.log('✗ Código no encontrado en base de datos');
      
      // Mostrar alerta y permitir reintento
      setTimeout(() => {
        Alert.alert(
          'Producto No Encontrado',
          `El código ${data} no está registrado en la base de datos.`,
          [
            {
              text: 'Reintentar',
              onPress: () => {
                setScanSuccess(false);
                setScannedCode(null);
                setScanning(true);
              },
            },
            {
              text: 'Cancelar',
              onPress: handleCancelScan,
              style: 'cancel',
            },
          ]
        );
      }, 1000);
    }
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      setProcessing(true);

      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });

        console.log('Foto tomada:', photo.uri);

        setTimeout(() => {
          const codes = Object.keys(BOTTLE_DATABASE);
          const randomCode = codes[Math.floor(Math.random() * codes.length)];
          const bottleData = BOTTLE_DATABASE[randomCode];

          setResult(bottleData);
          setProcessing(false);
          setShowCamera(false);
        }, 2000);
      } catch (error) {
        console.error('Error al tomar foto:', error);
        Alert.alert('Error', 'No se pudo tomar la foto. Intente nuevamente.');
        setProcessing(false);
      }
    }
  };

  const handleCancelScan = () => {
    setShowCamera(false);
    setScanning(false);
    setProcessing(false);
    setScanSuccess(false);
    setScannedCode(null);
  };

  const handleReset = () => {
    setResult(null);
    setScanning(false);
    setShowCamera(false);
    setProcessing(false);
    setScanSuccess(false);
    setScannedCode(null);
  };

  const getActionStyles = (action) => {
    const palette = {
      Keep: { bg: '#22c55e', border: '#16a34a' },
      Refill: { bg: '#FAC460', border: '#eab308' },
      Replace: { bg: '#ef4444', border: '#dc2626' },
      Discard: { bg: '#6b7280', border: '#4b5563' },
    };
    return palette[action] || palette['Discard'];
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
              'ean13',
              'ean8',
              'upc_a',
              'upc_e',
              'code128',
              'code39',
              'code93',
              'qr',
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
                {scanSuccess 
                  ? '✓ Código detectado correctamente'
                  : 'Posicione el código de barras dentro del recuadro'
                }
              </Text>
              
              {/* Recuadro de guía para la botella */}
              <View style={styles.frameContainer}>
                <View style={[
                  styles.frame,
                  scanSuccess && styles.frameSuccess
                ]}>
                  {/* Esquinas del marco */}
                  <View style={[
                    styles.corner, 
                    styles.cornerTopLeft,
                    scanSuccess && styles.cornerSuccess
                  ]} />
                  <View style={[
                    styles.corner, 
                    styles.cornerTopRight,
                    scanSuccess && styles.cornerSuccess
                  ]} />
                  <View style={[
                    styles.corner, 
                    styles.cornerBottomLeft,
                    scanSuccess && styles.cornerSuccess
                  ]} />
                  <View style={[
                    styles.corner, 
                    styles.cornerBottomRight,
                    scanSuccess && styles.cornerSuccess
                  ]} />
                  
                  {/* Icono de botella en el centro */}
                  <View style={styles.bottleIconContainer}>
                    <Text style={styles.bottleIcon}>
                      {scanSuccess ? '✓' : '🍾'}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.cameraHintText}>
                {scanSuccess 
                  ? 'Procesando información...'
                  : 'Asegúrese de que el código de barras sea visible'
                }
              </Text>
            </View>

            {/* Botón de captura manual (opcional) */}
            <View style={styles.cameraFooter}>
              {processing ? (
                <View style={styles.processingContainer}>
                  <Text style={styles.processingText}>Procesando imagen...</Text>
                  <View style={styles.dotsContainer}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>
                </View>
              ) : scanning ? (
                <View style={styles.scanningIndicator}>
                  <View style={styles.scanningDot} />
                  <Text style={styles.scanningText}>Buscando código...</Text>
                </View>
              ) : scanSuccess ? (
                <View style={styles.successIndicator}>
                  <Text style={styles.successText}>✓ Código escaneado</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePhoto}
                  activeOpacity={0.8}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
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
              { backgroundColor: actionStyles.bg, borderColor: actionStyles.border },
            ]}
          >
            <Text style={styles.actionText}>{result.action.toUpperCase()}</Text>
            <Text style={styles.actionSubtext}>Acción Recomendada</Text>
          </View>

          {/* Datos de Apoyo */}
          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>📊 Datos Registrados:</Text>
            {[
              { label: 'Producto', value: result.producto },
              { label: 'Aerolínea', value: result.aerolinea },
              { label: 'Sello', value: result.sello },
              { label: 'Nivel', value: result.nivel },
              { label: 'Condición', value: result.condicion },
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
            <Text style={styles.scanAgainButtonText}>🔄 ESCANEAR OTRA BOTELLA</Text>
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
          <Text style={styles.headerSubtitle}>Manejo de Botellas de Alcohol</Text>
        </View>

        {/* Área de Escaneo */}
        <View style={styles.scanCard}>
          <Text style={styles.scanEmoji}>📷</Text>
          <Text style={styles.scanTitle}>Escanear Botella</Text>
          <Text style={styles.scanSubtitle}>
            Posicione el código de barras frente a la cámara
          </Text>

          {/* Botón de Escaneo Grande */}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleInitiateScan}
            activeOpacity={0.8}
          >
            <Text style={styles.scanButtonText}>📷 INICIAR ESCANEO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}