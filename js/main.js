"use strict";

$(document).ready(function () {
    /**********************
    **********************
      BURGER BTN
    **********************
   **********************/
    $('.burger__btn').click(function () {
        $('.menu').toggleClass('active');
    })

    $('.close__btn').click(function () {
        $('.menu').removeClass('active');
    })

    /**********************
    **********************
      SLIDER
    **********************
   **********************/
    $('.news__slider').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true
    })


    /**********************
    **********************
        SLIDER
    **********************
    **********************/
    $('.releases__slider').slick({
        slidesToShow: 4,
        prevArrow: '.slider__arrow-left',
        nextArrow: '.slider__arrow-right',
        responsive: [
            {
                breakpoint: 1360,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }

            },
            {
                breakpoint: 570,
                settings: {
                    slidesToShow: 1
                }

            }
        ]
    });



    /**********************
    **********************
        ACCARDION
    **********************
    **********************/
    const accordionTitles = document.querySelectorAll(".accardion-btn");
    const accardionCloseBtns = document.querySelectorAll(".accardion-close");

    accordionTitles.forEach((accordionTitle) => {
        accordionTitle.addEventListener("click", () => {
            if (accordionTitle.classList.contains("accardion-active")) {
                accordionTitle.classList.remove("accardion-active");
            } else {
                const accordionTitlesWithIsOpen = document.querySelectorAll(".accardion-active");
                accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
                    accordionTitleWithIsOpen.classList.remove("accardion-active");
                });
                accordionTitle.classList.add("accardion-active");
            }
        });
    });

    accardionCloseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            accordionTitles.forEach((accardionBtn) => {
                accardionBtn.classList.remove('accardion-active');
            })
        })
    })

    /**********************
    **********************
            TABS
    **********************
    **********************/
    const tabs = document.querySelectorAll('.agenda__btn');
    const all_list = document.querySelectorAll('.agenda__list');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function () {
            tabs.forEach(tab => { tab.classList.remove('active') })
            tab.classList.add('active')

            all_list.forEach(list => { list.classList.remove('active') })
            all_list[index].classList.add('active')
        })
    })

    /**********************
    **********************
        MAIN VIDEO
    **********************
    **********************/

    $('.info__img').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    /**********************
    **********************
        ABOUT VIDEOS
    **********************
    **********************/

    $('.about__img').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });


    /**********************
    **********************
            ADMIN
   **********************
    **********************/

    let checkBox = document.querySelectorAll(".check_box");
    let btns = document.getElementById("dashboard__table-btn__cover");

    checkBox.forEach(checkbox => {
        checkbox.addEventListener('change', showButton);
    });

    function showButton() {
        const checkedCheckboxes = Array.from(checkBox).filter(checkbox => checkbox.checked);
        if (checkedCheckboxes.length > 0) {
            btns.classList.remove('hidden');
        } else {
            btns.classList.add('hidden');
        }
    }


    /**********************
     **********************
       FORM VALIDAITON AND LOGIC
     **********************
   **********************/
    const mainForm = document.getElementById('registration-form');

    if (mainForm) {
        const borderErrorValue = '1px solid red';

        /*****************
         *************
            SELECT ON CHANGE
          ************
        ****************/

        function selectChange() {
            const allElements = mainForm.querySelectorAll(".registration__form-item");
            const selectPosition = mainForm.querySelector('#position_select-0');
            const formInners = mainForm.querySelectorAll('.form-inner');
            const formInnerElement = mainForm.querySelectorAll('.form-inner .registration__form-item');

            const flightInfo = mainForm.querySelectorAll(".flight-info");
            const flightInfoTitle = mainForm.querySelectorAll(".flight-info-title");

            function changeTextName(element, text) {
                const textElement = mainForm.querySelector(`${element}`);

                textElement.textContent = text;
            }

            /************************ REMOVALS ************************/

            /* REMOVE MEDIA */
            function removeOnMedia(foreignMedia = false) {
                const elements = mainForm.querySelectorAll(".remove-on-media");
                const countryList = mainForm.querySelector("#members-country");

                if (foreignMedia) {
                    elements.forEach((item) => {
                        const elementDivs = item.parentNode.parentNode;

                        item.disabled = true;
                        elementDivs.style.display = "none";
                    })

                    countryList.disabled = false;
                    countryList.value = 171;
                    console.log(countryList)
                }
            }

            /* REMOVE FLIGHT INFORMATION */
            function removeFlightInfo() {
                isDatesDisabled(true);

                flightInfo.forEach((item) => {
                    const flightInfoDivs = item.parentNode.parentNode;

                    item.style.display = "none";
                    flightInfoDivs.style.display = "none";
                    item.disabled = true;
                })

                flightInfoTitle.forEach((item) => {
                    item.style.display = "none";
                })
            }

            removeFlightInfo();

            function removeAllElements() {
                const submitBtn = mainForm.querySelector(".registration__form-apply");

                allElements.forEach(item => {
                    const outerdiv = item.parentNode.parentNode;

                    outerdiv.style.display = "none";
                    item.disabled = true;
                })

                submitBtn.style.display = "none";
            }


            /************************ CREATIONS ************************/

            /* ADD FLIGHT INFORMATION */
            function addFlightInfo() {
                isDatesDisabled(false);

                flightInfo.forEach((item) => {
                    const flightInfoDivs = item.parentNode.parentNode;

                    item.style.display = "block";
                    flightInfoDivs.style.display = "block";
                    item.disabled = false;
                })

                flightInfoTitle.forEach((item) => {
                    item.style.display = "block";
                })
            }

            /* DISPLAY ALL THE ELEMENTS */
            function displayAllElements() {
                allElements.forEach(item => {
                    const outerdiv = item.parentNode.parentNode;

                    if (item.id === "title_option") {

                    } else {
                        outerdiv.style.display = "block";
                        item.disabled = false;
                    }
                })
            }

            /* TOGGLE THE INNER ELEMENTS */
            function innerElementsDisabledToggle(element, boolean) {
                element.forEach((item) => {
                    item.disabled = boolean;
                })
            }

            /* FUNCTION FOR TOGGLE THE ELEMENT */
            function toggleDisplay(value) {
                formInners.forEach((item) => {
                    if (value === 'active') {
                        item.classList.add(value);
                    }
                    if (value === 'remove') {
                        item.classList.remove('active');
                    }
                })
            }
            toggleDisplay('remove');

            /* FIRST SELECT  */
            selectPosition.addEventListener('change', () => {
                if (selectPosition.value === '') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);

                    changeTextName('#org-text', 'Organisation');

                    displayAllElements();
                    removeFlightInfo();
                }

                if (selectPosition.value === 'Attendee') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);
                    displayAllElements();

                    changeTextName('#org-text', 'Organisation');

                    removeFlightInfo();
                    addFlightInfo();
                }

                if (selectPosition.value === 'Speaker') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);
                    displayAllElements();

                    changeTextName('#org-text', 'Organisation');

                    removeFlightInfo();
                    addFlightInfo();
                }

                if (selectPosition.value === 'National media') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, false);
                    isDatesDisabled(false);
                    displayAllElements();
                    removeFlightInfo();
                    removeOnMedia(true);

                    changeTextName('#org-text', 'Media Name');

                    formInners[0].classList.add('active');
                    formInnerElement[0].disabled = false;
                    formInnerElement[1].disabled = true;
                }

                if (selectPosition.value === 'Foreign accredited media') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, false);
                    isDatesDisabled(true);
                    displayAllElements();

                    removeFlightInfo();
                    removeOnMedia(true);
                    addFlightInfo();

                    changeTextName('#org-text', 'Media Name');

                    formInners[1].classList.add('active');
                    formInnerElement[1].disabled = false;
                    formInnerElement[0].disabled = true;
                }

                if (selectPosition.value === 'Foreign unaccredited media') {
                    toggleDisplay('remove');
                    formInners[2].classList.add('active');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);

                    removeFlightInfo();
                    removeAllElements();
                }

                if (selectPosition.value === 'Organizer') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);

                    changeTextName('#org-text', 'Organisation');

                    displayAllElements();
                    removeFlightInfo();
                }

                if (selectPosition.value === 'Volunteer') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);

                    changeTextName('#org-text', 'Organisation');

                    displayAllElements();
                    removeFlightInfo();
                }

                if (selectPosition.value === 'Staff') {
                    toggleDisplay('remove');
                    innerElementsDisabledToggle(formInnerElement, true);
                    isDatesDisabled(true);

                    changeTextName('#org-text', 'Organisation');

                    displayAllElements();
                    removeFlightInfo();
                }
            })

            return null;
        }

        selectChange();

        function selectOnChange() {
            const selectTitle = mainForm.querySelector("#members-title-0");
            const titleOption = mainForm.querySelector("#title_option");

            titleOption.disabled = true;
            titleOption.parentNode.parentNode.style.display = "none";

            selectTitle.addEventListener("change", () => {
                if (selectTitle.value === "6") {
                    titleOption.disabled = false;
                    titleOption.parentNode.parentNode.style.display = "block";
                } else {
                    titleOption.disabled = true;
                    titleOption.parentNode.parentNode.style.display = "none";
                }
            })
        }
        selectOnChange()

        /*****************
        *************
           INPUT FILE SETTINGS
         ************
       ****************/
        const elementFile = mainForm.querySelectorAll('.form-file')

        /* display name when file uploaded */
        function fileNameChanging(element) {

            element.forEach((item) => {
                item.addEventListener('change', function () {
                    const file = item.files[0].name;

                    item.parentNode.lastChild.data = file;
                })
            })
        }

        function fileSizeLimit(element) {
            const maxSize = 2097152;

            element.forEach((item) => {
                item.addEventListener('change', () => {
                    const fileSize = item.files[0].size;

                    if (fileSize > maxSize) {
                        alert('The size of the image is above 2mb, please reduce the size');
                        item.value = '';
                        fileName = '';
                        item.parentNode.lastChild.data = '';

                    } else {
                        console.log('This is File is good to go');
                    }

                    console.log(fileSize);
                })
            })
        }


        fileNameChanging(elementFile);
        fileSizeLimit(elementFile);

        /*****************
         *************
            VALIDATION
          ************
        ****************/

        /*** CONDITION FUNCTION ***/
        function condtionForFormItems(item) {
            const emptyValue = '';
            if (item.value === emptyValue) {
                item.classList.add('error');
            } else {
                item.classList.remove('error');
            }

            return null;
        }

        /*** VALIDATE ALL THE ELEMENTS  ***/
        function validateElements(element) {
            if (element) {
                element.forEach((item) => {
                    condtionForFormItems(item);
                });
            }

            return null;
        }

        /*** VALIDATE THE INPUT DATE ELEMENTS ***/

        /* Function Disable Dates */
        function isDatesDisabled(status) {
            let formInners = mainForm.querySelectorAll('.flight-info');

            formInners.forEach((item) => {
                let dates = item.querySelectorAll('.calendar-picker > input');
                if (status) {
                    dates.forEach(date => date.disabled = status);
                }
                if (!status) {
                    dates.forEach(date => date.disabled = status);
                }
            })

        }

        /* Function (show || not show) the empty value */
        function validateDates() {
            const inputDataes = mainForm.querySelectorAll('.calendar-picker > input');
            inputDataes.forEach((item) => {
                if (!item.value) {
                    item.parentNode.classList.add('error');

                } else {
                    item.parentNode.classList.remove('error');
                    console.log(item.value)
                }
            })
        }

        function limitTheAge() {
            const inputDataes = mainForm.querySelectorAll('.date_of_birth > input');
            let date = new Date();
            let dd = date.getDate();
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();

            //Add a zero if one Digit (eg: 05,09)
            if (dd < 10) {
                dd = "0" + dd;
            }

            //Add a zero if one Digit (eg: 05,09)
            if (mm < 10) {
                mm = "0" + mm;
            }

            let minYear = yyyy - 8;
            let min = minYear + '-' + mm + '-' + dd;

            inputDataes.forEach((item) => {
                if (!item.disabled) {
                    item.setAttribute('min', min);
                    if (item.value > min) {
                        alert('Put the valid age');
                        item.parentNode.classList.add('error');
                    } else {
                        item.parentNode.classList.remove('error');
                    }
                }
            })
        }

        /*** VALIDATE THE RADIO BUTTONS  ***/
        const sessions = mainForm.querySelectorAll('.session');
        let isChecked = false;

        function validateRadioButtons() {
            sessions.forEach((item) => {
                if (item.checked) {
                    isChecked = true;
                }
            })

            if (!isChecked) {
                sessions.forEach((item) => {
                    item.parentNode.style.borderBottom = borderErrorValue;
                })
            } else {
                sessions.forEach((item) => {
                    item.parentNode.style.borderBottom = 'inherit';
                })
            }
        }

        /** INNER ITEMS VALIDATION **/
        function formInnersValidation() {
            let formInners = mainForm.querySelectorAll('.form-inner');

            formInners.forEach((item) => {
                let innerElements = item.querySelectorAll('.registration__form-item');

                if (item.classList.contains('active')) {
                    validateElements(innerElements);
                    validateDates();
                    let dates = item.querySelectorAll('.calendar-picker > input');
                    dates.forEach(date => date.disabled = false);
                }

                if (!item.classList.contains('active')) {
                    innerElements.forEach((element) => {
                        element.classList.remove('error');
                        element.disabled = true;
                    })
                    let dates = item.querySelectorAll('.calendar-picker > input');
                    dates.forEach(date => date.disabled = true);
                }
            })

        }

        /*****************
         *****************
            SUBMIT
          ****************
        ****************/
        const submitBtn = mainForm.querySelector('#registration-submit-btn');
        submitBtn.addEventListener('click', function () {

            const elements = mainForm.querySelectorAll('.registration__form-item');

            validateElements(elements);
            validateRadioButtons();

            validateDates();
            formInnersValidation();
            limitTheAge();
        });



        $('#registration-form').submit(function (event) {
            event.preventDefault();

            const formData = new FormData(this);
            const modal = document.getElementById('registration-modal');
            modal.classList.add('active');

            $.ajax({
                url: 'https://confadmin.uzatom.uz/api/data',
                type: 'POST',
                dataType: 'json',
                data: formData,
                processData: false,
                contentType: false,

                success: function (response) {
                    // Processing successful response
                    console.log(response); // Log the response for debugging

                    const modal_success = document.getElementById('registration-true');
                    const modal_close = document.getElementById('modal-close');
                    const modal = document.getElementById('registration-modal');
                    const loading = document.getElementById('loading');
                    const modal_false = document.getElementById('registration-false');

                    modal_false.style.display = 'none';
                    loading.style.display = 'none';

                    modal_success.style.display = 'block'
                    modal_close.addEventListener('click', function () {
                        modal.classList.remove('active');
                        window.location.reload();
                    })


                    let inputs = document.querySelectorAll('.registration__form-item');
                    let sessions = document.querySelectorAll('.session');

                    inputs.forEach(input => {
                        input.value = '';
                    });

                    sessions.forEach(session => {
                        session.checked = false;
                    })


                },
                error: function (xhr, status, error) {
                    // Processing error
                    console.log(error); // Log the error for debugging

                    loading.style.display = 'none';

                    const modal = document.getElementById('registration-modal');
                    const modal_false = document.getElementById('registration-false');
                    const modal_close = document.getElementById('modal-close-2');
                    const modal_success = document.getElementById('registration-true');

                    modal_success.style.display = "none";
                    modal_false.style.display = "block"
                    modal_close.addEventListener('click', function () {
                        modal.classList.remove('active');
                    })
                }
            });

            return false;
        });
    }

});