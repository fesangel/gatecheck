import { StyleSheet } from "react-native";

export const resultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // fondo crema claro
  },
  scrollContent: {
    padding: 24,
  },

  /** Tarjeta de acción */
  actionCard: {
    borderRadius: 28,
    borderWidth: 4,
    padding: 32,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  actionText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  actionSubtext: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E0E7FF',
    opacity: 0.9,
    textAlign: 'center',
  },

  /** Tarjeta de datos */
  dataCard: {
    backgroundColor: '#E5E7EB', // gris claro sutil
    borderRadius: 18,
    padding: 26,
    marginBottom: 28,
    width: '100%',
  },
  dataTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0A2342',
    marginBottom: 18,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
  },
  dataLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    width: '40%',
    flexShrink: 0,
    marginRight: 8,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D1117',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },

  /** Botón primario */
  confirmButton: {
    backgroundColor: '#0A2342',
    borderRadius: 100,
    paddingVertical: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  confirmButtonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  /** Botón secundario */
  scanAgainButton: {
    borderWidth: 2,
    borderColor: '#0A2342',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 22,
    elevation: 4,
  },
  scanAgainButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0A2342',
    textAlign: 'center',
  },
});
