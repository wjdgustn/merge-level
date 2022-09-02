const JSON5 = require('json5');

module.exports.ADOFAIParser = level => {
    try {
        return JSON5.parse(level);
    }
    catch (e) {
        const formattedLevel = String(level).trim()
            .replaceAll('\r\n', '\n')
            .replaceAll(', ,', ',')
            .replaceAll(',,', ',')
            .replaceAll('],\n}', ']\n}')
            .replaceAll('}\n', '},\n')
            .replaceAll('},\n\t]', '}\n\t]')
            .replaceAll(', },', ' },')
            .replaceAll(', }', ' }')
            .replaceAll('\n', '')
            .replaceAll('}\n', '},\n')
            .replaceAll(']\n\t"decorations', '],\n\t"decorations')
            .replaceAll(']\t"decorations', '],\t"decorations');

        // require('fs').writeFileSync('./debug.adofai', formattedLevel);
        return JSON5.parse(formattedLevel);
    }
}