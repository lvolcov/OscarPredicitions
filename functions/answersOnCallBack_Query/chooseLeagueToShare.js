const sqlFunctions = require('../sqlResources/sqlFunctions')

const chooseLeagueToShare = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id
    const info = await sqlFunctions.getLeaguesList(telegramID)

    const menu = []

    info.map((elem, index) => {
        menu.push([{ text: elem, callback_data: String("leagueRanking " + String(elem)) }])
        return 0
    })
    menu.push([{ text: '⇦   ⇦   ⇦   Back', callback_data: 'shareMenu' }])
    info.length == 0 ? ctx.telegram.sendMessage(ctx.chat.id, "You are not participating in any league yet.", { reply_markup: { inline_keyboard: menu } }) : ctx.telegram.sendMessage(ctx.chat.id, "Select one of your leagues:", { reply_markup: { inline_keyboard: menu } })

})

module.exports = chooseLeagueToShare