const changeNameMessage = ((nome) => {
    return `Your current name in the ranking is: <u>${nome}</u>.\n\n\
 - Your new name must be between 6 and 15 characters \n\n\
 - Cannot contain special characters\n`
})

module.exports = changeNameMessage