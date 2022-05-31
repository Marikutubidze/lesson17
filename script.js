let mainWrapper = document.getElementById("postBlock");
let overlayContent = document.getElementById("overlay");
let closeOverlay = document.getElementById("close");
let postContent = document.getElementById("content");

let addButton = document.getElementById("add");
let postOverlay = document.getElementById("post-overlay");
let form = document.getElementById("form");
let postButton = document.getElementById("add-post");

// სერვერზე მოთხოვნის გაგზავნა

function ajax(url, callback) {
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", url);
  xmlRequest.addEventListener("load", function () {
    let data = JSON.parse(xmlRequest.responseText);
    callback(data);
  });

  xmlRequest.send();
}

ajax("https://jsonplaceholder.typicode.com/posts", function (data) {
  printData(data);
});

function printData(data) {
  data.forEach((element) => {
    createPost(element);
  });
}
// პოსტების შექმნა

function createPost(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");
  divWrapper.setAttribute("data-id", item.id);

  let h2Tag = document.createElement("h2");
  h2Tag.innerText = item.id;

  let h3Tag = document.createElement("h3");
  h3Tag.innerText = item.title;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "delete post";
  deleteButton.setAttribute("data-id", item.id);

  divWrapper.appendChild(h2Tag);
  divWrapper.appendChild(h3Tag);
  divWrapper.appendChild(deleteButton);
  mainWrapper.appendChild(divWrapper);

  divWrapper.addEventListener("click", function (event) {
    let id = event.target.getAttribute("data-id");
    openOverlay(id);
  });

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    divWrapper.classList.add("deletepost");
    deletePost(id);
  });
}

function deletePost(id) {
  let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  fetch(url, function () {
    method: "DELETE";
  });
}

function openOverlay(id) {
  overlayContent.classList.add("active");
  let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  ajax(url, function (data) {
    overlayFunction(data);
  });
}

function overlayFunction(item) {
  let description = document.createElement("p");
  description.innerText = item.body;

  let titlePost = document.createElement("h3");
  titlePost.innerText = item.title;

  content.appendChild(titlePost);
  content.appendChild(description);
}

closeOverlay.addEventListener("click", function () {
  overlayContent.classList.remove("active");
  postContent.innerHTML = " ";
});

addButton.addEventListener("click", function () {
  postOverlay.classList.add("overlay-active");
});

form.addEventListener("submit", function (event) {
  event.preventDefault;

  let formData = {
    title: event.target[0].value,
    description: event.target[1].value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  postOverlay.classList.remove("active-add");
});
