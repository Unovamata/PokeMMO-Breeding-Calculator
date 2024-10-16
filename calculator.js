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

    function logClickedElement(event) {
        console.log("Clicked element:", event.target);
        console.log("Clicked element ID:", event.target.id);
        console.log("Clicked element class(es):", event.target.className);
    }
    
    // Attach this to the document body or a parent element
    document.body.addEventListener("click", logClickedElement);
});