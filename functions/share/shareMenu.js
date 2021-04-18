const shareMenu = (async (ctx) => {
    const menuInicial = []

    menuInicial.push([{ text: "Main Categories", callback_data: "mainCategories" }, { text: "All predictions", callback_data: "choicesAll" }],
        [{ text: "Rankings of your leagues 🏆", callback_data: "chooseLeagueToShare" }],
        [{ text: "Back", callback_data: "menuInicial" }])
    ctx.telegram.sendMessage(ctx.chat.id, "Choose one of the following options:", { reply_markup: { inline_keyboard: menuInicial } })
})

module.exports = shareMenu