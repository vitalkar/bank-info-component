(function BankInfoComponent() {
    
    const descFields = [
        'Bank_Name',
        'Bank_Code',
        'Branch_Name',
        'Branch_Address',
        'Zip_Code',
        'Telephone',
        'Fax',
        'Free_Tel',
        'Handicap_Access',
        'day_closed'
    ];
    let currBankName = '';
    let currBranchName = '';
    
    const template = `
        <form class="form">
            <div class="input_container">
                <input class="input_bank" type="text" placeholder="type bank name" />
                <ul class="dropdown_bank"></ul>
            </div>
            <div class="input_container">
                <select class="select">
                     <option selected>select a branch</option>
                </select>
            </div>
            <input class="submit" type="submit" value="GO" />
        </form>
        <div class="description">
            <ul class="bank_info">
                <li class="bank_info_item">
                    <p class="bank_info_label">name:</p>
                    <p class="Bank_Name"></p>                                
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">code:</p>
                    <p class="Bank_Code"></p>                                
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">branch:</p>
                    <p class="Branch_Name"></p>
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">address:</p>
                    <p class="Branch_Address"></p>
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">zip code:</p>
                    <p class="Zip_Code"></p>
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">telephone:</p>
                    <p class="Telephone"></p>
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">fax:</p>
                    <p class="Fax"></p>
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">free tel.:</p>
                    <p class="Free_Tel"></p>                
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label">accessability:</p>
                    <p class="Handicap_Access"></p>                
                </li>
                <li class="bank_info_item">
                    <p class="bank_info_label"></p>                    
                    <p class="day_closed"></p>
                </li>
            </ul>
        </div>
        <div class="map_container">
            <div id="map"></div>
        </div>
    `;

    const component = document.createElement('div');
    component.setAttribute('class', 'container');
    component.innerHTML = template;
    document.body.insertBefore(component, document.getElementsByTagName('script')[0]);
    //
    const bankInput = document.querySelector('.input_bank'),
        bankDropdown = document.querySelector('.dropdown_bank'),
        select = document.querySelector('.select'),
        buttonSubmit = document.querySelector('.submit');
    //
    function getBranches(bank) {
        fetch(`http://localhost:3000/banks/${bank}/branches/`)
            .then((response) => response.json())
            .then((json) => {
                select.innerHTML = '<option selected>select a branch</option>';
                json.map((item) => {
                    const option = document.createElement('option');
                    option.setAttribute('class', 'select_item');
                    option.setAttribute('data-key', item.Branch_Code);
                    option.value = item.Branch_Name;
                    option.innerHTML = item.Branch_Name;
                    select.appendChild(option);
                });
            });
    }
    //set event listeners
    bankInput.addEventListener('input', (e) => {
        const q = e.target.value;
        if (!q) {
            bankDropdown.innerHTML = '';
        } else {
            fetch(`http://localhost:3000/banks/${q}`)
            .then((response) => response.json())
            .then((json) => {
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
                        getBranches(currBankName);
                        bankInput.value = currBankName;
                        bankDropdown.innerHTML = '';
                    })
                })
            })
        }
    });

    select.addEventListener('change', (e) => {
        currBranchName = e.target.value;
    });
    
    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currBankName || !currBranchName) {
            return;
        } else {            
            fetch(`http://localhost:3000/banks/${currBankName}/branches/${currBranchName}`)
                .then((response) => response.json())
                .then((data) => {
                    descFields.forEach((field) => {
                        const f = document.querySelector(`.${field}`);
                        f.innerHTML = data[`${field}`];
                    });
                    bankInput.value = '';
                    select.innerHTML = '<option selected>select a branch</option>';
                    const lat = parseFloat(data.X_Coordinate),
                        lng = parseFloat(data.Y_Coordinate);
                    initMap({ lat: lat, lng: lng });
                })
        }

    });
    return component;
}())

function initMap(loc) {
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: loc });
    var marker = new google.maps.Marker({ position: loc, map: map });
}