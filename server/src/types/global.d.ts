interface Colors {
  green: 'green';
  blue: 'blue';
  magenta: 'magenta';
}

declare global {
    var debug: (param: any, color?: keyof Colors) => void;
}

declare var debug: (param: any, color?: keyof Colors) => void;
