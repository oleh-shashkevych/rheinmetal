document.addEventListener('DOMContentLoaded', () => {

    const countryModal = document.querySelector('.modal-overlay:not(#registration-modal)');
    const openModalButtons = document.querySelectorAll('.js-open-modal');
    const closeCountryModalButton = countryModal.querySelector('.modal-close');
    const countryForm = countryModal.querySelector('.modal-form');
    const nextButton = countryModal.querySelector('.modal-button');

    const registrationModal = document.getElementById('registration-modal');
    const closeRegistrationModalButton = registrationModal.querySelector('.modal-close');

    const countryMap = {
        norway: 'no', uk: 'gb', ireland: 'ie', finland: 'fi',
        sweden: 'se', denmark: 'dk', iceland: 'is'
    };

    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
    });

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(countryModal);
        });
    });
    
    nextButton.addEventListener('click', () => {
        const selectedValue = countryForm.querySelector('input[name="country"]:checked').value;
        const countryCode = countryMap[selectedValue];
        
        if (countryCode) {
            phoneInput.setCountry(countryCode);
        }
        
        closeModal(countryModal);
        openModal(registrationModal);
    });

    closeCountryModalButton.addEventListener('click', () => closeModal(countryModal));
    countryModal.addEventListener('click', (event) => {
        if (event.target === countryModal) closeModal(countryModal);
    });

    closeRegistrationModalButton.addEventListener('click', () => closeModal(registrationModal));
    registrationModal.addEventListener('click', (event) => {
        if (event.target === registrationModal) closeModal(registrationModal);
    });

});