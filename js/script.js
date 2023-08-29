// All Data Loads
const loadAllData = async () => {
    // Spinner Showing for Loading the Data;
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()

        // See More Button Enable & Disable functionality;
        const seeMoreBtn = document.getElementById('seeMoreBtn');
        if (data.data.tools.length > 6) {
            seeMoreBtn.classList.remove('d-none')
            displayData(data.data.tools.slice(0, 6))
        }
    } catch (error) {
        console.log('Some Erros occurs:' + error);
    }
}

// Data pass to the Frontend;
const displayData = (data) => {

    // Main divContainer;
    const divContainer = document.getElementById('divContainer');
    divContainer.innerHTML = '';
    // fetching the each arrayList;
    data.forEach(singleElement => {

        // Destructuring the array;
        const { description, id, image, name, published_in, features, links } = singleElement;

        // Create a div for inserting element to the divContainer;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card p-4 rounded" style=" height: 33rem;">
                    <img src="${image ? image : 'image is coming soon'}" class="card-img-top rounded h-75" alt="..." >
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Features</h5>
                        <div>
                            <ol type="1" id="listItem">
                            <li>${features[0] ? features[0] : '<b>Coming Soon .....</b>'}</li>
                            <li>${features[1] ? features[1] : '<b>Coming Soon .....</b>'}</li>
                            <li>${features[2] ? features[2] : '<b>Coming Soon .....</b>'}</li>
                            </ol>
                        </div>
                        <hr>
                        <h5 class="fw-bold ">${name}</h5>
                        <div class="d-flex justify-content-between">
                            
                        <div>
                        
                        <i class="fa-regular fa-calendar-days publish-data"></i>&nbsp; 
                        ${published_in}
                        </div>

                            <div>
                            <button onclick="CardDetails('${id}')" class="  bg-transparent btn " data-bs-toggle="modal" data-bs-target="#exampleModal"><span><i class='fas fa-arrow-circle-right' style='font-size:32px;color:red'></i></span></button>
                            </div>

                        </div>
                            
                    
                        
                    </div>
                </div>
        `
        // Inserted to the divContainer
        divContainer.appendChild(div);

        // Spinner Stop after Loading the Data Successfullyl;
        isLoading(false);
    })
}

// See More button Functionality;
document.getElementById('seeMore').addEventListener('click', async function () {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const seeMoreButton = document.getElementById('seeMore');
    const noMoreToShowText = document.getElementById('noMoreInfo');

    try {
        seeMoreButton.disabled = true; // Disable the button

        const res = await fetch(url);
        const data = await res.json();

        // Display data using the displayData function
        displayData(data.data.tools);
        seeMoreButton.hidden = true;

        // Show "No more to show" text
        // const noMoreToShowText = document.createElement('p');
        noMoreToShowText.textContent = 'No more item to show';
        document.body.appendChild(noMoreToShowText);

    } catch (error) {
        console.log('An error occurred:', error);
    } 
});



// Details of a Card;
const CardDetails = (id) => {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => infoForModal(data.data))
}

// Showing the data to the Modal;
const infoForModal = (infoForModal) => {
    const { description, image_link, pricing,integrations, input_output_examples, features, accuracy } = infoForModal;
    document.getElementById('leftCardTitle').innerText = description;

    document.getElementById('right-div').innerHTML = `
         <img src="${image_link[0] ? image_link[0] : 'No image found'}" class="card-img-top rounded" alt="...">
         <div class="accuracy">
                    ${accuracy.score * 100 > 80 ? '<button class="btn btn-success">Accuracy: ' + accuracy.score * 100 + '%</button>' : '<button class="btn btn-danger">Accuracy Low</button>'
        }
                    
                </div>
            <div class="card-body">
                <h5 class="card-title text-center">${input_output_examples[0].input}</h5>
                <p class="card-text text-center">${input_output_examples[0].output}</p>
                
            </div>
    `;

    const priceInfo = document.getElementById('pricing');
    priceInfo.innerHTML = `
    <div class="col">
    <div class="card py-3 pricing-card ">
      <div class="card-body p-4  p-lg-1 text-center">
        <h5 class="card-title text-success">${pricing[0].price}</h5>
        <h5 class="card-title text-success">${pricing[0].plan}</h5>
      </div>
    </div>
  </div> 

  <div class="col">
  <div class="card py-3 pricing-card">
    <div class="card-body p-4  p-lg-1 text-center">
    <h5 class="card-title text-warning">${pricing[1].price}</h5>
    <h5 class="card-title text-warning">${pricing[1].plan}</h5>
    </div>
  </div>
</div> 

<div class="col">
<div class="card py-1 pricing-card">
  <div class="card-body p-4 p-lg-1 text-center">
    <h5 class="card-title text-danger">${pricing[2].price}</h5>
    <h5 class="card-title text-danger">${pricing[2].plan}</h5>
  </div>
</div>
</div> 
    `

    // Feature and Integration;
    const featureIntegration = document.getElementById('featureItegration');
    featureIntegration.innerHTML = `
    <div class="col">
    <div class="card pricing-card ">
      <div class="card-body p-1">
        <h2 class="card-title fw-bold">Feature</h2>
        <ul>
        <li>${features[1].feature_name} </li>
        <li>${features[2].feature_name} </li>
        <li>${features[3].feature_name} </li>
        </ul>
      </div>
    </div>
  </div> 

  <div class="col">
  <div class="card pricing-card ">
    <div class="card-body p-1">
    <h2 class="card-title fw-bold">Integration</h2>
        <ul>
        <li>${integrations[0] ? integrations[0] : '<b class="text-danger">coming soon</b>'} </li>
        <li>${integrations[1] ? integrations[1] : '<b class="text-danger">coming soon</b>'} </li>
        <li>${integrations[2] ? integrations[2] : '<b class="text-danger">coming soon</b>'} </li>
        </ul>
    </div>
  </div>
</div> 
    `
}

// Sort by Date;
document.getElementById('sortByDate').addEventListener('click', function () {
    const sortByDate = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        try {
            const res = await fetch(url)
            const data = await res.json()
            const mainData = data.data.tools;
            mainData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));

            // See More Button Enable & Disable functionality;
            const seeMoreBtn = document.getElementById('seeMoreBtn');
            if (mainData.length > 6) {
                seeMoreBtn.classList.remove('d-none')
                displayData(mainData)
            }
        } catch (error) {
            console.log('Error may ocuurs;' + error)
        }
    }
    sortByDate()
})

// Spinner Activity;
const isLoading = spinnerLoading => {
    const spinner = document.getElementById('loading-spinner');
    if (spinnerLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

// Call the loadAllData function;
loadAllData();