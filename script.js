// JSON - JavaScript Object Notation 
// Way for the developers to store and send data from
// browser to the client.
// Manifest.json - To configure our app and provide metadata about it.

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(tabs){

    // Hey Chrome, I just wanna query you for some tabs
    // Which tabs: active: true, currentWindow: true. If there's another window open in the background, chrome will grab link from
    // from the current window.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


//  Wrap the code below in a render() function
function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //  Add the item to the listItems variable instead of the ulEl.innerHTML
        listItems += `
        <li>
                    <a target="_blanK" href="${leads[i]}">
                        ${leads[i]}
                    </a>
                </li>
        `
    }
    
    
    // 3. Render the listItems inside the unordered list using ulEl.innerHTML
    ulEl.innerHTML = listItems
    }

delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    // To clear the input after clicking on button
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//  Call the renderLeads() function
    render(myLeads)
  
})


// Arguments vs Parameters
// Parameters has to be declared inside of the function
// Arguments are given outside of the function