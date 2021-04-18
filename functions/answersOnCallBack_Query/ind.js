const sqlFunctions = require('../sqlResources/sqlFunctions')
const geraLista = require('../geraLista');
const db = require('../../db.json');

const ind = (async (ctx) => {
    const called = ctx.update.callback_query.data.split(" ", 2)[0]
    const previousInfo = ctx.update.callback_query.data.split(" ").slice(1).join(" ")
    const telegramID = ctx.update.callback_query.from.id

    const categoriaDoIndicado = Object.keys(db.categorias).filter((item) => {
        const filter = Object.keys(db.categorias[item].indicados).filter((ind) => ind === called)
        return filter.length === 0 ? false : true
    }).toString()
    await sqlFunctions.postVote(telegramID, categoriaDoIndicado, called)
    const info = await sqlFunctions.getVotes(telegramID)
    const nonVoted = []
    const voted = []
    ctx.answerCbQuery(called, { text: '✅ Prediction Saved !', show_alert: true })

    Object.keys(info[0]).slice(4).map((elem, index) => {
        if (info[0][elem] === "0") {
            nonVoted.push({ text: db.categorias[elem].nomeMenuEn, callback_data: db.categorias[elem].nomeResumido })
        } else {
            voted.push([{ text: String(db.categorias[elem].nomeMenuEn + ": " + db.categorias[elem].indicados[info[0][elem]].nomeCompletoEn), callback_data: String(db.categorias[elem].nomeResumido + " " + previousInfo) }])
        }
        return 0
    })

    const result = previousInfo === "voltaMenuJaVotados" ? voted : geraLista(nonVoted)
    result.push([{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])

    nonVoted.length == 0 ? ctx.telegram.sendMessage(ctx.chat.id, "Congratulations, you voted for all categories!", { reply_markup: { inline_keyboard: result } }) : ctx.telegram.sendMessage(ctx.chat.id, "Select the category for your prediction:", { reply_markup: { inline_keyboard: result } })
})

module.exports = ind