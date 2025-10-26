# Screens Directory

This directory contains all the screen components for the GateCheck application, organized for better maintainability and code separation.

## Structure

- **ScanScreen.tsx** - Initial scanning screen with the main interface
- **CameraScreen.tsx** - Camera view for barcode and bottle detection
- **ResultScreen.tsx** - Results display screen showing bottle data and recommended actions
- **types.ts** - TypeScript interfaces and types used across screens
- **index.ts** - Barrel export file for clean imports

## Usage

```typescript
import { ScanScreen, CameraScreen, ResultScreen, BottleData } from '../screens';
```

## Styling

Each screen has its corresponding styles in the `styles/` directory:
- `scanStyles.ts` - Styles for ScanScreen
- `cameraStyles.ts` - Styles for CameraScreen  
- `resultStyles.ts` - Styles for ResultScreen

## Benefits

- **Separation of Concerns**: Each screen is isolated with its own logic and styles
- **Reusability**: Components can be easily reused or modified independently
- **Maintainability**: Easier to debug and update individual screens
- **Type Safety**: Shared types ensure consistency across components
