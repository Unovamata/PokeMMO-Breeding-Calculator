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
          pricesButton = document.getElementById("prices");

    const breedersMenu = document.getElementById("gender-container"),
          powersMenu = document.getElementById("powers-container"),
          pricesMenu = document.getElementById("prices-container");

    breedersButton.addEventListener("click", function(){
        breedersMenu.style.display = "block";
        powersMenu.style.display = "none";
        pricesMenu.style.display = "none";
    });

    powersButton.addEventListener("click", function(){
        breedersMenu.style.display = "none";
        powersMenu.style.display = "block";
        pricesMenu.style.display = "none";
    });

    pricesButton.addEventListener("click", ShowTotalResultsScreen);

    function ShowTotalResultsScreen(){
        breedersMenu.style.display = "none";
        powersMenu.style.display = "none";
        pricesMenu.style.display = "block";
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
          totalItemsNeededTableInputs = document.getElementById("total-braces").querySelectorAll("input");

    const everstonePriceInputValue = document.getElementById("everstone-market-price").value,
          everstoneMarketPrice = isNaN(everstonePriceInputValue) ? 6000 : parseInt(everstonePriceInputValue);

    function SetTotalPrices(){
        var everstonesTotal = 0,
            numberOfBracesToBuy = 0,
            bracesTotal = 0,
            gendersSelectionsTotal = 0
            pokeballsTotal = 0;

        for(var i = 2; i <= bracesToBuy.length + 1; i++){
            const braceTypeInInventory = Number(itemsInInventory[i].value),
                  bracesToBuyOfType = Clamp(bracesToBuy[i - 2] - braceTypeInInventory, 0);

            numberOfBracesToBuy += bracesToBuyOfType;

            const inputTotal = totalItemsNeededTableInputs[i];

            inputTotal.value = bracesToBuyOfType;
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
        totalItemsNeededTableInputs[0].value = pokeballsMissing;

        // Everstones to buy input field;
        totalItemsNeededTableInputs[1].value = everstonesMissing;

        breedingTotalInput.value = everstonesTotal + bracesTotal + gendersSelectionsTotal + pokeballsTotal;
    }
});