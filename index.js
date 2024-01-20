const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

let myLeads = leadsFromLocalStorage ? leadsFromLocalStorage : [];
render(myLeads);

tabBtn.addEventListener('click', function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const currentTabLink = tabs[0].url;
        addLead(currentTabLink);
    });
});

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener('click', function() {
    addLead(inputEl.value);
    inputEl.value = '';
});

function render(leads) {
    let listItems = '';
    leads.forEach(lead => listItems += `<li>
                                           <a target='_blank' href='${lead}'> ${lead} </a>
                                       </li>`
    );
    ulEl.innerHTML = listItems;
}

function addLead(lead) {
    myLeads.push(lead);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
}