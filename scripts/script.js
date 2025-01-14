// zoekt in de character-section in de ul naar de buttons en selecteert ze allemaal
const charactersButtons = document.querySelectorAll(".character-section ul button")

// zoekt in de team-section naar een ul en selecteert deze
const teamList = document.querySelector(".team-section ul");

// zoekt naar het balkje die groen moet worden als je meer buttons aanklikt
const progress = document.querySelector("progress");

// zoekt naar het nummertje hoeveel lege li's er nog zijn
const teamCounter = document.querySelector("#team-counter span");


charactersButtons.forEach( charactersButtons => {
    charactersButtons.addEventListener("click",addCharacterToTeam);
});


function addCharacterToTeam(event) {
    const characterButton = event.currentTarget;

    const characterImg = characterButton.querySelector("img");
    const characterName = characterImg.alt;

    // maakt een clone van de afbeelding zodat je hem niet verplaatst
    const characterImgClone = characterImg.cloneNode();

    // zoekt de eerste lege list item
    const firstEmptySlot = teamList.querySelector("li:empty");  
    

    // maakt een button waarmee je je caracter weer weg kan halen
    const deleteButton = document.createElement("button");
    deleteButton.ariaLabel = `verwijder ${characterName}`;
    deleteButton.addEventListener("click", removeCharacterFromTeam);

    // plaatst waar je op klikt in het eerst beschikbare lege slot
    firstEmptySlot.appendChild(characterImgClone);

    // plaatst de butten tege;ijk met de afbeelding van hierboven
    firstEmptySlot.appendChild(deleteButton);


    updateCounterAndProgress (1) ;

    checkInteractivityOfCharacterList ();

    checkCompleteOfTeam();
}


// maakt de button om iemand uit je team te halen werkend 
function removeCharacterFromTeam(event) {

    const deleteButton = event.currentTarget;

    // zoekt het dichtsbijzijnde Li
    const slot = deleteButton.closest("li");

    // zoekt het plaatje 
    const characterImg = slot.querySelector("img");

    // zorgt ervoor dat de button en het plaatje weg gehaald wordt
    deleteButton.remove();
    characterImg.remove();

    updateCounterAndProgress(-1);
    checkCompleteOfTeam();

}


// veranderd het nummertje wat er al staat - 1
function updateCounterAndProgress ( delta ) {
    progress.value = progress.value + delta;

    const currentCount = teamCounter.textContent;
    const newCount = currentCount - delta;
    teamCounter.textContent = newCount;
}

function checkInteractivityOfCharacterList () {
    const emptySLot = teamList.querySelector("li:empty");

    // niet compleet
    if (emptySLot) {
        charactersButtons.forEach(charactersButtons => {
            charactersButtons.disabeld = false;
        });
    }


    // wel compleet
    else {
        charactersButtons.forEach(charactersButtons => {
            charactersButtons.disabeld = true;
        });
    }
}

function checkCompleteOfTeam() {
    const emptySLot = teamList.querySelector("li:empty");

    // niet compleet
    if (emptySLot) {
        teamList.classList.remove("is-complete");
    }


    // wel compleet
    else {
        teamList.classList.add("is-complete");
    }
}