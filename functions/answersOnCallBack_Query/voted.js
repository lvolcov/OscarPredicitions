const sqlFunctions = require('../sqlResources/sqlFunctions')
const db = require('../../db.json');

const voted = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id

    const info = await sqlFunctions.getVotes(telegramID)
    const voted = []
    Object.keys(info[0]).slice(4).map((elem, index) => {
        info[0][elem] !== "0" ? voted.push([{ text: String(db.categorias[elem].nomeMenuEn + ": " + db.categorias[elem].indicados[info[0][elem]].nomeCompletoEn), callback_data: String(db.categorias[elem].nomeResumido + " voltaMenuJaVotados") }]) : ""
        return 0
    })
    voted.push([{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])
    ctx.telegram.sendMessage(ctx.chat.id, "Already voted:", { reply_markup: { inline_keyboard: voted } })
})

module.exports = voted