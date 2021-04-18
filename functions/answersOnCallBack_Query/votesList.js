const sqlFunctions = require('../sqlResources/sqlFunctions')
const table = require("table");
const db = require('../../db.json');

const votesList = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id
    const info = await sqlFunctions.getVotes(telegramID)
    const voted = [['CATEGORY', 'PREDICTION']]

    Object.keys(info[0]).slice(4).map((elem, index) => {
        if (info[0][elem] !== "0") {
            voted.push([String(db.categorias[elem].nomeMenuEn), String(db.categorias[elem].indicados[info[0][elem]].nomeCompletoEn)])
        }
        return 0
    })

    if (voted.length > 1) {
        const config = { border: table.getBorderCharacters('ramac'), columns: { 0: { width: 12, wrapWord: true }, 1: { width: 12, wrapWord: true } } }
        const lista = String("<pre>" + table.table(voted, config) + "</pre>");
        ctx.telegram.sendMessage(ctx.chat.id, String("Your Predictions:\n\n" + lista), { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: '⇦   ⇦   ⇦   Back to more information', callback_data: 'moreInfo' }]] } })
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, "You haven't given any predictions yet.", { reply_markup: { inline_keyboard: [[{ text: "🎥   Start your predictions   🎥", callback_data: "volCategoria" }], [{ text: '⇦   ⇦   ⇦   Back to more info', callback_data: 'moreInfo' }]] } })
    }
})

module.exports = votesList