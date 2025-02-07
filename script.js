let dropDownElements = document.querySelectorAll('.dropdown-section');

// Collapse all other dropdowns
const previousDropdownCollapse = (activeDropDownElem) => {
    dropDownElements.forEach((elem) => {
        if (elem !== activeDropDownElem) {
            elem.classList.remove('nav-active');
            elem.setAttribute('aria-expanded', 'false');
        }
    });
};

// Add event listeners to each dropdown
dropDownElements.forEach((dropDownElem) => {
    // Optional: Add aria-expanded attribute for accessibility
    dropDownElem.setAttribute('aria-expanded', 'false');

    // Generic toggle function for click and keyboard events
    const toggleDropdown = (event) => {
        previousDropdownCollapse(dropDownElem);
        dropDownElem.classList.toggle('nav-active');
        const isActive = dropDownElem.classList.contains('nav-active');
        dropDownElem.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        if (event) event.preventDefault(); // Prevents scrolling when pressing Space
    };

    // Keyboard event listener for Space and Enter keys
    dropDownElem.addEventListener('keydown', (event) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            toggleDropdown(event);
        }
    });

    // Click event listener
    dropDownElem.addEventListener('click', toggleDropdown);
});



//slider carousel code start
let count = 0;
let carouselContents = document.querySelectorAll('.carousel-content .content');
let carouselImages = document.querySelectorAll('.carousel-image');
let dots = document.querySelectorAll('.three-dots span');
let changeImageInterval;
let isPlaying = true;  // To track whether the carousel is playing or paused

// Function to change image based on current count
function changeImage() {
    carouselContents.forEach((content) => content.classList.remove('active'));
    carouselImages.forEach((img) => img.classList.remove('active'));
    dots.forEach((dot) => {
        dot.classList.remove('active')
        dot.setAttribute('aria-selected', false)
    });

    carouselContents[count].classList.add('active');
    carouselImages[count].classList.add('active');
    dots[count].classList.add('active');
    dots[count].setAttribute('aria-selected', true)
}

// Function to start the carousel interval
function startInterval() {
    return setInterval(() => {
        count = (count + 1) % carouselImages.length;
        changeImage();
    }, 3000);
}

changeImageInterval = startInterval();

// Function to stop the interval and update the image
function handleImageChange(newCount) {
    clearInterval(changeImageInterval);  // Stop the interval
    count = newCount; // Set count to the new image index
    changeImage(); // Update the image and dot
    changeImageInterval = startInterval(); // Restart the interval
}

// Previous button functionality
document.querySelector('.previousBtn').addEventListener('click', function () {
    handleImageChange((count - 1 + carouselImages.length) % carouselImages.length);
});

// Next button functionality
document.querySelector('.nextBtn').addEventListener('click', function () {
    handleImageChange((count + 1) % carouselImages.length);
});

// Pause/Play button functionality
document.querySelector('.pauseBtn').addEventListener('click', function () {
    if (isPlaying) {
        clearInterval(changeImageInterval); // Stop the interval
        this.setAttribute('aria-label', "play slide show");
        this.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i>'; // Change to play icon
    } else {
        changeImageInterval = startInterval(); // Restart the interval
        this.setAttribute('aria-label', "pause slide show");
        this.innerHTML = '<i class="fa-solid fa-pause" aria-hidden="true"></i>'; // Change to pause icon
    }
    isPlaying = !isPlaying;  // Toggle the state
});

// Dot click functionality: Synchronize dot with image
dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        handleImageChange(index); // Set the count based on clicked dot
    });

    dot.addEventListener('keydown', function (event) {
        console.log(event.key)
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleImageChange(index); // Set the count based on focused dot
        } else if (event.key === 'ArrowRight') {
            clearInterval(changeImageInterval); // Stop interval
            if (index < dots.length - 1) {
                dots[index + 1].focus(); // Move focus to next dot
            } else {
                dots[0].focus(); // Wrap focus to the first dot if at the last dot
            }
        } else if (event.key === 'ArrowLeft') {
            clearInterval(changeImageInterval); // Stop interval
            if (index > 0) {
                dots[index - 1].focus(); // Move focus to previous dot
            } else {
                dots[dots.length - 1].focus(); // Wrap focus to the last dot if at the first dot
            }
        }
    });
});
//slider carousel code end



//Product slider carousel code start
let count1 = 0;
let carouselImages1 = document.querySelectorAll('.opc .carousel-inner-product');

// Function to change image based on current count
function changeImage1() {
    carouselImages1.forEach((img) => img.classList.remove('active'));

    carouselImages1[count1].classList.add('active');
}





// Function to stop the interval and update the image
function handleImageChange1(newCount1) {
    console.log("newcount", newCount1)
    count1 = newCount1; // Set count to the new image index
    changeImage1(); // Update the image and dot

}



// Previous button functionality
document.querySelector('.previousBtn.previousBtn1').addEventListener('click', function () {
    console.log(this)
    handleImageChange1((count1 - 1 + carouselImages1.length) % carouselImages1.length);
});

// Next button functionality
document.querySelector('.nextBtn.nextBtn1').addEventListener('click', function () {
    console.log(this)
    handleImageChange1((count1 + 1) % carouselImages1.length);
});




