let mainWrapper = document.getElementById("postBlock");

// სერვერზე მოთხოვნის გაგზავნა

function ajax() {
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xmlRequest.addEventListener("load", function () {
    let data = JSON.parse(xmlRequest.responseText);

    data.forEach((element) => {
      createPost(element);
    });
  });

  xmlRequest.send();
}

ajax();

// პოსტების შექმნა

function createPost(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");

  let h2Tag = document.createElement("h2");
  h2Tag.innerText = item.id;

  let h3Tag = document.createElement("h3");
  h3Tag.innerText = item.title;

  divWrapper.appendChild(h2Tag);
  divWrapper.appendChild(h3Tag);

  mainWrapper.appendChild(divWrapper);

  console.log(divWrapper);
}
