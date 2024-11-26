var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var validationModal = document.getElementById("validationModal");
var bookmarkList = [];
if (localStorage.getItem("bookmarks") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

function addBookmark() {
  /*   if i want the user to add the url without having to add http protocol
  if (
    !siteURL.value.startsWith("http://") &&
    !siteURL.value.startsWith("https://")
  ) {
    siteURL.value = "http://" + siteURL.value;
  } */

  if (validation(siteName) && validation(siteURL)) {
    var site = {
      id: Date.now(),
      name: siteName.value.trim(),
      url: siteURL.value.trim(),
    };
    bookmarkList.push(site);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    clear();
    display();
  } else {
    validationBoxShow();
  }
}

function display(list = bookmarkList) {
  var box = "";
  for (let i = 0; i < list.length; i++) {
    box += `<tr>
            <td>${i + 1}</td>
            <td class="text-capitalize">${list[i].name}</td>
            <td><a href="${
              list[i].url
            }" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn btn-delete" onclick="deleteBookmark(${
              list[i].id
            })"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`;
  }
  tableContent.innerHTML = box;
}

function clear() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteBookmark(id) {
  bookmarkList = bookmarkList.filter(function (ele) {
    return ele.id !== id;
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  display();
}

function searchBookmark(term) {
  var searchArr = [];
  for (let i = 0; i < bookmarkList.length; i++) {
    if (
      bookmarkList[i].name
        .trim()
        .toLowerCase()
        .includes(term.trim().toLowerCase())
    ) {
      searchArr.push(bookmarkList[i]);
    }
  }
  display(searchArr);
}

function validationBoxShow() {
  validationModal.classList.add("d-block");
}
function validationBoxHide() {
  validationModal.classList.remove("d-block");
}

function validation(input) {
  var Regex = {
    bookmarkName: /^.{3,}$/,
    bookmarkURL:
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
  };
  if (Regex[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
