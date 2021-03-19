myLibary = [];
bookNum = 0;
theCardE = undefined;
const addBookCard = document.querySelector('#book-card');
const bookInfo = document.querySelector('#book-info');
// input variables selection
const inputFields = document.querySelectorAll('input[class="title"]');
addBookCard.addEventListener('addNewBook', addBookCard.onclick = getBookInfo);

function getBookInfo(){
    btnAdd = document.querySelector('button[id=submit]');
    btnCancel = document.querySelector('button[id=cancel]');
    
    //display the input field
    bookInfo.setAttribute('style', 'display:block;');

    //set the default input value
    inputFields.forEach(val => {
        // set the focus effect
        val.addEventListener('focus', val.onfocus = () => val.value = '');
        
        switch(val.name){
            case 'title':
                val.value = 'Book Name';
                break;
            case 'author':
                val.value = 'Book Author';
                break;
            case 'total page':
                val.value = "Book Pages";
                break;
            case 'page complete':
                val.value = 'Page you have read';
                break;
            default:
                "Unknown";
        }
    });

    //close the input field
    btnCancel.addEventListener('closeInputFields', btnCancel.onclick = () => bookInfo.setAttribute('style', 'display:none;'));

    // add the book to libary array
    btnAdd.addEventListener('addBook', btnAdd.onclick = () => addBook(inputFields));
}

//add the book info to libary function
function addBook(inputFields){

    //set the values
    inputFields.forEach(input => {
        if(input.value == ''){
            return alert('You have a missing  field!');
        }else{
        switch(input.name){
            case 'title':
                title = input.value;
                break;
            case 'author':
                author = input.value;
                break;
            case 'total page':
                if(!Number(input.value) && input.value != 0){
                    return alert('Page must be a number!');
                    
                }else{
                pages = input.value;
                }
                break;
            case 'page complete':
                if(!Number(input.value) && input.value != 0){
                    return alert('Page you have complete must be a number');
                }else{
                pagesCompleted = input.value;
                }
                break;
            default:
                'Unknown';               
        }
    }
    });

    // push the opject to libary array
    myLibary.push(new Book(title, author, pages, pagesCompleted));
    
    // close the add form
    bookInfo.setAttribute('style', 'display: none;');
    //make the book card
    createBookCard();
    localStorgelibary();
}

