const sqlFunctions = require('../sqlResources/sqlFunctions')
const db = require('../../db.json');
const geraLista = require('../geraLista');

const volCategoria = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id

    const info = await sqlFunctions.getVotes(telegramID)
    const nonVoted = []
    Object.keys(info[0]).slice(4).map((elem, index) => {
        info[0][elem] === "0" ? nonVoted.push({ text: db.categorias[elem].nomeMenuEn, callback_data: db.categorias[elem].nomeResumido }) : ""
        return 0
    })
    const result = geraLista(nonVoted)
    result.push([{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])
    nonVoted.length == 0 ? ctx.telegram.sendMessage(ctx.chat.id, "Congratulations, you voted for all categories!", { reply_markup: { inline_keyboard: result } }) : ctx.telegram.sendMessage(ctx.chat.id, "Select the category for your prediction:", { reply_markup: { inline_keyboard: result } })

})

module.exports = volCategoria