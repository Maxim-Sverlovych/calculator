const inputs = document.querySelectorAll('.input')

const incomeSalary = document.getElementById('income-salary'),
    incomeFreelance = document.getElementById('income-freelance'),
    incomeExtraOne = document.getElementById('income-extra-1'),
    incomeExtraTwo = document.getElementById('income-extra-2');

const costFlat = document.getElementById('costs-flat'),
    costsHouseServices = document.getElementById('costs-house-services'),
    costsTransport = document.getElementById('costs-transport'),
    costsCredit = document.getElementById('costs-credit');

const totalMonthInput = document.getElementById('total-month'),
    totalDayInput = document.getElementById('total-day'),
    totalYearInput = document.getElementById('total-year');

let totalMonth, totalDay, totalYear

const moneyBoxRange = document.getElementById('money-box-range'),
    accumulationInput = document.getElementById('accumulation'),
    spend = document.getElementById('spend');

moneyBoxRange.disabled = true
let accumulation, totalPercents = 0

const countingAvailableMoney = () => {
    const totalPerMonth = serializeStrToNumber(incomeSalary)
        + serializeStrToNumber(incomeFreelance)
        + serializeStrToNumber(incomeExtraOne)
        + serializeStrToNumber(incomeExtraTwo)
    const totalExpense = serializeStrToNumber(costFlat)
        + serializeStrToNumber(costsHouseServices)
        + serializeStrToNumber(costsTransport)
        + serializeStrToNumber(costsCredit)
    totalMonth = totalPerMonth - totalExpense
    totalMonthInput.value = totalMonth

    totalMonthInput.value ? moneyBoxRange.disabled = false : true
    calculationPercents()
}

const serializeStrToNumber = string => string.value ? parseInt(string.value) : 0

inputs.forEach(input => {
    input.addEventListener('input', countingAvailableMoney)
})

const moneyBoxHandler = event => {
    const totalPercentEl = document.getElementById('total-percents')
    totalPercents = event.target.value
    totalPercentEl.innerHTML = totalPercents
    calculationPercents()
}

moneyBoxRange.addEventListener('input', moneyBoxHandler)

const calculationPercents = () => {
    accumulation = ((totalMonth * totalPercents) / 100).toFixed()
    accumulationInput.value = accumulation

    spend.value = totalMonth - accumulation
    totalDay = (spend.value / 30).toFixed()
    totalDayInput.value = totalDay

    totalYear = accumulation * 12
    totalYearInput.value = totalYear
}