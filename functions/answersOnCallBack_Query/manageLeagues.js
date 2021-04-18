const sqlFunctions = require('../sqlResources/sqlFunctions')
const manageOwnLeague = require('../../textsMenus/manageOwnLeague')

const manageLeagues = (async (ctx) => {
    const called = ctx.update.callback_query.data.split(" ", 2)[0]
    const previousInfo = ctx.update.callback_query.data.split(" ").slice(1)
    const telegramID = ctx.update.callback_query.from.id

    if (previousInfo[0] === "changeTo") {
        await sqlFunctions.changeLeaguePrivacy(telegramID, previousInfo[1])
        const privacy = previousInfo[1] == 0 ? "Private 🔑" : "Public 🌎"
        ctx.answerCbQuery(called, { text: `✅ Your league is now ${privacy}!`, show_alert: true })
    } else if (previousInfo[0] && previousInfo[0] !== "deleteLastMessage") {
        await sqlFunctions.changeLeagueName(telegramID, previousInfo.join(" "))
        ctx.answerCbQuery(called, { text: `✅ Your league name has been changed to ${previousInfo.join(" ")}!`, show_alert: true })
    }

    const info = await sqlFunctions.getLeaguesDetails(telegramID)
    let ownLeague = []
    info.map((elem) => elem.TelegramIDDono === elem.TelegramIDParticipante ? ownLeague.push(elem) : 0)

    const infoMenu = [[{ text: 'Change name', callback_data: 'changeLeagueNameGetName' }, { text: 'Members', callback_data: 'leaguePlayersList' }]]
    ownLeague[0].Privada === 0 ? infoMenu.push([{ text: 'Make your league public 🌎', callback_data: 'manageLeagues changeTo 1' }]) : infoMenu.push([{ text: 'Make your league private 🔑', callback_data: 'manageLeagues changeTo 0' }])


    infoMenu.push([{ text: '⇦   ⇦   ⇦   Back to Leagues', callback_data: 'leagues' }])
    ctx.telegram.sendMessage(ctx.chat.id, String(manageOwnLeague(ownLeague[0].NomeLiga)), { reply_markup: { inline_keyboard: infoMenu } })
})

module.exports = manageLeagues