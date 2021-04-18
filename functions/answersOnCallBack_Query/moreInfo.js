const sqlFunctions = require('../sqlResources/sqlFunctions')

const moreInfo = (async (ctx) => {
    //Closing date set to 26/04/2021 - 00:00 UTC
    const closingTime = new Date(Date.UTC(2021, 3, 26, 00, 00, 0, 0));
    const timeNow = Date.now()

    const called = ctx.update.callback_query.data.split(" ", 2)[0]
    const previousInfo = ctx.update.callback_query.data.split(" ").slice(1).join(" ")
    const telegramID = ctx.update.callback_query.from.id

    called === 'naoSalvaNome' ? ctx.answerCbQuery(called, { text: "❌ Name has not been saved", show_alert: true }) : ""

    if (called === 'salvaNome') {
        await sqlFunctions.changeName(telegramID, previousInfo)
        ctx.answerCbQuery(called, { text: `✅ Your ranking name has been changed !`, show_alert: true })
    }
    let moreInfoMenu = []
    if (timeNow < closingTime) {
        moreInfoMenu.push([{ text: "Category scores", callback_data: "pointsCat" }, { text: "My Predictions", callback_data: "votesList" }],
            [{ text: "Change your name", callback_data: "changeName" }, { text: "Reset Predictions", callback_data: "resetVotes" }],
            [{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])
    } else {
        moreInfoMenu.push([{ text: "Category scores", callback_data: "pointsCat" }, { text: "My Predictions", callback_data: "votesList" }],
            [{ text: "Change your name", callback_data: "changeName" }], [{ text: '⇦   ⇦   ⇦   Back to the home menu', callback_data: 'menuInicial' }])
    }
    ctx.telegram.sendMessage(ctx.chat.id, "More information:", { reply_markup: { inline_keyboard: moreInfoMenu } })
})

module.exports = moreInfo