/**
 * Conversor de Números Romanos
 * Módulo principal con funciones para conversión bidireccional
 */

const romanConverter = (function () {
    // Mapa de valores romanos
    const romanMap = [
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
        const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        return romanRegex.test(roman.toUpperCase());
    }

    // Convertir número a romano
    function toRoman(number) {
        if (typeof number !== 'number' || number < 1 || number > 3999) {
            throw new Error('Número fuera de rango. Debe estar entre 1 y 3999.');
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
    function fromRoman(roman) {
        const cleanRoman = roman.toUpperCase().trim();

        if (!isValidRoman(cleanRoman)) {
            throw new Error('Número romano inválido');
        }

        let result = 0;
        let i = 0;

        while (i < cleanRoman.length) {
            // Buscar pares de símbolos primero
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