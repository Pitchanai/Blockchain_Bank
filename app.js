const readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const account = {
    id: 1,
    name: '',
    balance: 0,
    details: '',
}

let day = 0

let totalAccount = []
let tempAccount = account
let menuIndex = ''
let selectedAccountIndex = 0

const mainMenuTxt = "Bank Features \n1. Create Account\n2. Deposit Money\n3. Withdraw Money\n4. Display Account Detail\n5. Check Balance\n6. Increase Year\nSelect : "
const createAccTxt = ["Account name : ", "Account details : "]
const selectAccountTxt = "Fill your account id : "
const depositMoneyTxt = "Deposit Money : "
const withdrawMoneyTxt = "Withdraw Money : "
const increaseYearTxt = "How many year you want to increase : "

const mainMenu = () => {
    return new Promise((resolve, reject) => {
        rl.question(mainMenuTxt, answer => {
            menuIndex = answer
            resolve()
        })
    })
}

const createAccountName = () => {
    return new Promise((resolve, reject) => {
        rl.question(createAccTxt[0], answer => {
            tempAccount.name = answer
            resolve()
        })
    })
}

const createAccountDetail = () => {
    return new Promise((resolve, reject) => {
        rl.question(createAccTxt[1], answer => {
            tempAccount.details = answer
            resolve()
        })
    })
}

const selectAccount = () => {
    return new Promise((resolve, reject) => {
        rl.question(selectAccountTxt, answer => {
            selectedAccountIndex = totalAccount.findIndex(account => account.id === parseInt(answer))
            resolve()
        })
    })
}

const depositMoney = () => {
    return new Promise((resolve, reject) => {
        rl.question(depositMoneyTxt, answer => {
            totalAccount[selectedAccountIndex].balance += parseFloat(answer)
            resolve()
        })
    })
}

const withdrawMoney = () => {
    return new Promise((resolve, reject) => {
        rl.question(withdrawMoneyTxt, answer => {
            totalAccount[selectedAccountIndex].balance -= parseFloat(answer)
            resolve()
        })
    })
}

const increaseYear = () => {
    return new Promise((resolve, reject) => {
        rl.question(increaseYearTxt, answer => {
            let year = parseInt(answer)
            day = day + (answer * 365)
            for (let i of year) {
                for (let account of totalAccount) {
                    account.balance = account.balance * 1.0175
                    account.balance = account.balance.toFixed(2)
                }
            }
            resolve()
        })
    })
}


async function main() {
    while (true) {
        console.log('***************************************')
        await mainMenu()
        switch(menuIndex) {
            case '1':
                console.log('***********************************')
                console.log('* [1] Create Account              *')
                console.log('***********************************')
                tempAccount = account
                await createAccountName()
                await createAccountDetail()
                totalAccount.push(tempAccount)
                console.log("Your account detail : ")
                console.log(tempAccount)
                break
            case '2':
                console.log('***********************************')
                console.log('* [2] Deposit Money               *')
                console.log('***********************************')
                await selectAccount()
                console.log("Welcome " + totalAccount[selectedAccountIndex].name)
                await depositMoney()
                console.log("Your balance : " + totalAccount[selectedAccountIndex].balance)
                break
            case '3':
                console.log('***********************************')
                console.log('* [3] Withdraw Money               *')
                console.log('***********************************')
                await selectAccount()
                console.log("Welcome " + totalAccount[selectedAccountIndex].name)
                await withdrawMoney()
                console.log("Your balance : " + totalAccount[selectedAccountIndex].balance)
                break
            case '4':
                console.log('***********************************')
                console.log('* [4] View Account Detail         *')
                console.log('***********************************')
                await selectAccount()
                console.log("Your account detail : ")
                console.log(tempAccount)
                break
            case '5':
                console.log('***********************************')
                console.log('* [5] Check Balance               *')
                console.log('***********************************')
                await selectAccount()
                console.log("Your balance : " + totalAccount[selectedAccountIndex].balance)
                break
            case '6':
                console.log('***********************************')
                console.log('* [6] Increase Year               *')
                console.log('***********************************')
                await increaseYear()
                break
        }
    }
}
main()
