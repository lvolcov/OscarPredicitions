const validateAnswer = ((answer) => {

    const format = /[^a-z0-9 ]/gi;
    if (answer.length > 16) {
        return '❌ Name too long ! ❌'
    } else if (answer.length < 6) {
        return '❌ Name too short ! ❌'
    } else if (format.test(answer)) {
        return '❌ Name containing special characters ❌'
    } else {
        return true
    }
})

module.exports = validateAnswer