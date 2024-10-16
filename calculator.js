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

    pricesButton.addEventListener("click", function(){
        breedersMenu.style.display = "none";
        powersMenu.style.display = "none";
        pricesMenu.style.display = "block";
    });
    
    const calculateButton = document.getElementById("calculate"),
          treeContainer = document.getElementById("tree"),
          header = document.getElementById("header");

    class Node {
        constructor(value, item){
            this.value = value;
            this.children = [];
            this.item = item;
        }

        Count(){
            var count = 1;

            this.children.forEach(function(child){
                count += child.Count()
            });

            return count
        }
            

        Graph(){
            const div = document.createElement("div");
            const IVs = this.value;

            const itemsAndIVs = CreateItemsAndIVCounter(div, IVs, this.item);

            IVs.forEach(function(IV){
                const box = document.createElement("a");
                box.classList.add("box");

                switch(IV){
                    case "Nature":
                        box.classList.add("nature");
                        box.textContent = "Nat";
                    break;

                    case "HP":
                        box.classList.add("hp");
                        box.textContent = "HP";
                    break;

                    case "Attack":
                        box.classList.add("attack");
                        box.textContent = "Atk";
                    break;

                    case "Defense":
                        box.classList.add("defense");
                        box.textContent = "Def";
                    break;

                    case "Sp. Attack":
                        box.classList.add("spatk");
                        box.textContent = "SpAtk";
                    break;

                    case "Sp. Defense":
                        box.classList.add("spdef");
                        box.textContent = "SpDef";
                    break;

                    case "Speed":
                        box.classList.add("speed");
                        box.textContent = "Spd";
                    break;
                }

                div.appendChild(box);
            });

            return div;
        }
    }

    function CreateItemsAndIVCounter(div, IVs, itemSrc = ""){
        var itemBox;

        if (itemSrc != ""){
            itemBox = document.createElement("a");
            itemBox.classList.add("box");
            itemBox.classList.add("item");
            const img = document.createElement("img");
            img.src = itemSrc;

            itemBox.appendChild(img);

            div.appendChild(itemBox);
        }
        
        const IVCounter = document.createElement("a");
        IVCounter.classList.add("box");
        IVCounter.classList.add("ivs");
        var IVsCount = IVs.length,
            natureHandle = "";

        if(IVs.includes("Nature")){
            IVsCount -= 1;
            natureHandle = "N";
        } 
        
        IVCounter.textContent = `${IVsCount}x31${natureHandle}`;

        div.appendChild(IVCounter);

        return {"items": itemBox, "ivs": IVCounter};
    }

    const IVsToPass = document.getElementById("IVs").querySelectorAll("input");

    calculateButton.addEventListener("click", function(){
        if(IVsToPass.length == 0) return;

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

        const parent = new Node(IVs, "")

        RecursiveIVIsolation(parent);

        // Reference to the tree container
        const ul = document.createElement("ul");
        treeContainer.appendChild(ul);

        // Populate the tree
        const childrenCount = parent.Count();

        treeContainer.style.width = `${230 * childrenCount / 2}px`;
        PopulateTree(parent, document.getElementById("tree").querySelector("ul"));

        const pageSize = treeContainer.querySelector("li").offsetWidth + 150;

        treeContainer.style.width = `${pageSize}px`;
        header.style.width = `${pageSize + 500}px`;
    });

    function Clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function RecursiveIVIsolation(node, parent = null, depth = 1){
        IVs = node.value;

        if (IVs.length <= 1) return;

        var leftIVs = IVs.slice()
        var removedLeftIV = leftIVs.shift();
        var removedLeftName = GetItemSource(removedLeftIV);

        var rightIVs = IVs.slice()
        var removedRightIV = rightIVs.pop();
        var removedRightName = GetItemSource(removedRightIV)

        const leftNode = new Node(leftIVs, removedRightName);
        const rightNode = new Node(rightIVs, removedLeftName);
        
        node.children.push(leftNode)
        node.children.push(rightNode)

        depth += 1

        RecursiveIVIsolation(leftNode, parent, depth)
        RecursiveIVIsolation(rightNode, parent, depth)
    }

    function GetItemSource(IV){
        itemSrc = "stats/";

        switch(IV) {
            case "Nature":
                itemSrc += "everstone.png";
            break;

            case "HP":
                itemSrc += "weight.png";
            break;

            case "Attack":
                itemSrc += "power.png";
            break;

            case "Defense":
                itemSrc += "belt.png";
            break;

            case "Sp. Attack":
                itemSrc += "lens.png";
            break;

            case "Sp. Defense":
                itemSrc += "band.png";
            break;

            case "Speed":
                itemSrc += "anklet.png";
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
});