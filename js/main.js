var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var bookmarkList = [];
if (localStorage.getItem("bookmarks") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

function addBookmark() {
  if (
    !siteURL.value.startsWith("http://") &&
    !siteURL.value.startsWith("https://")
  ) {
    siteURL.value = "http://" + siteURL.value;
  }
  var site = {
    id: Date.now(),
    name: siteName.value.trim(),
    url: siteURL.value.trim(),
  };
  bookmarkList.push(site);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  clear();
  display();
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
