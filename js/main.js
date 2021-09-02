const bookContainer = document.getElementById('book-area');
const searchResult = document.getElementById('result');
const backgroundImage = document.getElementById('background');
// error section display none 
document.getElementById('error-message').style.display = 'none';

const loadData = () => {
    //spiner, result conatiner, background and result counter funtioning
    document.getElementById('spinner').classList.remove('d-none');
    bookContainer.textContent = '';
    searchResult.textContent = '';
    backgroundImage.classList.add('d-none');
    // hide error message
    document.getElementById('error-message').style.display = 'none';
    // fetching data from api
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    searchField.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
};

const displayData = dataObject => {
    const data = dataObject.docs;
    // when no data found 
    if (data.length === 0) {
        // hide spinner
        document.getElementById('spinner').classList.add('d-none');
        // show error 
        document.getElementById('error-message').style.display = 'block';
        // search result counter
        searchResult.innerText = `${dataObject.numFound}`;
    }
    else {
        data.forEach(book => {
            if (book.author_name !== undefined && book.publisher !== undefined) {
                const bookCover = book.cover_i;
                const bookCoverUrl = `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`;
                // hide spinner
                document.getElementById('spinner').classList.add('d-none');
                // hide error message
                document.getElementById('error-message').style.display = 'none';
                const singleBook = document.createElement('div');
                singleBook.classList.add('col')
                singleBook.innerHTML = `
                    <div class="card">
                        <img class="my-image card-img-top img-fluid " src="${bookCoverUrl}" alt="Not Found" onerror=this.src="./image/alternative.jpg">
                        <div class="card-body">
                            <h4 class="card-title">${book.title}</h4>
                            <p class="card-text">Author name- <span class="fw-bold">${book.author_name[0]} </span></p>
                            <p class="card-text">Publisher- <span class="fw-bold">${book.publisher[0]}</span></p>
                            <p class="card-text">First publish in ${book.first_publish_year}</span></p>
                            
                        </div>
                    </div>
                `;
                bookContainer.appendChild(singleBook);
                // search result counter
                searchResult.innerText = `${dataObject.numFound}`;
            };
        });
    }
};