const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const galleryItems = document.querySelectorAll(".gallery-item");
const cartModal = document.getElementById("cartModal");
const cartCloseButton = document.querySelector(".cart-close-button");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const welcomeModal = document.getElementById("welcomeModal");
const welcomeCloseButton = document.querySelector(".welcome-close-button");
const welcomeContinueButton = document.querySelector(".welcome-continue-button");

let currentImageIndex = 0;
let cart = [];
const galleryImages = [
    { src: 'Gemini_Generated_Image_j6gp0fj6gp0fj6gp.png', alt: 'Aristocrat', caption: 'Aristocrat' },
    { src: 'unnamed.jpg', alt: 'Cotton Candy', caption: 'Cotton Candy' },
    { src: 'Gemini_Generated_Image_amvtz6amvtz6amvt.png', alt: 'Night Queen', caption: 'Night Queen' },
    { src: 'Gemini_Generated_Image_7s0kau7s0kau7s0k.png', alt: 'Fanatic', caption: 'Fanatic' }
];

galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentImageIndex = index;
        openImageModal(index);
    });
});

function openImageModal(index) {
    imageModal.style.display = "flex";
    modalImage.src = galleryImages[index].src;
    modalImage.alt = galleryImages[index].alt;
    modalCaption.innerHTML = galleryImages[index].caption;
    currentImageIndex = index;
}
document.querySelector("#imageModal .close-button").addEventListener("click", () => {
    imageModal.style.display = "none";
});
imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = "none";
    }
});

function changeModalImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    openImageModal(currentImageIndex);
}
window.changeModalImage = changeModalImage;
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #aaa;">Sepetinizde ürün bulunmamaktadır.</p>';
        cartTotalElement.textContent = '0.00 TL';
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        const itemTotal = item.price * 1;
        total += itemTotal;
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">Beden: ${item.size}</div>
            </div>
            <div class="item-price">${itemTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 })}</div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotalElement.textContent = total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 });
}

function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseFloat(productCard.getAttribute('data-price'));
    const sizeSelect = productCard.querySelector('.size-select');
    const selectedSize = sizeSelect.value;
    
    if (!selectedSize) {
        alert('Lütfen bir beden seçin.');
        return;
    }
    const item = {
        name: productName,
        price: productPrice,
        size: selectedSize
    };
    
    cart.push(item);
    updateCartCount();
    event.target.textContent = 'Eklendi!';
    setTimeout(() => {
        event.target.textContent = 'Sepete Ekle';
    }, 1500);

    console.log('Sepet İçeriği Güncellendi:', cart);
}
function openCartModal() {
    renderCart();
    cartModal.style.display = "flex";
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
document.querySelector('.cart-icon').addEventListener('click', openCartModal);
cartCloseButton.addEventListener('click', () => {
    cartModal.style.display = "none";
});
cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});

function handleSignup(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    
    if (emailInput.value) {
        welcomeModal.style.display = "flex";
        emailInput.value = '';
    }
}
window.handleSignup = handleSignup;
welcomeCloseButton.addEventListener('click', () => {
    welcomeModal.style.display = "none";
});
welcomeContinueButton.addEventListener('click', () => {
    welcomeModal.style.display = "none";
});
welcomeModal.addEventListener("click", (e) => {
    if (e.target === welcomeModal) {
        welcomeModal.style.display = "none";
    }
});

const aboutContent = document.querySelector('.about-content');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};
const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    itemObserver.observe(aboutContent);
    document.querySelectorAll('.gallery-item, .product-card').forEach(item => itemObserver.observe(item));
});