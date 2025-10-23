/**
 * Conversor de Números Romanos
 * Módulo principal con funciones para conversión bidireccional
 */

const romanConverter = (function () {
    // Mapa de valores romanos EXTENDIDO (con paréntesis)
    const romanMap = [
        { symbol: '(X)', value: 10000 },  // 10,000
        { symbol: '(IX)', value: 9000 },   // 9,000
        { symbol: '(V)', value: 5000 },    // 5,000  ← AGREGAR ESTA LÍNEA
        { symbol: '(IV)', value: 4000 },   // 4,000
        { symbol: 'M', value: 1000 },
        { symbol: 'CM', value: 900 },
        { symbol: 'D', value: 500 },
        { symbol: 'CD', value: 400 },
        { symbol: 'C', value: 100 },
        { symbol: 'XC', value: 90 },
        { symbol: 'L', value: 50 },
        { symbol: 'XL', value: 40 },
        { symbol: 'X', value: 10 },
        { symbol: 'IX', value: 9 },
        { symbol: 'V', value: 5 },
        { symbol: 'IV', value: 4 },
        { symbol: 'I', value: 1 }
    ];
    // Validar número romano
    function isValidRoman(roman) {
        // Validación más simple
        const validChars = /^[MDCLXVI()]*$/;
        return validChars.test(roman.toUpperCase());
    }

    // Convertir número a romano
    function toRoman(number) {
        if (typeof number !== 'number' || number < 1 || number > 9999) {
            throw new Error('Número fuera de rango. Debe estar entre 1 y 9999.');
        }

        let result = '';
        let remaining = number;

        for (const { symbol, value } of romanMap) {
            while (remaining >= value) {
                result += symbol;
                remaining -= value;
            }
        }

        return result;
    }

    // Convertir romano a número
    // Convertir romano a número
    function fromRoman(roman) {
        const cleanRoman = roman.toUpperCase().trim();

        // Primero manejar los números con paréntesis
        let workingRoman = cleanRoman;
        let result = 0;

        // Procesar números con paréntesis
        const parenRegex = /\((IV|IX|V|X)\)/g;
        let match;

        while ((match = parenRegex.exec(workingRoman)) !== null) {
            const parenValue = match[1]; // IV, IX, V, o X
            const parenSymbol = `(${parenValue})`;
            const found = romanMap.find(item => item.symbol === parenSymbol);

            if (found) {
                result += found.value;
                workingRoman = workingRoman.replace(parenSymbol, ''); // Remover lo procesado
                parenRegex.lastIndex = 0; // Reiniciar regex
            }
        }

        // Ahora procesar el resto (sin paréntesis)
        let i = 0;
        while (i < workingRoman.length) {
            // Buscar pares de símbolos primero
            if (i + 1 < workingRoman.length) {
                const twoSymbols = workingRoman.substring(i, i + 2);
                const pair = romanMap.find(item => item.symbol === twoSymbols);

                if (pair) {
                    result += pair.value;
                    i += 2;
                    continue;
                }
            }

            // Buscar símbolo individual
            const oneSymbol = workingRoman[i];
            const single = romanMap.find(item => item.symbol === oneSymbol);

            if (single) {
                result += single.value;
                i += 1;
            } else {
                throw new Error(`Símbolo inválido: ${oneSymbol}`);
            }
        }

        // Validar que el número esté en rango
        if (result < 1 || result > 9999) {
            throw new Error('Número fuera de rango (1-9999)');
        }

        return result;
    }
    // Convertir romano a número
    // Convertir romano a número
    function fromRoman(roman) {
        const cleanRoman = roman.toUpperCase().trim();

        // Caso especial para (V) - 5000
        if (cleanRoman === '(V)') {
            return 5000;
        }

        let result = 0;
        let i = 0;

        while (i < cleanRoman.length) {
            // Buscar números entre paréntesis primero
            if (cleanRoman[i] === '(' && i + 3 < cleanRoman.length) {
                const closingParen = cleanRoman.indexOf(')', i);
                if (closingParen !== -1) {
                    const fullParen = cleanRoman.substring(i, closingParen + 1);

                    // Verificar todos los casos con paréntesis
                    const parenMap = {
                        '(IV)': 4000,
                        '(IX)': 9000,
                        '(V)': 5000,
                        '(X)': 10000
                    };

                    if (parenMap[fullParen]) {
                        result += parenMap[fullParen];
                        i = closingParen + 1;
                        continue;
                    }
                }
            }

            // Buscar pares de símbolos normales
            if (i + 1 < cleanRoman.length) {
                const twoSymbols = cleanRoman.substring(i, i + 2);
                const pair = romanMap.find(item => item.symbol === twoSymbols);

                if (pair) {
                    result += pair.value;
                    i += 2;
                    continue;
                }
            }

            // Buscar símbolo individual
            const oneSymbol = cleanRoman[i];
            const single = romanMap.find(item => item.symbol === oneSymbol);

            if (single) {
                result += single.value;
                i += 1;
            } else {
                throw new Error(`Símbolo inválido: ${oneSymbol}`);
            }
        }

        // Validar que el número esté en rango
        if (result < 1 || result > 9999) {
            throw new Error('Número fuera de rango (1-9999)');
        }

        return result;
    }

    // Mostrar resultado en UI
    function displayResult(elementId, message, type = 'success') {
        const element = document.getElementById(elementId);
        element.innerHTML = message;
        element.className = 'result ' + type;
    }

    // Convertir número a romano (UI)
    function convertToRoman() {
        const input = document.getElementById('numberInput');
        const number = parseInt(input.value);

        try {
            if (isNaN(number)) {
                throw new Error('Por favor ingresa un número válido');
            }

            const roman = toRoman(number);
            displayResult(
                'romanResult',
                `✅ <strong>${number}</strong> = <strong>${roman}</strong>`
            );
        } catch (error) {
            displayResult(
                'romanResult',
                `❌ <strong>Error:</strong> ${error.message}`,
                'error'
            );
        }
    }

    // Convertir romano a número (UI)
    function convertFromRoman() {
        const input = document.getElementById('romanInput');
        const roman = input.value.trim();

        try {
            if (!roman) {
                throw new Error('Por favor ingresa un número romano');
            }

            const number = fromRoman(roman);
            // ✅ AGREGAR ESTA VALIDACIÓN DEL RANGO:
            if (number < 1 || number > 9999) {
                throw new Error('Número fuera de rango (1-9999)');
            }
            displayResult(
                'numberResult',
                `✅ <strong>${roman.toUpperCase()}</strong> = <strong>${number}</strong>`
            );
        } catch (error) {
            displayResult(
                'numberResult',
                `❌ <strong>Error:</strong> ${error.message}`,
                'error'
            );
        }
    }

    // Inicializar eventos
    function init() {
        // Enter key support
        document.getElementById('numberInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') convertToRoman();
        });

        document.getElementById('romanInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') convertFromRoman();
        });

        // Auto-uppercase for roman input
        document.getElementById('romanInput').addEventListener('input', function (e) {
            this.value = this.value.toUpperCase();
        });

        console.log('✅ Conversor Romano inicializado correctamente');
    }

    // API pública
    return {
        toRoman,
        fromRoman,
        convertToRoman,
        convertFromRoman,
        init,
        isValidRoman
    };
})();

// Inicializar cuando el DOM esté listo - solo en navegador
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        romanConverter.init();
    });
}

// Exportar para testing con Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = romanConverter;
}