function createBookCard(){
    const container = document.querySelector('#container');
    // create the book card
    card = document.createElement('div');
    container.append(card);
    container.setAttribute('style', 'grid-template-columns: auto auto auto auto;');
    card.classList.toggle('mainBookCard');
    card.setAttribute('data-book', bookNum);


    // create the card info
    card.classList.toggle('bookCard');
    card.innerText = myLibary[bookNum].title + '\r\n by \r\n' + myLibary[bookNum].author;

    showBookInfo(card);
    bookNum += 1;
}
function showBookInfo(card){
   body = document.querySelector('body'); 
   bInfo = document.createElement('div');
   bInfoTitle = document.createElement('div');
   body.append(bInfo);
   bInfo.append(bInfoTitle);
   bInfo.classList.toggle('bInfo');
   bInfoTitle.classList.toggle('divTitle');
   bInfoTitle.innerText = 'BOOk INFORMATION';

   divInfoP = document.createElement('div');
   bInfo.append(divInfoP);
   divInfoP.classList.toggle('divInfo');
   for(i = 0; i < 4; i++){
       par = document.createElement('p');
       divInfoP.append(par);
       par.setAttribute('data-par', i);
   }

    // display the page
    card.addEventListener('displayInfo', card.onclick =(e)=> {
        bInfo.setAttribute('style', 'display:grid');
        theCardE = e.target.dataset['book'];

    //check the page complete status
    myLibary.forEach(bo => {
        if(bo.pages == bo.pagesCompleted){
            bo.pagesCompleted = 'Completed';
        }else{
            return;
        }
    });

   //set the value of the pargraphs
   parQ = document.querySelectorAll('.divInfo > p');
   parQ.forEach(p => {
    switch(p.dataset['par']){
        case '0':
            p.innerText = 'Title : ' + myLibary[theCardE].title;
            break;
        case '1':
            p.innerText = 'Author : ' + myLibary[theCardE].author;
            break;
        case '2':
            p.innerText = 'Pages : ' + myLibary[theCardE].pages;
            break;
        case '3':
            if(myLibary[theCardE].pagesCompleted == 'Completed'){
                p.setAttribute('style', 'color: green; text-shadow: 5px 5px 3px black;');
                }else{
                    p.setAttribute('style', 'color: #ff9800; text-shadow: 5px 5px 3px black;');
                }
                p.innerText = 'Your reading status : ' + myLibary[theCardE].pagesCompleted;
            break;
        default :
            'Unknown';
    }
   });

});
   
   //create the information page buttons
   btnDiv = document.createElement('div');
   bInfo.append(btnDiv);
   btnDiv.classList.toggle('btnDiv');
   editBtn = document.createElement('button');
   removeBtn = document.createElement('button');
  
   btnDiv.append(editBtn);
   btnDiv.append(removeBtn);
   editBtn.innerText = 'EDIT';
   removeBtn.innerText = 'Remove';
   editBtn.classList.toggle('addBtn');
   removeBtn.classList.toggle('cancelBtn');

   xClose = document.createElement('button');
   bInfoTitle.append(xClose);
   xClose.innerText = 'X';
   xClose.classList.toggle('closeBtn');


   //close the info page
   xClose.addEventListener('infoPageClose', xClose.onclick =()=> bInfo.setAttribute('style', 'display:none'));
   
   //The btnRemove
   removeBtn.addEventListener('rem', removeBtn.onclick =()=>{
    
    reCard = document.querySelector(`div[data-book="${theCardE}"]`);
    allCard = document.querySelectorAll(`div[data-book]`);
    bInfo.setAttribute('style', 'display: none');
    
    myLibary.splice(theCardE, 1);
    reCard.remove();
    allCard.forEach(card => {
        if(card.dataset['book'] > theCardE){
        card.dataset['book'] -= 1;
        }
});
    bookNum -= 1;
    
   });
   //edit button
   editBtn.addEventListener('edit', editBtn.onclick = (e) =>{
    const tBook = document.querySelector('#book-info > .title > p');
    tBook.innerText = myLibary[theCardE].title;
    bInfo.setAttribute('style', 'display:none');
    bookInfo.setAttribute('style', 'display: block');

    inputFields[0].value = myLibary[theCardE].title;
    inputFields[1].value = myLibary[theCardE].author;
    inputFields[2].value = myLibary[theCardE].pages;
    inputFields[3].value = myLibary[theCardE].pagesCompleted;
    
    
    btnCancel.addEventListener('caEdit', btnCancel.onclick =()=> bookInfo.setAttribute('style', 'display:none'));
     
    //The btnAdd win edit
    btnAdd.addEventListener('edBtn', btnAdd.onclick = (e) =>{
        inputFields.forEach(inp => {
            if(inp.value == ''){
                alert('You have a missing  field!');
                return;
            }else{
            switch(inp.name){
                case 'title':
                 myLibary[theCardE].title = inp.value;
                    break;
                case 'author':
                myLibary[theCardE].author = inp.value;
                    break;
                case 'total page':
                    if(!Number(inp.value)){
                        alert('page must be a number!');
                        return;
                    }else{
                    myLibary[theCardE].pages = inp.value;
                    }
                    break;
                case 'page complete':
                    if(!Number(inp.value)){
                        alert('Page completed must be a number!');
                        return;
                    }else{
                    myLibary[theCardE].pagesCompleted = inp.value;
                    }
                    break;
                default:
                    "Unknown";  
                }
        }
        });
        bookInfo.setAttribute('style', 'display: none');      
        card.innerText = myLibary[theCardE].title + '\r\n by \r\n' + myLibary[theCardE].author;
    });   
   });
}

//constractor function
function Book(title, author, pages, pagesCompleted){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesCompleted = pagesCompleted
}

