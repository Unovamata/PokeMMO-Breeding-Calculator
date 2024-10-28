var bracesPrices = 10000,
    bracesToBuy = [0, 0, 0, 0, 0, 0];

var everstonePrice = 6000,
    everstonesToBuy = 0;

var genderSelectionPrice = 0
    bredChildren = 0,
    genderSelectionTotal = 0;

var pokeballPrice = 200;

var parent;

document.addEventListener("DOMContentLoaded", function() {
    const breedersButton = document.getElementById("breeders"),
          powersButton = document.getElementById("powers"),
          pricesButton = document.getElementById("prices"),
          settingsButton = document.getElementById("settings");

    const breedersMenu = document.getElementById("gender-container"),
          powersMenu = document.getElementById("powers-container"),
          pricesMenu = document.getElementById("prices-container"),
          settingsMenu = document.getElementById("settings-container");

    breedersButton.addEventListener("click", function(){
        SelectTab(breedersMenu, breedersButton);
        HideTab(powersMenu, powersButton);
        HideTab(pricesMenu, pricesButton);
        HideTab(settingsMenu, settingsButton);
    });

    powersButton.addEventListener("click", function(){
        HideTab(breedersMenu, breedersButton);
        SelectTab(powersMenu, powersButton);
        HideTab(pricesMenu, pricesButton);
        HideTab(settingsMenu, settingsButton);
    });

    pricesButton.addEventListener("click", ShowTotalResultsScreen);

    settingsButton.addEventListener("click", function(){
        HideTab(breedersMenu, breedersButton);
        HideTab(powersMenu, powersButton);
        HideTab(pricesMenu, pricesButton);
        SelectTab(settingsMenu, settingsButton);
    });

    function SelectTab(element, button){
        element.style.display = "block";
        button.classList.add("selected");
    }

    function HideTab(element, button){
        element.style.display = "none";
        button.classList.remove("selected");
    }

    function ShowTotalResultsScreen(){
        HideTab(breedersMenu, breedersButton);
        HideTab(powersMenu, powersButton);
        HideTab(settingsMenu, settingsButton);
        SelectTab(pricesMenu, pricesButton);
    }
    
    const calculateButton = document.getElementById("calculate"),
          treeContainer = document.getElementById("tree");

    const IVsToPass = document.getElementById("IVs").querySelectorAll("input");

    function ResetData(){
        everstonesToBuy = 0;
        bracesToBuy = [0, 0, 0, 0, 0, 0];
        bredChildren = 0;
        genderSelectionPrice = Number(document.getElementById("gender-selection-price").value);
        pokeballsNeeded = 0;
    }

    calculateButton.addEventListener("click", function(){
        if(IVsToPass.length == 0) return;

        ResetData();

        const IVs = []

        IVsToPass.forEach(function(element){
            if (element.checked) {
                data = element.dataset.label;

                IVs.push(data);
            }
        });

        const IVCount = IVs.length;

        if(IVCount == 0) return;
        treeContainer.innerHTML = "";

        parent = new Node(IVs, "")

        RecursiveIVIsolation(parent);

        // Reference to the tree container
        const ul = document.createElement("ul");
        treeContainer.appendChild(ul);

        // Populate the tree
        const childrenCount = parent.Count();

        treeContainer.style.width = `${230 * childrenCount / 2}px`;
        PopulateTree(parent, document.getElementById("tree").querySelector("ul"));

        const pageSize = treeContainer.querySelector("li").offsetWidth + 150;

        treeContainer.style.width = `${PxToVw(pageSize)}vw`;

        SetTotalPrices();

        ShowTotalResultsScreen();
    });

    function RecursiveIVIsolation(node, parent = null, depth = 1){
        IVs = node.value;

        if (IVs.length <= 1) return;

        var leftIVs = IVs.slice()
        var removedLeftIV = leftIVs.shift();
        var removedLeftName = GetItemSource(removedLeftIV);

        var rightIVs = IVs.slice()
        var removedRightIV = rightIVs.pop();
        var removedRightName = GetItemSource(removedRightIV)

        const leftNode = new Node(leftIVs, removedRightName, "female");
        const rightNode = new Node(rightIVs, removedLeftName);
        
        node.children.push(leftNode)
        node.children.push(rightNode)

        depth += 1
        if(leftIVs.length >= 1 || rightIVs.length >= 1) bredChildren += 1;

        RecursiveIVIsolation(leftNode, parent, depth)
        RecursiveIVIsolation(rightNode, parent, depth)
    }

    function GetItemSource(IV){
        itemSrc = "stats/";

        switch(IV) {
            case "Nature":
                itemSrc += "everstone.png";
                everstonesToBuy += 1;
            break;

            case "HP":
                itemSrc += "weight.png";
                bracesToBuy[0] += 1;
            break;

            case "Attack":
                itemSrc += "power.png";
                bracesToBuy[1] += 1;
            break;

            case "Defense":
                itemSrc += "belt.png";
                bracesToBuy[2] += 1;
            break;

            case "Sp. Attack":
                itemSrc += "lens.png";
                bracesToBuy[3] += 1;
            break;

            case "Sp. Defense":
                itemSrc += "band.png";
                bracesToBuy[4] += 1;
            break;

            case "Speed":
                itemSrc += "anklet.png";
                bracesToBuy[5] += 1;
            break;
        }
        
        return itemSrc;
    }

    function PopulateTree(node, parentElement) {
        // Create a new <li> for the current node
        const li = document.createElement("li");
    
        // Create a div for the node's value
        const div = node.Graph();
        li.appendChild(div);
    
        // If the node has children, create a <ul> for them
        if (node.children.length > 0) {
            const ul = document.createElement("ul");
    
            // Recursively populate the tree for each child node
            node.children.forEach(child => {
                PopulateTree(child, ul);
            });
    
            // Append the <ul> of children to the current <li>
            li.appendChild(ul);
        }
    
        // Append the current <li> to the parent element
        parentElement.appendChild(li);
    }


    //##############################################################################################


    const itemsInInventory = document.getElementById("items-in-inventory").querySelectorAll("input");

    const everstonesTotalInput = document.getElementById("everstones-total-price"),
          bracesTotalInput = document.getElementById("braces-total-price"),
          breedingTotalInput = document.getElementById("breeding-total-price"),
          genderSelectionTotalInput = document.getElementById("gender-selection-total-price"),
          pokeballsTotalInput = document.getElementById("pokeballs-total-price"),
          battlePointsTotalInput = document.getElementById("battle-points-total"),
          totalItemsNeededTableInputs = document.getElementById("total-braces").querySelectorAll("input"),
          totalItemsToPurchaseInputs = document.getElementById("total-braces-to-purchase").querySelectorAll("input");

    var everstonePriceInputValue = document.getElementById("everstone-market-price").value,
        everstoneMarketPrice = isNaN(everstonePriceInputValue) ? 6000 : parseInt(everstonePriceInputValue);

    function ExtractEverstonePrice(){
        everstonePriceInputValue = document.getElementById("everstone-market-price").value,
        everstoneMarketPrice = isNaN(everstonePriceInputValue) ? 6000 : parseInt(everstonePriceInputValue);
    }

    var battlePointsAvailable = document.getElementById("battle-points-available").value,
        battlePointBraces = battlePointsAvailable / 750;

    function ExtractBattlePointsAvailable(){
        battlePointsAvailable = document.getElementById("battle-points-available").value,
        battlePointBraces = Math.floor(battlePointsAvailable / 750);
    }

    function SetTotalPrices(){
        ExtractEverstonePrice();
        ExtractBattlePointsAvailable();

        var everstonesTotal = 0,
            numberOfBracesToBuy = 0,
            bracesTotal = 0,
            gendersSelectionsTotal = 0
            pokeballsTotal = 0;

        for(var i = 2; i <= bracesToBuy.length + 1; i++){
            const braceTypeInInventory = Number(itemsInInventory[i].value),
                  amountOfBracesNeeded = bracesToBuy[i - 2];
            
            var missingBracesToBuy = Clamp(amountOfBracesNeeded - braceTypeInInventory, 0),
                battlePointsBracesToBuy = 0;

            numberOfBracesToBuy += missingBracesToBuy;

            const inputTotal = totalItemsNeededTableInputs[i];

            inputTotal.value = amountOfBracesNeeded;

            // Managing Battle Points & Items To Buy
            battlePointsBracesToBuy = Math.min(battlePointBraces, missingBracesToBuy);

            // Update `battlePointBraces` and `missingBracesToBuy` to reflect the purchase
            var minBracesToBuy = Math.min(battlePointBraces, missingBracesToBuy);
            battlePointBraces -= minBracesToBuy;
            missingBracesToBuy -= minBracesToBuy;

            const itemCountPurchaseTotal = totalItemsToPurchaseInputs[i];
            
            itemCountPurchaseTotal.value = missingBracesToBuy;

            const battlePointsItemCountTotal = totalItemsToPurchaseInputs[i + 8];

            battlePointsItemCountTotal.value = battlePointsBracesToBuy;
        }

        const everstonesHeld = Number(itemsInInventory[1].value);
        var everstonesMissing = Clamp(everstonesToBuy - everstonesHeld, 0);
        everstonesTotal = everstoneMarketPrice * everstonesMissing;

        bracesTotal = numberOfBracesToBuy * 10000;

        const pokeballsHeld = Number(itemsInInventory[0].value);
        var pokeballsMissing = Clamp(bredChildren - pokeballsHeld, 0);
        pokeballsTotal = pokeballPrice * pokeballsMissing;

        everstonesTotalInput.value = everstonesTotal;
        bracesTotalInput.value = bracesTotal;
        pokeballsTotalInput.value = pokeballsTotal;

        var genderSelections = Clamp(Math.ceil((bredChildren - 1) / 2), 0);
        gendersSelectionsTotal = genderSelections * genderSelectionPrice;
        genderSelectionTotalInput.value = genderSelections * genderSelectionPrice;

        // Pokeballs to buy input field;
        totalItemsNeededTableInputs[0].value = bredChildren;
        totalItemsToPurchaseInputs[0].value = pokeballsMissing;

        // Everstones to buy input field;
        totalItemsNeededTableInputs[1].value = everstonesToBuy;
        totalItemsToPurchaseInputs[1].value = everstonesMissing;

        breedingTotalInput.value = everstonesTotal + bracesTotal + gendersSelectionsTotal + pokeballsTotal;
    }
});