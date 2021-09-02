const bookContainer = document.getElementById('book-area');
const searchResult = document.getElementById('result');
// error section display none 
document.getElementById('error-message').style.display = 'none';

const loadData = () => {
    //spiner show 
    document.getElementById('spinner').classList.remove('d-none');
    // book conatiner cleaning
    bookContainer.textContent = '';
    // search result counter cleaning
    searchResult.textContent = '';
    // hide error message
    document.getElementById('error-message').style.display = 'none';
    // fetching data from api
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    searchField.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs))
};

const displayData = data => {
    if (data.length === 0) {
        // hide spinner
        document.getElementById('spinner').classList.add('d-none');
        // show error 
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        data.forEach(book => {
            // console.log(book)
            // console.log(book.title)
            if (book.author_name !== undefined) {
                const authorName = book.author_name;
                const bookCover = book.cover_i;
                const bookCoverUrl = `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`;
                // hide spinner
                document.getElementById('spinner').classList.add('d-none');
                // hide error message
                document.getElementById('error-message').style.display = 'none';
                const singleBook = document.createElement('div');
                singleBook.innerHTML = `
                <div class="col">
                    <div class="card">
                        <img class="avatar card-img-top img-fluid" src="${bookCoverUrl}" alt="Not Found" onerror=this.src="./image/alternative.jpg">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Written by- <span class="fw-bold">${authorName[0]} </span></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">first publish in ${book.first_publish_year}</small>
                        </div>
                    </div>
                </div>
                `;
                bookContainer.appendChild(singleBook);

                // search result counter
                searchResult.innerText = `${data.length}`
            };
        });
    }
};