function BankInfoComponent() {


const container = document.createElement('div'),
    form = document.createElement('form'),
    bankInput = document.createElement('input'),
    branchInput = document.createElement('input'),
    buttonSubmit = document.createElement('input');
    // mainScript = document.createElement('script');
    /**
     * set attributes & class names
     */

    //
    container.setAttribute('class', 'container');
    // form.setAttribute('method', 'get');
    form.setAttribute('class', 'form');
    
    //
    bankInput.setAttribute('class', 'input_bank');
    bankInput.setAttribute('type', 'text');
    //
    branchInput.setAttribute('class', 'input_branch');
    branchInput.setAttribute('type', 'text');
    console.log(bankInput)
    //
    buttonSubmit.setAttribute('class', 'input_submit');
    buttonSubmit.setAttribute('type', 'submit');
    
    //
    // mainScript.setAttribute('src', './main.js');
    
    //add styles
    //append nodes

    bankInput.addEventListener('input', (e) => {
        console.log('changed');
        console.log(e.target.value);
        
        // fetch('http://localhost:3000/banks/13')
        // .then((response) => {
        //     console.log(response);
        //     return response.json();
        // })
        // .then((json) => {
        //     console.log(json)
        // })
    });

    branchInput.addEventListener('input', (e) => {
        console.log('changed');
    });

    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('clicked');
        
    });

    form.appendChild(bankInput);
    form.appendChild(branchInput);
    form.appendChild(buttonSubmit);
    container.appendChild(form);
    document.body.appendChild(container);
    // document.body.appendChild(mainScript)

    //todo need to change code in order for this to work properly
}   


