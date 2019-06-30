const template = `
    <div class="container">
        <form>
            <div class="input_wrapper">
                <input type="text" placeholder="bank" />
                <ul class="dropdown"></ul>
            </div>
            <div class="input_wrapper">
                <input type="text" placeholder="branch" />
            </div>
            
            <input type="submit" value="OK" />
        
        </form>
    </div>
`;

function BankInfoComponent() {

const component = document.createElement('div');
component.innerHTML = template; 

const bankInfoComponent = document.createElement('div'),
    form = document.createElement('form'),
    bankInput = document.createElement('input'),
    branchInput = document.createElement('input'),
    buttonSubmit = document.createElement('input'),
    bankInputWrapper = document.createElement('div'),
    branchInputWrapper = document.createElement('div'),
    bankDropdown = document.createElement('ul'),
    branchDropdown = document.createElement('ul');
    
    // mainScript = document.createElement('script');
    /**
     * set attributes & class names
     */
    //
    bankInputWrapper.setAttribute('class', 'input_wrapper');
    branchInputWrapper.setAttribute('class', 'input_wrapper');
    //
    bankInfoComponent.setAttribute('class', 'container');
    // form.setAttribute('method', 'get');
    form.setAttribute('class', 'form');
    
    //
    bankInput.setAttribute('class', 'input_bank');
    bankInput.setAttribute('type', 'text');
    bankInput.setAttribute('placeholder', 'bank');    
    //
    branchInput.setAttribute('class', 'input_branch');
    branchInput.setAttribute('type', 'text');
    branchInput.setAttribute('placeholder', 'branch');
    //
    bankDropdown.setAttribute('class', 'dropdown');
    branchDropdown.setAttribute('class', 'dropdown');
    //
    buttonSubmit.setAttribute('class', 'input_submit');
    buttonSubmit.setAttribute('type', 'submit');

    
    bankInput.addEventListener('input', (e) => {
        console.log('changed');
        console.log(e.target.value);
        
        fetch('http://localhost:3000/banks/13')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            json.map((item) => {
                const li = document.createElement('li');
                li.setAttribute('class', 'dropdown_item');
                li.innerHTML = item.Bank_Name;
                bankDropdown.appendChild(li)
            })
        })
    });

    branchInput.addEventListener('input', (e) => {
        console.log('changed');
    });

    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('clicked');    
    });

    bankInputWrapper.appendChild(bankInput);
    bankInputWrapper.appendChild(bankDropdown);

    branchInputWrapper.appendChild(branchInput);
    branchInputWrapper.appendChild(branchDropdown);

    form.appendChild(bankInputWrapper);
    form.appendChild(branchInputWrapper);
    form.appendChild(buttonSubmit);
    bankInfoComponent.appendChild(form);
    
    //todo need to change code in order for this to work properly
    // return bankInfoComponent;
    return component;
}   

document.body.appendChild(BankInfoComponent());

