import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Estilos generales
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 24,
  },

  // Pantalla de Cámara
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraCenterArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraInstructionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  frameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 250,
    height: 400,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#2090ED',
    borderWidth: 4,
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 12,
  },
  bottleIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleIcon: {
    fontSize: 80,
    opacity: 0.4,
  },
  cameraHintText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cameraFooter: {
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#ffffff',
  },
  processingContainer: {
    alignItems: 'center',
  },
  processingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },

  // Pantalla de Resultado
  actionCard: {
    borderRadius: 24,
    borderWidth: 4,
    padding: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  actionSubtext: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  dataCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    width: '100%',
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    // Se eliminó 'justifyContent' y 'alignItems: center'
    // para permitir que la fila se expanda verticalmente con el texto envuelto.
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#bfdbfe',
  },
  dataLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    width: '35%', // Asigna un ancho fijo para que la etiqueta sea consistente
    flexShrink: 0, // Evita que se encoja
    marginRight: 10, // Espacio entre etiqueta y valor
  },
  dataValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1, // Permite que tome el espacio restante
    flexWrap: 'wrap', // **CLAVE:** Permite que el texto se envuelva a la siguiente línea
    textAlign: 'right', // Alinea el valor a la derecha
  },
  confirmButton: {
    backgroundColor: '#33d055ff',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#898e9465',
    borderRadius: 50,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    opacity: 0.8,
  },
  scanAgainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  // Pantalla de Escaneo Inicial
  scanContainer: {
    flex: 1,
    backgroundColor: '#000064',
  },
  scanContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#bfdbfe',
  },
  scanCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
    alignItems: 'center',
  },
  scanEmoji: {
    fontSize: 96,
    marginBottom: 24,
  },
  scanTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  scanSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#000064',
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  // Estilos adicionales para controles de volumen
  volumeHint: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  volumeControlsIndicator: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  volumeControlsText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedButton: {
    borderWidth: 3,
    borderColor: '#3b82f6',
    transform: [{ scale: 1.02 }],
  },
  selectedButtonAlt: {
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  volumeHintInitial: {
    color: '#6b7280',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
    // Estilos para el estado de éxito del escaneo
frameSuccess: {
  borderColor: '#22c55e', // Verde cuando se detecta el código
},

cornerSuccess: {
  borderColor: '#22c55e', // Verde para las esquinas
},

// Indicador de escaneo activo
scanningIndicator: {
  alignItems: 'center',
  paddingVertical: 20,
},

scanningDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: '#3b82f6',
  marginBottom: 12,
},

scanningText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},

// Indicador de éxito
successIndicator: {
  alignItems: 'center',
  paddingVertical: 20,
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  borderRadius: 12,
  paddingHorizontal: 32,
},

successText: {
  color: '#22c55e',
  fontSize: 18,
  fontWeight: '700',
},
// Estilos para detección de botellas
frameBottleDetected: {
  borderColor: '#3b82f6', // Azul cuando se detecta botella
},

frameComplete: {
  borderColor: '#22c55e', // Verde cuando ambos están detectados
  shadowColor: '#22c55e',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 20,
},

// Cuadros de detección de objetos
detectionBox: {
  position: 'absolute',
  borderWidth: 3,
  borderColor: '#22c55e',
  backgroundColor: 'rgba(34, 197, 94, 0.1)',
  borderRadius: 8,
},

detectionLabel: {
  position: 'absolute',
  top: -25,
  left: 0,
  backgroundColor: '#22c55e',
  color: '#ffffff',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
  fontSize: 12,
  fontWeight: '700',
},

// Contenedor de estado dual
statusContainer: {
  flexDirection: 'row',
  gap: 20,
  marginBottom: 16,
  justifyContent: 'center',
},

statusItem: {
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  minWidth: 100,
},

statusItemSuccess: {
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  borderColor: '#22c55e',
},

statusEmoji: {
  fontSize: 32,
  marginBottom: 4,
},

statusText: {
  color: '#ffffff',
  fontSize: 12,
  fontWeight: '600',
  textTransform: 'uppercase',
},

// Pantalla de carga del modelo
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000000',
},

loadingText: {
  color: '#ffffff',
  fontSize: 18,
  fontWeight: '600',
  marginTop: 16,
},

modelLoadingText: {
  color: '#6b7280',
  fontSize: 12,
  marginTop: 12,
  textAlign: 'center',
},
scanImage: {
  width: 80,
  height: 80,
  marginBottom: 20,
},
buttonIcon: {
  width: 24,
  height: 24,
  marginRight: 8,
}
});