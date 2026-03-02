// Modal Login
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginBtn.onclick = () => loginModal.style.display = 'block';
closeBtn.onclick = () => loginModal.style.display = 'none';
window.onclick = (e) => { if(e.target==loginModal) loginModal.style.display='none'; }

loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    loginMessage.textContent = "Login Successful!";
    loginMessage.style.color="green";
    setTimeout(()=>loginModal.style.display='none',1000);
});

// Products Data
const products = [
    {id:1, name:"Product 1", price:25, image:"img/h (1).jpg"},
    {id:2, name:"Product 2", price:50, image:"img/h (2).jpg"},
    {id:3, name:"Product 3", price:75, image:"img/h (4).jpg"},
    {id:4, name:"Product 4", price:100, image:"img/h (5).jpg"},
    {id:5, name:"Product 5", price:125, image:"img/h (6).jpg"},
    {id:6, name:"Product 6", price:150, image:"img/h (7).jpg"},
    {id:7, name:"Product 7", price:175, image:"img/h (10).jpg"},
    {id:8, name:"Product 8", price:200, image:"img/images (1).jpg"},
    {id:9, name:"Product 9", price:225, image:"img/download (1).jpg"},
    {id:10, name:"Product 10", price:250, image:"img/download (2).jpg"},
    {id:11, name:"Product 11", price:275, image:"img/download.jpg"},
    {id:12, name:"Product 12", price:300, image:"img/images (2).jpg"},
    {id:13, name:"Product 13", price:325, image:"img/images (3).jpg"},
    {id:14, name:"Product 14", price:350, image:"img/images (4).jpg"},
    {id:15, name:"Product 15", price:375, image:"img/images (10).jpg"},
    {id:16, name:"Product 16", price:400, image:"img/images (11).jpg"},
    {id:17, name:"Product 17", price:425, image:"img/images (6).jpg"},
];

const productsContainer = document.getElementById('productsContainer');
function renderProducts(filter=''){
    productsContainer.innerHTML='';
    const filtered = products.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(product=>{
        const div=document.createElement('div');
        div.className='product-card';
        div.innerHTML=`
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(div);
    });
}
renderProducts();

// Search
document.getElementById('searchInput').addEventListener('input',e=>renderProducts(e.target.value));

// Cart
const cartPanel = document.getElementById('cartPanel');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');

function updateCartDisplay(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML='';
    cart.forEach((item,index)=>{
        const div=document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">X</button>
        `;
        cartItems.appendChild(div);
    });
    cartCount.textContent=cart.length;
}
function addToCart(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p=>p.id===id);
    cart.push(product);
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCartDisplay();
    cartPanel.style.display='block';
    hideSections(true);
}
function removeFromCart(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCartDisplay();
}

// Show/hide sections when cart opens
function hideSections(hide){
    document.getElementById('about').style.display = hide?'none':'block';
    document.getElementById('products').style.display = hide?'none':'block';
    document.getElementById('contact').style.display = hide?'none':'block';
}

// Cart panel buttons
cartBtn.onclick = () => { cartPanel.style.display='block'; hideSections(true); updateCartDisplay(); }
closeCart.onclick = ()=>{ cartPanel.style.display='none'; hideSections(false); }

// Contact Form
document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('contactName').value;
    const email=document.getElementById('contactEmail').value;
    const message=document.getElementById('contactMessage').value;
    if(name && email && message){ alert('Message sent successfully!'); e.target.reset();}
    else alert('Please fill all fields!');
});

// Initialize cart on page load
updateCartDisplay();


// Hero Image Slideshow for About Section
const heroImages = [
    "img/hero 1 (1).jpg",
    "img/hero 1 (2).jpg",
    "img/hero 1 (3).jpg"
];

let heroIndex = 0;
const heroSection = document.getElementById('heroSection');

// Function to change background image
// function changeHeroImage(index = heroIndex + 1){
//     heroIndex = index % heroImages.length;
//     heroSection.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
// }

// Initialize first image
changeHeroImage(heroIndex);

// Automatic slideshow every 3 sec
setInterval(() => changeHeroImage(heroIndex + 1), 3000);

// Arrow buttons
document.getElementById('prevHero').onclick = () => changeHeroImage(heroIndex - 1);
document.getElementById('nextHero').onclick = () => changeHeroImage(heroIndex + 1);

// Disable right click
heroSection.oncontextmenu = (e) => { e.preventDefault(); alert("Right click disabled on hero!"); }




