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
  {
    date: "Oct 24, 2023",
    name: "Amazon Purchases",
    type: "Shopping",
    amount: 120.50,
    status: "Completed"
  },
  {
    date: "Oct 23, 2023",
    name: "TechCorp Inc.",
    type: "Salary",
    amount: "+$4500.00",
    status: "Completed"
  }
];
let totalBalance = {
    balance: 1000000.00
}

//Debit Card Elements Selected
let Debit_card_name = document.getElementById("debit-card-name").textContent = debitCard.name;
let Debit_card_expiry = document.getElementById("debit-card-expiry").textContent = debitCard.expiry;
let Debit_card_Number = document.getElementById("debit-card-number").textContent= debitCard.number;

//Credit Card Elements Selected
let Credit_card_name = document.getElementById("credit-card-name").textContent = creditCard.name;
let Credit_card_Number = document.getElementById("credit-card-number").textContent = creditCard.number;
let Credit_card_expiry = document.getElementById("credit-card-expiry").textContent = creditCard.expiry;

//Getting Balance From Object
let balance = document.getElementById("current-balance").textContent = totalBalance.balance;

const transactionList = document.getElementById("transaction-list");

transactions.forEach(item => {
    transactionList.innerHTML += `
    <tr>
      <td>${item.date}</td>
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>$${item.amount}</td>
      <td>${item.status}</td>
    </tr>
    `;
});

//Adding Transaction to the Recent Transcation list
function addTransaction(){

    const newTransaction = {
        date: "8 Feb 2025",
        name: "Netflix",
        type: "Recharge",
        amount: +90,
        status: "Completed"
    }
    transactions.push(newTransaction)
    totalBalance.balance += newTransaction.amount
    renderBalance()
    renderTransaction()
}

addTransaction()

//Displaying the Transaction on the Screens
function renderTransaction() {
    transactionList.innerHTML = "";

    transactions.forEach(item => {
        transactionList.innerHTML += `
        <tr>
          <td>${item.date}</td>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.amount}</td>
          <td>${item.status}</td>
        </tr>
        `;
    });
}

function renderBalance(){
    document.getElementById("current-balance").textContent = `$${totalBalance.balance}`
}
renderBalance()

 

// function limit(){
//     if (balance >= 1000){
//         alert("Your Balance limit is over 1000000 so extra money will be added to your saving balance")
//     }
// }
// limit()

// function lowerlimit(){
//     if (balance <= 100){
//         alert("minimum Balance required is 100 ")
//     }
// }
// lowerlimit()

//12450


 function savings(){
    var savingBalanceElement = document.getElementById("savings-balance")
    var savingBalance = parseFloat(
    savingBalanceElement.textContent.replace("$", "").replace(",", "")
    
)
    if(totalBalance.balance >= 1000000){
    let extra = totalBalance.balance - 1000000;
    savingBalance += extra
    totalBalance.balance = 1000000;
    

    savingBalanceElement.textContent = `$${savingBalance.toFixed(2)}`
    renderBalance()
}
 }
 savings()



 function deductcredit(){
    const now = new Date();

    //credit Outstanding Value
    let value = parseFloat(document.getElementById("credit-outstanding").textContent.replace("$", "").replace(",", ""));
    

    if (now.getDay() === 8){
        totalBalance.balance -= value;
        document.getElementById("credit-outstanding").textContent = "$0.00";
        renderBalance();
        console.log("Credit card outstanding cleared: $" + value);
    }
 }
 setInterval(deductcredit, 1000)


 function interestonsavings(){
   
      
    let amount = totalBalance.balance;
    let time = 1;
    let rate = 1;

    let interest = amount * time * rate /100
    let ans = Math.ceil(interest)

    let display = document.getElementById("income-amount").textContent = "$" + ans;
    console.log(display)
 }
 interestonsavings()





