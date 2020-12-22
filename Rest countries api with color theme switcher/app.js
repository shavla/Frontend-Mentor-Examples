(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

$("#search").on("input", function () {
  let name = this.value;
  $.ajax({
    url: `https://restcountries.eu/rest/v2/name/${name}`,
    dataType: "json",
    success: function (data) {
      let result = "";
      for (let i = 0; i < data.length; i++) {
        result += `
        <div class="each-country" onclick="choseCountry(this)">
          <img src ="${data[i].flag}">
          <h2>${data[i].name}</h2>
          <p>Population: <span>${commas(data[i].population)}</span></p>
          <p>Region: <span>${data[i].region}</span></p>
          <p>Capital: <span>${data[i].capital}</span></p>
        </div>`;
      }
      $(".countries").html(result);
    },
    error: function (error) {
      if ($(".filter-country").has("p")) {
        $("#error").remove();
      }
      $(".filter-country")
        .append(`<p id="error">no matched country</p>`)
        .css("color", "red");
      if (name.length == 0) {
        $("#error").remove();
      }
    },
    type: "GET",
  });
});

$("select").on("change", function () {
  let region = this.value;
  $.ajax({
    url: `https://restcountries.eu/rest/v2/region/${region}`,
    dataType: "json",
    success: function (data) {
      let result = "";
      for (let i = 0; i < data.length; i++) {
        result += `
        <div class="each-country" onclick="choseCountry(this)">
          <img src ="${data[i].flag}">
          <h2>${data[i].name}</h2>
          <p>Population: <span>${commas(data[i].population)}</span></p>
          <p>Region: <span>${data[i].region}</span></p>
          <p>Capital: <span>${data[i].capital}</span></p>
        </div>`;
      }
      $(".countries").html(result);
    },
    type: "GET",
  });
});

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function choseCountry(element) {
  let text = [element.innerText][0].split("\n\n");
  $.ajax({
    url: `https://restcountries.eu/rest/v2/name/${text[0]}`,
    dataType: "json",
    success: function (data) {
      $(".content").css("display", "none");
      $(".print-country").css("display", "flex");
      let result = "";
      result += `
        <button onclick="back()"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
        <img src ="${data[0].flag}">
        <div class="flex f-d-column">
          <div class="flex">
            <div>
              <h2>${data[0].name}</h2>
              <p>Native Name: <span>${data[0].nativeName}</span></p>
              <p>Population: <span>${commas(data[0].population)}</span></p>
              <p>Region: <span>${data[0].region}</span></p>
              <p>Sub Region: <span>${data[0].subregion}</span></p>
              <p>Capital: <span>${data[0].capital}</span></p>
            </div>
            <div>
              <p>Top Level Domain: <span>${data[0].topLevelDomain}</span></p>
              <p>Currencies: <span>${data[0].currencies[0].name}</span></p>
              <p>Languages: <span>${languages(data[0].languages)}</span></p>
            </div>
          </div>
          <p>Border Countries: <span>${borders(data[0].borders)}</span></p>
        </div>`;
      $(".print-country").html(result);
    },
    type: "GET",
  });
}

function languages(obj) {
  let result = "";
  for (let item of obj) {
    result += item.name + ", ";
  }
  return result.slice(0, -2);
}

function borders(arr) {
  let result = "";
  for (let item of arr) {
    result += item + ", ";
  }
  return result.slice(0, -2);
}

function back() {
  $(".content").css("display", "flex");
  $(".print-country").css("display", "none");
}
