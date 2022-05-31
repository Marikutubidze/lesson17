let mainWrapper = document.getElementById("postBlock");
let overlayContent = document.getElementById("overlay");
let closeOverlay = document.getElementById("close");
let postContent = document.getElementById("content");

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

  divWrapper.appendChild(h2Tag);
  divWrapper.appendChild(h3Tag);

  divWrapper.addEventListener("click", function (event) {
    let id = event.target.getAttribute("data-id");
    openOverlay(id);
  });

  mainWrapper.appendChild(divWrapper);

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
