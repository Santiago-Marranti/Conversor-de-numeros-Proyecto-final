/**
 * Tests para el Conversor de Números Romanos v2.0
 */

// Importar las funciones del conversor
const romanConverter = require('./script');

// Tests para conversión de número a romano
describe('Conversión de Número a Romano', () => {

    test('Convierte números básicos correctamente', () => {
        expect(romanConverter.toRoman(1)).toBe('I');
        expect(romanConverter.toRoman(5)).toBe('V');
        expect(romanConverter.toRoman(10)).toBe('X');
        expect(romanConverter.toRoman(50)).toBe('L');
        expect(romanConverter.toRoman(100)).toBe('C');
        expect(romanConverter.toRoman(500)).toBe('D');
        expect(romanConverter.toRoman(1000)).toBe('M');
    });

    test('Convierte números con restas correctamente', () => {
        expect(romanConverter.toRoman(4)).toBe('IV');
        expect(romanConverter.toRoman(9)).toBe('IX');
        expect(romanConverter.toRoman(40)).toBe('XL');
        expect(romanConverter.toRoman(90)).toBe('XC');
        expect(romanConverter.toRoman(400)).toBe('CD');
        expect(romanConverter.toRoman(900)).toBe('CM');
    });

    test('Convierte números complejos correctamente', () => {
        expect(romanConverter.toRoman(2024)).toBe('MMXXIV');
        expect(romanConverter.toRoman(149)).toBe('CXLIX');
        expect(romanConverter.toRoman(3999)).toBe('MMMCMXCIX');
        expect(romanConverter.toRoman(1987)).toBe('MCMLXXXVII');
        expect(romanConverter.toRoman(777)).toBe('DCCLXXVII');
    });

    test('Convierte números extendidos correctamente', () => {
        expect(romanConverter.toRoman(4000)).toBe('(IV)');
        expect(romanConverter.toRoman(5000)).toBe('(V)');
        expect(romanConverter.toRoman(9000)).toBe('(IX)');
        expect(romanConverter.toRoman(9999)).toBe('(IX)CMXCIX');
    });

    test('Lanza error para números fuera de rango', () => {
        expect(() => romanConverter.toRoman(0)).toThrow('Número fuera de rango');
        expect(() => romanConverter.toRoman(10000)).toThrow('Número fuera de rango');
        expect(() => romanConverter.toRoman(-5)).toThrow('Número fuera de rango');
    });

    test('Lanza error para valores no numéricos', () => {
        expect(() => romanConverter.toRoman('abc')).toThrow();
        expect(() => romanConverter.toRoman(null)).toThrow();
        expect(() => romanConverter.toRoman(undefined)).toThrow();
    });
});

