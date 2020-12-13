let oldData = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "FullStack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["Ruby", "Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];
let data = oldData;

let arrOfClicked = [];

$(document).ready(function () {
  for (let i = 0; i < data.length; i++) {
    let cls = `<div class="each-item flex">${all(i)}</div>`;
    $("#lists").append(cls);
  }
  $("p")
    .filter(function () {
      return this.innerHTML == "";
    })
    .remove();

  $(".spn1")
    .filter(function () {
      return this.innerHTML == "";
    })
    .remove();

  $(".spn2")
    .filter(function () {
      return this.innerHTML == "";
    })
    .remove();
});

function all(n) {
  return (
    logo(n) +
    `<div class="descriptions flex j-c-space-between">` +
    descriptionOne(n) +
    descriptionTwo(n) +
    "</div>"
  );
}

function logo(n) {
  return `<img src=${data[n].logo}>`;
}

function descriptionOne(n) {
  let name = data[n].company;
  let news = "";
  let featured = "";
  if (data[n].new) {
    news = "NEW!";
  }
  if (data[n].featured) {
    featured = "FEATURED";
  }

  let position = data[n].position;
  let postedAt = data[n].postedAt;
  let contract = data[n].contract;
  let location = data[n].location;
  return `<div class="description-one flex f-d-column j-c-space-between ${featured}">
    <p>${name} <span class="spn1">${news}</span> <span class="spn2">${featured}</span></p>
    <h3>${position}</h3>
    <p>${postedAt} . ${contract} . ${location}<p>
  </div>`;
}

function descriptionTwo(n) {
  let role = data[n].role;
  let level = data[n].level;
  let languages = "";
  for (let i = 0; i < data[n].languages.length; i++) {
    languages += `<p onclick="filter(this)">${data[n].languages[i]}</p>`;
  }
  let tool = "";
  for (let j = 0; j < data[n].tools.length; j++) {
    tool += `<p onclick="filter(this)">${data[n].tools[j]}</p>`;
  }
  return `<div class="description-two flex" >
        <p onclick="filter(this)">${role}</p>
        <p onclick="filter(this)">${level}</p>
        <p onclick="filter(this)">${languages}</p>
        <p onclick="filter(this)">${tool}</p>
    </div>`;
}

function filter(that) {
  if (arrOfClicked.indexOf(that.innerHTML) == -1) {
    arrOfClicked.push(that.innerHTML);
  }
  $(".filter").css("visibility", "visible");
  $(".filter").children().not(":first-child").remove();
  $(".filter").append(
    `<div class="selected-items flex">${renderSelected()}</div>`
  );
  renderSelectedItems();
  // console.log(arrOfClicked);
}

function clearArrOfClicked() {
  arrOfClicked = [];
  $(".filter").children().not(":first-child").remove();
  $(".filter").css("visibility", "hidden");

  $(".each-item").css("display", "flex");
  $(".second").css("display", "none");

  // console.log(arrOfClicked);
}

function renderSelected() {
  let str = "";
  for (let i = 0; i < arrOfClicked.length; i++) {
    str += `<p>${arrOfClicked[i]}</p>`;
  }
  return str;
}

function renderSelectedItems() {
  let allDescriptionArr = [];
  let eachOfAllDescriptionArr = [];

  for (let k = 0; k < oldData.length; k++) {
    eachOfAllDescriptionArr.push(oldData[k].role);
    eachOfAllDescriptionArr.push(oldData[k].level);
    eachOfAllDescriptionArr.push(...oldData[k].languages);
    eachOfAllDescriptionArr.push(...oldData[k].tools);
    allDescriptionArr.push(eachOfAllDescriptionArr);
    eachOfAllDescriptionArr = [];
  }

  console.log(arrOfClicked);
  console.log(allDescriptionArr);

  // console.log(data);
  $(".each-item").css("display", "none");
  let a = "";
  for (let i = 0; i < allDescriptionArr.length; i++) {
    if (arrayContainsArray(allDescriptionArr[i], arrOfClicked)) {
      let cls = `<div class="second each-item flex">${all(i)}</div>`;
      $("#lists").append(cls);
      $("p")
        .filter(function () {
          return this.innerHTML == "";
        })
        .remove();

      $(".spn1")
        .filter(function () {
          return this.innerHTML == "";
        })
        .remove();

      $(".spn2")
        .filter(function () {
          return this.innerHTML == "";
        })
        .remove();
    }
  }
  console.log(a);
  // let cls = `<div class="each-item flex">${all(i)}</div>`;
  // $("#lists").append(cls);
  // return $("#lists").append(`<p>sss</p>`)
}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return superset.indexOf(value) >= 0;
  });
}
