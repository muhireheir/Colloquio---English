// get all form labels
var labels = document.getElementsByTagName('label');
var arr = Array.from(labels);
var form = document.forms['contactForm'];
var phoneEl=form['phone'];
arr.map(element => {
    var name = element.getAttribute('for');
    var inputField = document.getElementsByName(name);
    var el = inputField[0];
    el.setAttribute('placeholder', name);
    el.addEventListener('focusin', inputFocused);
    // unfocus 
    el.addEventListener('focusout', inputFocusedOut);
});
function inputFocused(e) {
    var label = e.target.previousElementSibling;
    label.style.visibility = 'visible';
    label.style.lineHeight = '3';
}

function inputFocusedOut(e) {
    var label = e.target.previousElementSibling;
    label.style.visibility = 'hidden';
    label.style.lineHeight = '7';
}

function isPhoneValid(value) {
    var regex = /^\d+$/;
    return regex.test(value);
}

function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function fieldError(el){
    el.style.borderBottom = '1px solid #e40f0f';
    el.style.color = '#e40f0f';
    el.setAttribute('placeholder', el.getAttribute('error'));
    el.classList.add('error');
}

function fieldSucess(el){
    el.classList.add('error');
    el.style.borderBottom = '1px solid #000';
    el.style.color = '#000';
}
phoneEl.addEventListener('input',function(e){
    var el = e.target;
    if (!isPhoneValid(el.value) || (el.value.length > 10 || el.value.length < 8)) {
        fieldError(el);
    } else {
        fieldSucess(el);
    }
    })

function submitForm(e) {
    e.preventDefault();
    Array.from(form).forEach(el => {
        var fieldName = el.getAttribute('name');
        if (fieldName) {
            if (fieldName == 'phone') {
                if (!isPhoneValid(el.value) || (el.value.length > 10 || el.value.length < 8)) {
                    fieldError(el);
                } else {
                    fieldSucess(el);
                }
            } else if (fieldName == 'email') {
                if (isValidEmail(el.value)) {
                    fieldSucess(el);
                } else {
                    fieldError(el);
                }
            } else if (el.value == "" || el.value.length < 1) {
                fieldError(el);
            } else {
                fieldSucess(el);
            }
        }
    })
}
form.addEventListener('submit', submitForm)