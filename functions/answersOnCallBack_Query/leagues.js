const sqlFunctions = require('../sqlResources/sqlFunctions')

const leagues = (async (ctx) => {
    const called = ctx.update.callback_query.data.split(" ", 2)[0]
    const previousInfo = ctx.update.callback_query.data.split(" ").slice(1).join(" ")
    const telegramID = ctx.update.callback_query.from.id

    switch (called) {
        case 'naoCriaLiga':
            ctx.answerCbQuery(called, { text: '❌ League not created', show_alert: true });
            break;
        case 'criaLiga':
            await sqlFunctions.createLeague(previousInfo, telegramID);
            ctx.answerCbQuery(called, { text: "✅ League has been created !", show_alert: true });
            break;
        case 'joinLeagueYes':
            await sqlFunctions.joinLeague(previousInfo, telegramID);
            ctx.answerCbQuery(called, { text: `✅ You are now a member of the League ${previousInfo}!`, show_alert: true });
            break;
        case 'leftLeagueYes':
            await sqlFunctions.leftLeague(previousInfo, telegramID);
            ctx.answerCbQuery(called, { text: `✅ You are no longer a member of the League ${previousInfo}!`, show_alert: true });
            break;
    }

    const info = await sqlFunctions.getLeaguesDetails(telegramID)
    const infoMenu = []

    if (info[0] === undefined) {
        infoMenu.push([{ text: 'Create a League', callback_data: 'createLeagueGetName' }, { text: 'Join a league', callback_data: 'joinLeague' }])
    } else {
        let hasOwnLeague = false
        let hasNoOwnLeague = false
        info.map((elem) => elem.TelegramIDDono === elem.TelegramIDParticipante ? hasOwnLeague = true : hasNoOwnLeague = true)

        if (hasOwnLeague) {
            infoMenu.push([{ text: 'Manage your League', callback_data: 'manageLeagues' }, { text: 'View your Leagues', callback_data: 'checkLeagues' }])
        } else {
            infoMenu.push([{ text: 'Create a League', callback_data: 'createLeagueGetName' }, { text: 'View your Leagues', callback_data: 'checkLeagues' }])
        }

        if (hasNoOwnLeague) {
            infoMenu.push([{ text: 'Join a league', callback_data: 'joinLeague' }, { text: 'Leave a league', callback_data: 'leftLeagueGetName' }])
            infoMenu.push([{ text: 'Public Leagues 🌎', callback_data: 'publicLeagues' }])
        } else {
            infoMenu.push([{ text: 'Join a league', callback_data: 'joinLeague' }, { text: 'Public Leagues 🌎', callback_data: 'publicLeagues' }])
        }
    }

    infoMenu.push([{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])
    ctx.telegram.sendMessage(ctx.chat.id, "Oscar Predictions Leagues:", { reply_markup: { inline_keyboard: infoMenu } })
})

module.exports = leagues