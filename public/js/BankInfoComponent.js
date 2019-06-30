

(function BankInfoComponent() {
    
    let currBankName = '';
    let currBankCode = '';
    let currBranchName = '';
    let currBranchCode = '';

    const template = `
        <form class="form">
            <div class="input_container">
                <input class="input_bank" type="text" placeholder="bank" />
                <ul class="dropdown_bank"></ul>
            </div>

            <div class="input_container">
                <input class="input_branch" type="text" placeholder="branch" />
                <ul class="dropdown_branch"></ul>                
            </div>
            
            <input class="submit" type="submit" value="GO" />
        </form>
        <div class="description"></div>
        <div class="map_container"></div>
    `;

    const component = document.createElement('div');
    component.setAttribute('class', 'container');
    component.innerHTML = template;
    document.body.appendChild(component);
    
    const bankInput = document.querySelector('.input_bank'),
        branchInput = document.querySelector('.input_branch'),
        bankDropdown = document.querySelector('.dropdown_bank'),
        branchDropdown = document.querySelector('.dropdown_branch'),
        buttonSubmit = document.querySelector('.submit');
    
    //event listeners
    bankInput.addEventListener('input', (e) => {
        const q = e.target.value;
        if (!q) {
            bankDropdown.innerHTML = '';
        } else {
            fetch(`http://localhost:3000/banks/${q}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                bankDropdown.innerHTML = '';
                json.map((item) => {
                    const li = document.createElement('li');
                    li.setAttribute('class', 'dropdown_item');
                    li.innerHTML = item[0];
                    li.setAttribute('data-key', item[1]);
                    bankDropdown.appendChild(li);
                    li.addEventListener('click', (e) => {
                        currBankName = e.target.innerText;
                        currBankCode = e.target.getAttribute('data-key');
                        console.log(currBankCode); 
                        getBranches(currBankName);
                    })
                })
            })
        }
    });

    function getBranches(bank) {
        fetch(`http://localhost:3000/banks/${bank}/branches/`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            branchDropdown.innerHTML = '';
            json.map((item) => {
                const li = document.createElement('li');
                li.setAttribute('class', 'dropdown_item');
                li.setAttribute('data-key', item.Branch_Code);
                li.innerHTML = item.Branch_Name;
                branchDropdown.appendChild(li);

                li.addEventListener('click', (e) => {
                    console.log('clicked');
                    currBranchName = e.target.innerText;
                });
            });

        });
    }
    
    branchInput.addEventListener('input', (e) => {
        // console.log('changed');
        
    });

    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currBankName || !currBranchName) {
            return;
        } else {
            console.log(`${currBankName} - ${currBranchName}`);
            
            fetch(`http://localhost:3000/banks/${currBankName}/branches/${currBranchName}`)
                .then((response) => response.json())
                .then((json) => console.log(json))
        }

    });

    return component;
}())

// google api key
// AIzaSyDU2P1i9yfPHwirbv_0ts7FDBAEd9HtgiU