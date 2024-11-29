(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //this is the api url https://swiftpixel.com/earbud/api/materials"

  //functions
  function loadInfoBoxes() {

    // loading indicator here

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(reponse => reponse.json())
    .then(infoBoxes => {
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });

    })
    .catch(error => {
      console.error("Error fetching info boxes:", error);
      const errorContainer = document.querySelector("#info-boxes-container"); // 確保有正確的容器
      if (!errorContainer.querySelector(".error-message")) { // 避免重複錯誤消息
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent =
          "Sorry, we couldn't load the content. Please check your connection or reload the page.";
        errorContainer.appendChild(errorMessage);
      }
  });
    // error message goes in catch

  
  }
  loadInfoBoxes();

  function loadMaterialInfo(){

    const loader = document.querySelector("#loader"); // 選取 loader

    // 顯示 loader
    loader.classList.remove("hidden");

    // loading indicator here

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialListData => {
      materialListData.forEach(material => {
        // clone the template
        const clone = materialTemplate.content.cloneNode(true);
        
        // populate template
        const materialHeading = clone.querySelector(".material-heading");
        materialHeading.textContent = material.heading;
  
        const paragraphDescription = clone.querySelector(".material-description");
        paragraphDescription.textContent = material.description;
  
        materialList.appendChild(clone);

        loader.classList.add("hidden");
      } )

    })
    .catch(error => {
      console.error("Error fetching material info:", error);
      const errorContainer = document.querySelector("#material-list"); // 確保有正確的容器
      if (!errorContainer.querySelector(".error-message")) { // 避免重複錯誤消息
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent =
          "Sorry, we couldn't load the content. Please check your connection or reload the page.";
        errorContainer.appendChild(errorMessage);
      }
  })
    // error message goes in catch

    

  }

  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

