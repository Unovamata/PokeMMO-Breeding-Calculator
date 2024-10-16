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
          treeContainer = document.getElementById("tree");

    class Node {
        constructor(value, children, item){
            this.value = value;
            this.children = children;
            this.item = item;
        }

        GraphParent(){
            const div = document.createElement("div");
            const IVs = this.value;

            const itemsAndIVs = CreateItemsAndIVCounter(div, IVs);

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
                    
                    default:
                        console.log(IV)
                    break;
                }

                div.appendChild(box);
            });

            const li = treeContainer.querySelector("li");
            li.appendChild(div);
        }
    }

    function CreateItemsAndIVCounter(div, IVs, itemSrc = ""){
        var itemBox;

        if (itemSrc != ""){
            itemBox = document.createElement("a");
            itemBox.classList.add("box");
            itemBox.classList.add("item");
            const img = document.createElement("img");

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
        treeContainer.innerHTML = "";

        const IVs = []

        IVsToPass.forEach(function(element){
            if (element.checked) {
                data = element.dataset.label;

                IVs.push(data);
            }
        });

        const parent = new Node(IVs, [], "")

        const ul = document.createElement("ul"),
              li = document.createElement("li");

        ul.appendChild(li);
        treeContainer.appendChild(ul);

        parent.GraphParent();
    });
});