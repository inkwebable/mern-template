// ========================================================================
// SETTINGS/COLOURS
// ========================================================================

// PAGE
const TextLight = '#333';
const TextDark = '#333';
const Border = '#bfbfbf';
const BorderDark = '#8e8e8e';
const Error = '#dc2a4d';
const ErrorLight = '#ffcfca';
const ErrorDark = '#bb2847';
const Valid = '#259c05';
const ValidLight = '#eef6df';
const Warning = '#eeb320';
const Light = Border;
const Readonly = '#dedede';
const SuccessBg = '#eef6df';
const SuccessBorder = '#8ab535';
const ErrorBg = '#fae2e7';
const ErrorBorder = Error;
const WarningBg = '#fdf7e7';
const WarningBorder = Warning;
const LightBorder = Light;
const TableBorder = '#efefef';
const BubbleBorder = '#d5e1eb';
const TableEmptyCell = '#cccccc';
const White = '#ffffff';
const LightBg = White;
const Outline = '#4d90fe';
const Disabled = '#e4e4e4';
const DisabledText = '#cecece';

export const colors = {
  bg: White,
  textLight: TextLight,
  textDark: TextDark,
  border: Border,
  borderDark: BorderDark,
  error: Error,
  errorLight: ErrorLight,
  errorDark: ErrorDark,
  valid: Valid,
  warning: Warning,
  readonly: Readonly,
  hr: Border,
  White,
  alerts: {
    success: {
      bg: SuccessBg,
      border: SuccessBorder,
    },
    error: {
      bg: ErrorBg,
      border: ErrorBorder,
    },
    warning: {
      bg: WarningBg,
      border: WarningBorder,
    },
    light: {
      bg: LightBg,
      border: LightBorder,
    },
  },
  table: {
    border: TableBorder,
    emptyCell: TableEmptyCell,
  },
  Outline,
  Disabled,
  DisabledText,
  validLight: ValidLight,
  bubbleBorder: BubbleBorder,
} as any;
