/**
 * Tests para el Conversor de Números Romanos
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

    test('Lanza error para números fuera de rango', () => {
        expect(() => romanConverter.toRoman(0)).toThrow('Número fuera de rango');
        expect(() => romanConverter.toRoman(4000)).toThrow('Número fuera de rango');
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

    test('Lanza error para números romanos inválidos', () => {
        expect(() => romanConverter.fromRoman('IIII')).toThrow('Número romano inválido');
        expect(() => romanConverter.fromRoman('VV')).toThrow('Número romano inválido');
        expect(() => romanConverter.fromRoman('ABC')).toThrow('Número romano inválido');
        expect(() => romanConverter.fromRoman('IXIX')).toThrow('Número romano inválido');
    });

    test('Funciona con minúsculas', () => {
        expect(romanConverter.fromRoman('xiv')).toBe(14);
        expect(romanConverter.fromRoman('cm')).toBe(900);
    });

    test('Limpia espacios en blanco', () => {
        expect(romanConverter.fromRoman('  XIV  ')).toBe(14);
    });
});

// Tests para validación de números romanos
describe('Validación de Números Romanos', () => {

    test('Valida números romanos correctos', () => {
        expect(romanConverter.isValidRoman('XIV')).toBe(true);
        expect(romanConverter.isValidRoman('MMXXIV')).toBe(true);
        expect(romanConverter.isValidRoman('CM')).toBe(true);
        expect(romanConverter.isValidRoman('xc')).toBe(true); // minúsculas
    });

    test('Rechaza números romanos incorrectos', () => {
        expect(romanConverter.isValidRoman('IIII')).toBe(false);
        expect(romanConverter.isValidRoman('VV')).toBe(false);
        expect(romanConverter.isValidRoman('ABCD')).toBe(false);
        expect(romanConverter.isValidRoman('IIV')).toBe(false);
    });
});

// Tests de integración - Conversión bidireccional
describe('Conversión Bidireccional', () => {

    test('Conversión ida y vuelta funciona correctamente', () => {
        const testNumbers = [1, 4, 9, 49, 99, 499, 999, 1499, 2024, 3999];

        testNumbers.forEach(number => {
            const roman = romanConverter.toRoman(number);
            const convertedBack = romanConverter.fromRoman(roman);
            expect(convertedBack).toBe(number);
        });
    });
});