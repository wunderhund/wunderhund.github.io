// Create listeners
window.addEventListener('load', addListeners)

// Run initial calculation
window.addEventListener('load', Calculate)

function addListeners(){
	// set loan start date to the first day of the next month:
	today = new Date();
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

	// Change height of main box
	const outheight = document.getElementById('output').clientHeight;
	newheight = 550+outheight
	mainbox = document.getElementById('main-box')
	mainbox.setAttribute("style",`height:${newheight}px`);
}