//slider carousel code end



let count2;
//quantity increment decrement code start

function announceQuantityChange() {
    let quantityInput = document.getElementById("quantity");
    let quantityAnnouncement = document.getElementById("quantity-announcement");

    // Update the live region with the current quantity
    quantityAnnouncement.textContent = `Quantity is now ${quantityInput.value}`;
}

let increments = document.querySelectorAll('.quantity .increment');
let decrements = document.querySelectorAll('.quantity .decrement');
increments.forEach((increment) => {
    increment.addEventListener('click', function () {
        count2 = this.previousElementSibling.value;
        count2++;
        this.previousElementSibling.value = count2;
        announceQuantityChange()
    });

    increment.addEventListener('keydown', function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            count2 = this.previousElementSibling.value;
            count2++;
            this.previousElementSibling.value = count2;
            announceQuantityChange()
        }
    });
})

decrements.forEach((decrement) => {

    decrement.addEventListener('click', function () {
        if (count2 <= 1) {
            this.nextElementSibling.value = 1;
        } else {
            count2 = this.nextElementSibling.value;
            count2--;
            this.nextElementSibling.value = count2;
            announceQuantityChange()
        }
    });

    decrement.addEventListener('keydown', function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (count2 <= 1) {
                this.nextElementSibling.value = 1;
            } else {
                count2 = this.nextElementSibling.value;
                count2--;
                this.nextElementSibling.value = count2;
                announceQuantityChange()

            }

        }
    });
})




//Product slider carousel code start
let count3 = 0;
let carouselImages2 = document.querySelectorAll('.blog-container .carousel-inner-product');

// Function to change image based on current count
function changeImage2() {
    carouselImages2.forEach((img) => img.classList.remove('active'));

    carouselImages2[count3].classList.add('active');
}





// Function to stop the interval and update the image
function handleImageChange2(newCount3) {
    console.log("newcount", newCount3)
    count3 = newCount3; // Set count to the new image index
    changeImage2(); // Update the image and dot

}



// Previous button functionality
document.querySelector('.previousBtn.previousBtn2').addEventListener('click', function () {
    console.log(this)
    handleImageChange2((count3 - 1 + carouselImages2.length) % carouselImages2.length);
});

// Next button functionality
document.querySelector('.nextBtn.nextBtn2').addEventListener('click', function () {
    console.log(this)
    handleImageChange2((count3 + 1) % carouselImages2.length);
});




//        slider carousel code end


//Lazy loading attribute added
let images = document.querySelectorAll('img')
images.forEach((img) => {
    img.setAttribute('loading', 'lazy')
});

let iframes = document.querySelectorAll('iframe')
iframes.forEach((iframe) => {
    iframe.setAttribute('loading', 'lazy')
});

// Function to handle keydown events
function handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Toggle the slide when Enter or Space is pressed
        this.classList.toggle('active');

        // Get the Know More button
        let knowMoreBtn = this.querySelector('.elementor-button');

        // Check if the card has the active class (i.e., slide is visible)
        if (this.classList.contains('active')) {
            knowMoreBtn.setAttribute('tabindex', 0);  // Make button tabbable
        } else {
            knowMoreBtn.setAttribute('tabindex', -1); // Make button non-tabbable
        }

        console.log(knowMoreBtn); // Debugging
    }

    // Allow Tab navigation to work (Tab key is for normal navigation)
    else if (event.key === 'Tab') {
        // event.stopPropagation(); // Prevent this from interfering with the Tab key
    }
}

// Add event listeners to the cards
let OBCcard1 = document.querySelector('.our-brands-container .cards-section .card1');
let OBCcard2 = document.querySelector('.our-brands-container .cards-section .card2');

OBCcard1.addEventListener('keydown', handleCardKeydown);
OBCcard2.addEventListener('keydown', handleCardKeydown);



//update values with JS

function productContentAddtocartButtonAccessible() {
    let products = document.querySelectorAll('.opc .carousel-inner-product > div');
    products.forEach((product) => {
        let heading = product.querySelector('.content h3');
        let addToCartBtn = product.querySelector('.quantity-wrapper button');
        // console.log(heading);
        // console.log(addToCartBtn)
        addToCartBtn.setAttribute('aria-label', heading.innerText + ' Add to cart');
    })
}
productContentAddtocartButtonAccessible();

function blogContentCategoryLinkAccessible() {
    let blogCardCategories = document.querySelectorAll('.blog-container .title a');
    blogCardCategories.forEach((categoryLink) => {
        categoryLink.setAttribute('aria-label', categoryLink.innerText + ' category')
    })
}
blogContentCategoryLinkAccessible();

function blogContentReadmoreLinkAccessible() {
    let blogCardContents = document.querySelectorAll('.blog-container .content');
    blogCardContents.forEach((blogContent) => {
        let heading = blogContent.querySelector('h3');
        let readMorelink = blogContent.querySelector('.sub-content a');
        readMorelink.setAttribute('aria-label', 'Read more about ' + heading.innerText)
    })
}
blogContentReadmoreLinkAccessible();