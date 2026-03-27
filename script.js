const debitCard = {
    name: "Vatsu",
    number: "**** **** **** 4289",
    expiry: "12/28"
};

const creditCard = {
    name: "Vatsu",
    number: "**** **** **** 8834",
    expiry: "09/27"
};

const transactions = [
    { date: "Oct 24, 2023", name: "Amazon Purchases", type: "Shopping", amount: -120.50, status: "Completed" },
    { date: "Oct 23, 2023", name: "TechCorp Inc.", type: "Salary", amount: 4500.00, status: "Completed" }
];

const totalBalance = { balance: 1000000.00 };

const STORAGE_KEYS = {
    BALANCE: 'bank_total_balance_session',
    TRANSACTIONS: 'bank_transactions_session'
};

const transactionList = document.getElementById('transaction-list');

function loadState() {
    const storedBalance = sessionStorage.getItem(STORAGE_KEYS.BALANCE);
    if (storedBalance !== null && !Number.isNaN(Number(storedBalance))) {
        totalBalance.balance = Number(storedBalance);
    }
    

    const storedTransactions = sessionStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (storedTransactions) {
        try {
            const parsed = JSON.parse(storedTransactions);
            if (Array.isArray(parsed)) {
                transactions.length = 0;
                transactions.push(...parsed);
            }
        } catch (error) {
            console.warn('Could not parse stored transactions', error);
        }
    }
}
loadState()

function saveState() {
    sessionStorage.setItem(STORAGE_KEYS.BALANCE, totalBalance.balance.toString());
    sessionStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

function renderBalance() {
    const current = Number(totalBalance.balance);
    const safeBalance = Number.isNaN(current) ? 0 : current;
    const formatted = safeBalance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const element = document.getElementById('current-balance');
    if (element) {
        element.textContent = `$${formatted}`;
    }
}
renderBalance()

function renderTransaction() {
    if (!transactionList) return;
    transactionList.innerHTML = '';
    transactions.forEach(item => {
        const formattedAmount = Number(item.amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const sign = item.amount < 0 ? '-' : '+';
        transactionList.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${sign}$${Math.abs(formattedAmount)}</td>
                <td>${item.status}</td>
            </tr>`;
    });
}
renderTransaction()

function updateBalance(amountChange) {
    totalBalance.balance = Number(totalBalance.balance) + Number(amountChange);
    if (Number.isNaN(totalBalance.balance)) {
        totalBalance.balance = 0;
    }
    renderBalance();
    saveState();
}

function initializeCardDetails() {
    document.getElementById('debit-card-name').textContent = debitCard.name;
    document.getElementById('debit-card-expiry').textContent = debitCard.expiry;
    document.getElementById('debit-card-number').textContent = debitCard.number;

    document.getElementById('credit-card-name').textContent = creditCard.name;
    document.getElementById('credit-card-expiry').textContent = creditCard.expiry;
    document.getElementById('credit-card-number').textContent = creditCard.number;
}
initializeCardDetails()

function addTransaction() {
    const newTransaction = {
        date: new Date().toLocaleDateString(),
        name: 'Netflix',
        type: 'Recharge',
        amount: -90,
        status: 'Completed'
    };
    transactions.push(newTransaction);
    updateBalance(newTransaction.amount);
    renderTransaction();
}

// remove auto-invocation so the balance doesn't drift on reload.
// Call addTransaction() only when user purposely triggers it.

function savings() {
    const savingBalanceElement = document.getElementById('savings-balance');
    if (!savingBalanceElement) return;
    let savingBalance = parseFloat(savingBalanceElement.textContent.replace('$', '').replace(',', '')) || 0;

    if (totalBalance.balance >= 1000000) {
        const extra = totalBalance.balance - 1000000;
        savingBalance += extra;
        totalBalance.balance = 1000000;
        savingBalanceElement.textContent = `$${savingBalance.toFixed(2)}`;
        renderBalance();
        saveState();
    }
}
savings()

function deductcredit() {
    const now = new Date();
    const value = parseFloat(document.getElementById('credit-outstanding').textContent.replace('$', '').replace(',', '')) || 0;

    if (now.getDay() === 8 && value > 0) {
        updateBalance(-value);
        document.getElementById('credit-outstanding').textContent = '$0.00';
        console.log('Credit card outstanding cleared: $' + value);
    }
}
deductcredit()

function interestonsavings() {
    const amount = totalBalance.balance;
    const interest = amount * 1 * 1 / 100;
    document.getElementById('income-amount').textContent = `$${Math.ceil(interest)}`;
}
interestonsavings()

function interestonFD() {
    const fdAmount = parseFloat(document.getElementById('fixed-deposit').textContent.replace('$', '').replace(',', '')) || 0;
    const interest = fdAmount * 1 * 1 / 100;
    document.getElementById('expense-amount').textContent = `$${Math.ceil(interest)}`;
}
interestonFD()

function sendMoney() {
    const profileBtn = document.getElementById('action-send-money');
    if (!profileBtn) return;
    profileBtn.addEventListener('click', function () {
        const img = document.createElement('img');
        img.src = 'image.png';
        img.alt = 'Displayed on double-click';
        img.style.width = '500px';
        img.style.height = '500px';
        img.style.position = 'fixed';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.zIndex = '1000';
        img.style.border = '2px solid #000';
        document.body.appendChild(img);
        img.addEventListener('click', function () { document.body.removeChild(img); });
    });
}
sendMoney()

function takeLoan() {
    const select = document.getElementById('action-request-loan');
    if (!select) return;
    select.addEventListener('click', () => {
        const salaryInput = prompt('Enter Monthly Salary');
        if (salaryInput === null) return;
        const salary = Number(salaryInput);
        if (Number.isNaN(salary) || salary <= 0) {
            alert('Please enter a valid numeric salary greater than 0.');
            return;
        }
        alert(salary >= 30000 ? 'You are Eligible for Loan' : 'You are not eligible for Loan');
    });
}
takeLoan()

function recharge() {
    const select = document.getElementById('action-recharge');
    if (!select) return;
    select.addEventListener('click', () => {
        const phoneNumber = prompt('Enter phone number to recharge:');
        if (!phoneNumber) return;
        const newTransaction = {
            date: new Date().toLocaleDateString(),
            name: 'Phone Recharge',
            type: 'Recharge',
            amount: -50,
            status: 'Completed'
        };
        transactions.push(newTransaction);
        updateBalance(newTransaction.amount);
        renderTransaction();
    });
}
recharge()

function payEmi() {
    const select = document.getElementById('action-pay-emi');
    if (!select) return;
    const value = parseFloat(document.getElementById('loan-remaining-amount').textContent.replace('$', '').replace(',', '')) || 0;
    select.addEventListener('click', () => {
        if (!confirm('Amount will be Deducted Balance')) return;
        const newTransaction = {
            date: new Date().toLocaleDateString(),
            name: 'EMI Paid',
            type: 'EMI',
            amount: -145000,
            status: 'Completed'
        };
        transactions.push(newTransaction);
        updateBalance(newTransaction.amount);
        renderTransaction();
    });
}
payEmi()

function setPin(){
    let select = document.getElementById('action-set-pin')
    select.addEventListener("click", ()=>{

        let enter = prompt("Enter 6 digit Pin")
        if (enter.length == 6){
            console.log("Pin Entered Correctly")

            let enter2 = prompt("Enter Same Pin Again")
            if (enter.length == 6){
            console.log("Pin Entered Correctly")
        }
        alert("Pin Set Successfully")
        }
        else alert("You have to enter 6 digit pin")

    })
}
setPin()