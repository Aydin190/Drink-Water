const smallCups = document.querySelectorAll(".cup-small");
const litres = document.getElementById("litres");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

updateBigCup();

// We are looping through each small cup and we are attaching a clickEventListener
smallCups.forEach(
    (cup,idx)=>{
        // When a cup is clicked we call the highlights cup function and we pass the position of the clicked cup.
        cup.addEventListener("click", ()=>highlightsCup(idx));
    }
);


// We are creating the highlights cup function now to highlight the small cups up to the selected cup.
// If we click the fourth cup, then the first three cups will also be highlighted along with the fourth cup.

function highlightsCup (idx) {
    // If the last cup is full and clicked again, then un-select it.
    if(idx===smallCups.length-1 && smallCups[idx].classList.contains("full")) {
        idx--; 
    }
    
    // If the clicked cup is full, and the next one is not full, then un-select this cup.
    else if(smallCups[idx].classList.contains("full") && smallCups[idx].nextElementSibling.classList.contains("full") == false) {
        idx--;
    }

    // Loop through all the small cups.
    smallCups.forEach((cup,idx2)=> {
        // If the index is less than or equal to the clicked one, then mark as full.
        if(idx2<=idx) {
            cup.classList.add("full");
        } else{
            cup.classList.remove("full");
        }

    })

    updateBigCup();
}




function updateBigCup() {
    // Counting how many small cups are full.
    const fullCups = document.querySelectorAll(".cup-small.full").length;
    const totalCups = smallCups.length; // Total number of small cups.
    // If no cups are full, hide the percentage display
    if(fullCups===0) {
        percentage.style.visibility="hidden";
        percentage.style.height="0";
    } else{
        // Otherwise showing the percentage filled and updating the height and the text.
        percentage.style.visibility="visible";
        percentage.style.height=`${(fullCups/totalCups)* 330}px`; // Adjusting height proportionately
        percentage.innerText=`${(fullCups/totalCups)* 100}%`; // We are displaying the percentage text.
    }

    // If all the cups are full, then hiding the remained section
    if(fullCups===totalCups) {
        remained.style.visibility="hidden";
        remained.style.height="0";
    } else{
        // Otherwise showing the remained water and adjusting the height.
        remained.style.visibility="visible";
        remained.style.height=`${((totalCups-fullCups)/totalCups)*330}px`; // Adjusting the remaining height proportionately
        litres.innerText=`${((totalCups-fullCups)/totalCups)*2}L`; // Calculate and display the remaining litres.
    }
}