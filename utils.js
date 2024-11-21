class Breeders {
    constructor(costs={}){
        this.costs = costs;
    }
}

class Node {
    constructor(value, item, gender = "any"){
        this.value = value;
        this.children = [];
        this.item = item;
        this.gender = gender;
    }

    Count(){
        var count = 1;

        this.children.forEach(function(child){
            count += child.Count()
        });

        return count
    }

    Graph(li = undefined){
        const div = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("branch-check")

        checkbox.addEventListener("change", function(){
            const childrenLis = div.parentElement.querySelectorAll("li");

            const isChecked = checkbox.checked;

            if(isChecked){
                li.classList.add('grayscale-filter');

                UpdateInputFields(true);
            } else {
                li.classList.remove('grayscale-filter');

                UpdateInputFields(false);
            }

            function UpdateInputFields(isDisabled=false){
                childrenLis.forEach(function(li){
                    li.classList.remove('grayscale-filter');
                    
                    const input = li.querySelector("input");

                    console.log(input);

                    input.checked = false;
                    input.disabled = isDisabled;
                });
            }
        });

        div.appendChild(checkbox);

        const IVs = this.value;

        CreateItemsAndIVCounter(div, this.gender, IVs, this.item);

        function CreateItemsAndIVCounter(div, gender, IVs, itemSrc = ""){
            var itemBox;
            
            if(gender == "female"){
                var genderBox = document.createElement("a");
                genderBox.classList.add("box");
                genderBox.classList.add("gender");
                const img = document.createElement("img");
                img.src = "stats/female.png";
    
                genderBox.appendChild(img);
    
                div.appendChild(genderBox);
            }

            if (itemSrc != ""){
                var itemBox = document.createElement("a");
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
        }

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

function Clamp(value, min, max = Infinity) {
    return Math.max(min, Math.min(value, max));
}

function PxToVw(pxValue) {
    // Get the current viewport width in pixels
    var viewportWidth = window.outerWidth;
    
    // Convert the px value to vw
    const vwValue = (pxValue / viewportWidth) * 100;
    
    return vwValue;
}