// Tests para conversión de romano a número
describe('Conversión de Romano a Número', () => {

    test('Convierte símbolos básicos correctamente', () => {
        expect(romanConverter.fromRoman('I')).toBe(1);
        expect(romanConverter.fromRoman('V')).toBe(5);
        expect(romanConverter.fromRoman('X')).toBe(10);
        expect(romanConverter.fromRoman('L')).toBe(50);
        expect(romanConverter.fromRoman('C')).toBe(100);
        expect(romanConverter.fromRoman('D')).toBe(500);
        expect(romanConverter.fromRoman('M')).toBe(1000);
    });

    test('Convierte números con restas correctamente', () => {
        expect(romanConverter.fromRoman('IV')).toBe(4);
        expect(romanConverter.fromRoman('IX')).toBe(9);
        expect(romanConverter.fromRoman('XL')).toBe(40);
        expect(romanConverter.fromRoman('XC')).toBe(90);
        expect(romanConverter.fromRoman('CD')).toBe(400);
        expect(romanConverter.fromRoman('CM')).toBe(900);
    });

    test('Convierte números complejos correctamente', () => {
        expect(romanConverter.fromRoman('MMXXIV')).toBe(2024);
        expect(romanConverter.fromRoman('CXLIX')).toBe(149);
        expect(romanConverter.fromRoman('MMMCMXCIX')).toBe(3999);
        expect(romanConverter.fromRoman('MCMLXXXVII')).toBe(1987);
        expect(romanConverter.fromRoman('DCCLXXVII')).toBe(777);
    });

    test('Convierte números con paréntesis correctamente', () => {
        expect(romanConverter.fromRoman('(IV)')).toBe(4000);
        expect(romanConverter.fromRoman('(V)')).toBe(5000);
        expect(romanConverter.fromRoman('(IX)')).toBe(9000);
    });

    test('Convierte números mixtos con paréntesis', () => {
        expect(romanConverter.fromRoman('(V)DLV')).toBe(5555);
        expect(romanConverter.fromRoman('(IX)CMLXVII')).toBe(9967);
        expect(romanConverter.fromRoman('(IV)CMXCIX')).toBe(4999);
    });

    test('Lanza error para caracteres inválidos', () => {
        expect(() => romanConverter.fromRoman('ABCD')).toThrow('Símbolo inválido: A');
        expect(() => romanConverter.fromRoman('(ABC)')).toThrow('Símbolo inválido: (');
    });

    test('Funciona con minúsculas', () => {
        expect(romanConverter.fromRoman('xiv')).toBe(14);
        expect(romanConverter.fromRoman('cm')).toBe(900);
        expect(romanConverter.fromRoman('(iv)')).toBe(4000);
    });

    test('Limpia espacios en blanco', () => {
        expect(romanConverter.fromRoman('  XIV  ')).toBe(14);
        expect(romanConverter.fromRoman('  (IV)  ')).toBe(4000);
    });
});

// Tests para validación de números romanos
describe('Validación de Números Romanos', () => {

    test('Valida números romanos correctos', () => {
        expect(romanConverter.isValidRoman('XIV')).toBe(true);
        expect(romanConverter.isValidRoman('MMXXIV')).toBe(true);
        expect(romanConverter.isValidRoman('CM')).toBe(true);
        expect(romanConverter.isValidRoman('xc')).toBe(true); // minúsculas
        expect(romanConverter.isValidRoman('(IV)')).toBe(true);
        expect(romanConverter.isValidRoman('(V)')).toBe(true);
        expect(romanConverter.isValidRoman('(IX)')).toBe(true);
    });

    test('Rechaza caracteres inválidos', () => {
        expect(romanConverter.isValidRoman('ABCD')).toBe(false);
        expect(romanConverter.isValidRoman('(ABC)')).toBe(false); // Paréntesis inválidos
        expect(romanConverter.isValidRoman('XYZ')).toBe(false);
    });
});

// Tests de integración - Conversión bidireccional
describe('Conversión Bidireccional', () => {

    test('Conversión ida y vuelta funciona correctamente', () => {
        const testNumbers = [1, 4, 9, 49, 99, 499, 999, 1499, 2024, 3999, 4000, 5000, 9000, 9999];

        testNumbers.forEach(number => {
            const roman = romanConverter.toRoman(number);
            const convertedBack = romanConverter.fromRoman(roman);
            expect(convertedBack).toBe(number);
        });
    });
});

// Tests para números extendidos
describe('Conversión de Números Extendidos', () => {

    test('Convierte números grandes correctamente', () => {
        expect(romanConverter.toRoman(4000)).toBe('(IV)');
        expect(romanConverter.toRoman(5000)).toBe('(V)');
        expect(romanConverter.toRoman(5555)).toBe('(V)DLV');
        expect(romanConverter.toRoman(9999)).toBe('(IX)CMXCIX');
    });

    test('Convierte números con paréntesis de vuelta', () => {
        expect(romanConverter.fromRoman('(IV)')).toBe(4000);
        expect(romanConverter.fromRoman('(V)DLV')).toBe(5555);
        expect(romanConverter.fromRoman('(IX)CMXCIX')).toBe(9999);
    });
});