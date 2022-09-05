// Configure tabs
window.addEventListener('load', setupTabs)

// Create Calc listeners
window.addEventListener('load', addCalcListeners)

// Create Afford listeners
window.addEventListener('load', addAffordListeners)

// Run initial calculations
window.addEventListener('load', Calculate)
window.addEventListener('load', Afford)

function setupTabs(){
	const tabButtons = Array.from(document.getElementsByClassName("tab-button"));
    const tabContents = Array.from(document.getElementsByClassName("tab-content"));

	// add tab listeners
	tabButtons.forEach(button => {
		button.addEventListener("click", function (evt) {
			// pull every element with the same data-type as the tab that was clicked:
			content = evt.target.dataset.type;
			
			// Remove 'active' class from all tabs, then set the clicked one to 'active':
			tabButtons.forEach(btn => {
				btn.classList.remove('active');
				if (btn.dataset.type == evt.target.dataset.type) {
					btn.classList.add('active');
				}
			});
	
			// Remove 'active' class from all contents, then set the correct one to 'active':
			tabContents.forEach(btn => {
				btn.classList.remove('active');
				if (btn.dataset.type == evt.target.dataset.type) {
					btn.classList.add('active');
				}
			});
		});
	});
}

function addCalcListeners(){
	// set loan start date to the first day of the next month:
	const today = new Date();
	document.getElementById('startDate').valueAsDate = new Date(today.getFullYear(), today.getMonth()+1, 01);

	const principal = document.getElementById('principal')
	const interest = document.getElementById('interest')
	const years = document.getElementById('years')
	const startDate = document.getElementById('startDate')

	principal.addEventListener('change',Calculate);
	interest.addEventListener('change',Calculate);
	years.addEventListener('change',Calculate);
	startDate.addEventListener('change',Calculate);
}

// Calculate mortgage
function Calculate() {
	const outputDiv = document.getElementById("output")
	const P = document.getElementById('principal')
    const apr = document.getElementById('interest')
	const n = document.getElementById('years')
	const start = document.getElementById('startDate')
	const N = n.value * 12;
	const r = apr.value / 100 / 12;
	const magic = ((1 + r) ** N);
	const c = (P.value * ((r * magic) / (magic - 1)));
	const endDate = new Date(start.valueAsDate.setMonth(start.valueAsDate.getMonth() + N));

	// Clear output div
	outputDiv.innerHTML = "";

	// Build output string
    const output = `Total number of payments: ${N}` + "<br />" + 
	    "Loan amount: " + Number(P.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +  "<br />" + 
        "Interest rate: " + Number(apr.value).toFixed(2)+"%" +  "<br />" +
        "Monthly payment: " + c.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "<br />" +
		"Annual Debt Service: " + (c * 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "<br />" +
        "Total Cost of Loan: " + (c * N).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "<br />" +
		"Total Interest Cost: " + ((c * N)-P.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "<br />" +
		"End Date of Loan: " + endDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

	// Populate output
	outputDiv.innerHTML = output;
}

function addAffordListeners(){
	const grossIncome = document.getElementById('gross-income')
	const downPayment = document.getElementById('down-payment')
	const fico = document.getElementById('fico')
	const affordAPR = document.getElementById('afford-interest')
	const affordYears = document.getElementById('afford-years')

	grossIncome.addEventListener('change',Afford);
	downPayment.addEventListener('change',Afford);
	fico.addEventListener('change',Afford);
	affordAPR.addEventListener('change',Afford);
	affordYears.addEventListener('change',Afford);
}

function Afford() {
	const affordOutput = document.getElementById('afford-output')
	const GI = document.getElementById('gross-income').value / 12
	const down = document.getElementById('down-payment').value
	const credit = document.getElementById('fico').value
	const affordInterest = document.getElementById('afford-interest').value / 100;
	const affordMonthlyInterest = Number(parseFloat(affordInterest / 12).toPrecision(4));
	const affordN = document.getElementById('afford-years').value * 12

	const monthlyPayment = GI * 0.28
	const affordMagic = ((1 + affordMonthlyInterest) ** affordN);
	const maxMonthly = (monthlyPayment / ((affordMonthlyInterest * affordMagic) / (affordMagic - 1)))
	const maxDown = down / credit
	const maxMort = Number(down) + Math.min(maxMonthly,maxDown)
	
	// Clear output div
	affordOutput.innerHTML = "";

	// Build output string
	const afford = `Total number of payments: ${affordN}` + "<br />" + 
		"Interest rate: " + Number(affordInterest*100).toFixed(2)+"%" +  "<br />" +
		`Max Monthly Payment: ${monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` + "<br />" + 
		"Max Mortgage Based on Monthly Payment: " + maxMonthly.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +  "<br />" + 
		"Max Mortgage Based on Down Payment: " + maxDown.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +  "<br />" +
		"Max House Price I Can Afford: " + maxMort.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    console.log(afford)
	
	// Populate output
	affordOutput.innerHTML = afford;
}