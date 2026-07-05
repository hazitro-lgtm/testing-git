//essential global vars
const Library = [];
const bookshelf = document.getElementById("bookshelf");
const addbox = document.getElementById("addition-form");
const sidebarbtn = document.getElementById("sidebar");

//creating books
class Book{
    constructor(name, author, description, price){
        this.name = name;
        this.author = author;
        this.description = description;
        this.price = price;
        this.id = makeid(24);
        Library.push(this);
    }

    addToWebpage(){
        const bookcard = document.createElement("div");
        bookcard.className ='book-card';
        bookcard.id = this.id;
        bookcard.setAttribute("style", `background-color: rgb(${Math.random()*150}, ${Math.random()*150}, ${Math.random()*150})`);

        bookcard.innerHTML += 
        `<h2>${this.name}</h2>
        <h4>${this.author}</h4>
        <p>Unread</p>
        <p>${this.description}</p>
        <h4 class="book-price">${this.price}$</h4>`

        const rmBtn = document.createElement("button");
        const cStat = document.createElement("button");
        rmBtn.textContent = "Remove";
        cStat.textContent = "Read"; 
        rmBtn.addEventListener('click',  () => this.DeleteSelf());
        cStat.addEventListener('click', () => this.ChangeStatus());

        bookcard.appendChild(rmBtn);
        bookcard.appendChild(cStat);
        bookshelf.appendChild(bookcard);
    }

    DeleteSelf(){ 
        bookshelf.removeChild(document.getElementById(this.id)); 
    }

    ChangeStatus(){
        const book = document.getElementById(this.id);
        const status = book.querySelector('p');
        status.textContent = "Read";
    }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function loadBooks(){
    try{
        const response = await fetch('./books.json');
        const ExtBookSrc = await response.json();

        ExtBookSrc.map(bookdata => {
            const newBook = new Book(bookdata.name, bookdata.author, bookdata.description, bookdata.price);
            newBook.addToWebpage();
        })
    }
    catch(error){
        console.log("Something gone wrong: ", error);
    }
}

loadBooks();

//add book functional
function dynamicAdding(){
    const name = document.getElementById('book-name').value;
    const author = document.getElementById('book-author').value;
    const desc = document.getElementById('book-desc').value;
    const price = document.getElementById('book-price').value;
    const newbook = new Book(name, author, desc, price);
    newbook.addToWebpage();
}

function SideBar(){
    if(addbox.style.opacity == 0){
        addbox.style.opacity = 1;
        for(tag of addbox.children){
            tag.disabled = false;
        }
        sidebarbtn.textContent = "<"
    }
    else{
        addbox.style.opacity = 0;
        for(tag of addbox.children){
            tag.disabled = true;
        }
        sidebarbtn.textContent = ">"
    }
}

const addBtn = document.getElementById('add-book-btn');
addBtn.addEventListener('click', dynamicAdding);
sidebarbtn.addEventListener('click', SideBar);
