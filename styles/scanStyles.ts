import { StyleSheet } from "react-native";

export const scanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000064',
  },
  content: {
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
  scanImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  scanButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
});