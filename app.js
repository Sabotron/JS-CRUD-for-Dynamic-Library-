let counter = 0;

function consecutive() {
    let new_counter = JSON.parse(localStorage.getItem("consecutive"));
    if (!new_counter) {
        new_counter = 0;
    } else {
        counter = new_counter;
    }
    console.log("valor en counter: ", counter, "valor guardado: ", new_counter);
}

/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
function validate_book() {
    const name = document.getElementById("book_input").value;
    const author = document.getElementById("author_input").value;
    if (name.length >= 3 && author.length >= 3) {
        document.getElementById("btn_add").disabled = false;
    } else {
        document.getElementById("btn_add").disabled = true;
    }
}

/*-------------------------------------------------------------------------*/

function get_books() {
    const book = document.getElementById("book_input").value;
    const author = document.getElementById("author_input").value;
    counter = counter + 1;
    //console.log("Id: ", counter, " Nombre del libro: ", book, " Autor: ", author);
    let library_db = JSON.parse(localStorage.getItem("library"));
    if (!library_db) {
        library_db = [];
    }
    const new_book = {
        Id: counter, 
        Name: book, 
        Writer: author
    }
    library_db.push(new_book);
    localStorage.setItem("library", JSON.stringify(library_db));
    localStorage.setItem("consecutive", counter);
    set_book();
}

/*-------------------------------------------------------------------------*/

function set_book() {
    const id_list = document.getElementById("dynamic_ids");
    const book_list = document.getElementById("dynamic_books");
    const author_list = document.getElementById("dynamic_authors");
    const action_list = document.getElementById("dynamic_actions");
    id_list.innerHTML = "";
    book_list.innerHTML = "";
    author_list.innerHTML = "";
    const books = JSON.parse(localStorage.getItem("library"));
    console.log(books);
    if (books) {
        for (var i = 0; i < books.length; i++) {
            var id_li = document.createElement("li");
            var book_li = document.createElement("li");
            var author_li = document.createElement("li");
            var action_li = document.createElement("li");
            id_li.textContent = books[i].Id;
            book_li.textContent = books[i].Name;
            author_li.textContent = books[i].Writer;
            let id = books[i].Id;
            action_li.innerHTML = '<a onclick="edit(id)" class="edit_book">Edit</a> | ' + 
            '<a onclick="erase(id)" class="delete_book" ">Delete</a> ';
            id_list.appendChild(id_li);
            book_list.appendChild(book_li);
            author_list.appendChild(author_li);
            action_list.appendChild(action_li);
        }
    }
    consecutive();
}
/*-------------------------------------------------------------------------*/
function edit(id)
{
    console.log(id);
    console.log("Se armó esta vara", id);

}
/*-------------------------------------------------------------------------*/

function erase(id)
{
    console.log(id);
    console.log("Se prendió esta carajada" + id);

}
/*--
/*-------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------*/
