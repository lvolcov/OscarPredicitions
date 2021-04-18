const sqlFunctions = require('../sqlResources/sqlFunctions')
const db = require('../../db.json');

const menuInicial = (async (ctx) => {
    //Closing date set to 26/04/2021 - 00:00 UTC
    const closingTime = new Date(Date.UTC(2021, 3, 26, 00, 00, 0, 0));
    const timeNow = Date.now()

    const telegramID = ctx.update.callback_query.from.id
    let info = await sqlFunctions.getVotes(telegramID)
    const menuInicial = []
    const voted = []

    Object.keys(info[0]).slice(4).map((elem, index) => {
        if (info[0][elem] !== "0") {
            voted.push([{
                text: String(db.categorias[elem].nomeMenuEn + ": " + db.categorias[elem].indicados[info[0][elem]].nomeCompletoEn),
                callback_data: String(db.categorias[elem].nomeResumido + " voltaMenuJaVotados")
            }])
        }
        return 0
    })

    if (String(telegramID) === process.env.TELEGRAM_ID_ALLOWED_1 || String(telegramID) === process.env.TELEGRAM_ID_ALLOWED_2) {
        menuInicial.push([{ text: "Menu Admin", callback_data: "adminMenu" }])
    }
    let menuSentence = "Predictions are now closed !"
    if (timeNow < closingTime) {
        menuSentence = "Choose one of the following options:"
        if (voted.length === 0) {
            menuInicial.push([{ text: "🎥   Start your predictions   🎥", callback_data: "volCategoria" }])
        } else if (voted.length === 23) {
            menuInicial.push([{ text: "Review your predictions", callback_data: "voted" }])
        } else {
            menuInicial.push([{ text: "Continue predictions", callback_data: "volCategoria" }, { text: "Review your predictions", callback_data: "voted" }])
        }
    }
    menuInicial.push([{ text: "Leagues", callback_data: "leagues" }, { text: "More info", callback_data: "moreInfo" }], [{ text: "Share your Oscar Predictions", callback_data: "shareMenu" }])
    ctx.telegram.sendMessage(ctx.chat.id, menuSentence, { reply_markup: { inline_keyboard: menuInicial } })
})

module.exports = menuInicial