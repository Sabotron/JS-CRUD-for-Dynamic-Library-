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
    action_list.innerHTML = "";
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
            action_li.innerHTML = '<a onclick="edit(' + id + ')" >Edit</a>' + '  |  ' +
                '<a onclick="erase(' + id + ')" >Delete</a>';
            id_list.appendChild(id_li);
            book_list.appendChild(book_li);
            author_list.appendChild(author_li);
            action_list.appendChild(action_li);
        }
    }
    consecutive();
    get_authors();
}
/*-------------------------------------------------------------------------*/

function get_authors() {
    const select = document.getElementById("author_list");
    select.innerHTML = "";
    const books = JSON.parse(localStorage.getItem("library"));
    if (books) {
        for (var i = 0; i < books.length; i++) {
            var option = document.createElement("option");
            option.textContent = books[i].Writer;
            select.appendChild(option);
        }
    }
}
/*-------------------------------------------------------------------------*/
function set_author() {
    var select_list = document.getElementById("author_list");
    var author_name = select_list.options[select_list.selectedIndex].text;
    var author = document.getElementById("author_input");
    author.value = author_name;
    console.log(author_name);
}
/*-------------------------------------------------------------------------*/

function edit(id) {
    let library_db = JSON.parse(localStorage.getItem("library"));
    var book_id = document.getElementById("book_id");
    var name = document.getElementById("book_mod");
    var author = document.getElementById("author_mod");
    var btn = document.getElementById("btn_edit");
    name.value = "";
    author.value = "";
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id == id) {
            book_id.value = id;
            name.value = library_db[i].Name;
            author.value = library_db[i].Writer;
            btn.disabled = false;
            break;
        } else {
            btn.disabled = true;
        }
    }
}
/*-------------------------------------------------------------------------*/

function edit_book() {
    let library_db = JSON.parse(localStorage.getItem("library"));
    var book_id = document.getElementById("book_id").value;
    var name = document.getElementById("book_mod").value;
    var author = document.getElementById("author_mod").value;
    var btn = document.getElementById("btn_edit");
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id == book_id) {
            library_db[i].Name = name;
            library_db[i].Writer = author;
            btn.disabled = true;
            break;
        }
    }
    localStorage.setItem("library", JSON.stringify(library_db));
    set_book();
}

/*-------------------------------------------------------------------------*/
function erase(id)
{
    let library_db = JSON.parse(localStorage.getItem("library"));
    const library_mod = [];
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id != id) {
            library_mod.push(library_db[i]);
        } 
    }
    localStorage.setItem("library", JSON.stringify(library_mod));
    set_book();
}
/*-------------------------------------------------------------------------*/
