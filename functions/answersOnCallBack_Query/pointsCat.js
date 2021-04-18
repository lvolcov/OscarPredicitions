const table = require("table");
const db = require('../../db.json');

const pointsCat = (ctx) => {
    const info = [['CATEGORY', 'POINTS']]

    Object.keys(db.categorias).map((categoria) => {
        info.push([db.categorias[categoria].nomeMenuEn, db.categorias[categoria].peso])
    })

    const config = {
        border: table.getBorderCharacters('ramac'),
        columns: {
            0: { width: 12, wrapWord: true },
            1: { width: 12, wrapWord: true, alignment: 'center', width: 10 }
        }
    }

    const lista = String("<pre>" + table.table(info, config) + "</pre>");
    ctx.telegram.sendMessage(ctx.chat.id, String("Score of each category:\n\n" + lista), {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: '⇦   ⇦   ⇦   Back to more information', callback_data: 'moreInfo' }]] }
    })
}

module.exports = pointsCat