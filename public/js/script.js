  const container = document.querySelector(".logincontainer"),
  overlay = document.querySelector(".overlay"),
  user = document.getElementById("user"),
  button = document.getElementById("floating-button"),
  menubutton = document.getElementById("menu-button"),
  menucontainer = document.querySelector(".menu-container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  logout = document.querySelector(".logout-container"),
  order = document.getElementById("order");


function showContainer() {
  if (overlay && container && button) {
    overlay.classList.remove("hide");
    container.classList.remove("hide");
    button.classList.remove("hide");
    var head = document.getElementById("header");
    if (head) head.style.background = 'rgba(0, 0, 0, 0)';
    setTimeout(() => {
      overlay.classList.add("show");
      container.classList.add("show");
      button.classList.add("show");
    }, 100);
  }
  if (overlay && logout && button) {
    overlay.classList.remove("hide");
    logout.classList.remove("hide");
    button.classList.remove("hide");
    var head = document.getElementById("header");
    if (head) head.style.background = 'rgba(0, 0, 0, 0)';
    setTimeout(() => {
      overlay.classList.add("show");
      logout.classList.add("show");
      button.classList.add("show");
    }, 100);
  }
}

function hideContainer() {
  if (overlay && container && button) {
    overlay.classList.remove("show");
    container.classList.remove("show");
    button.classList.remove("show");
    var head = document.getElementById("header");
    if (head) head.style.background = 'var(--bg-color)';
    setTimeout(() => {
      overlay.classList.add("hide");
      container.classList.add("hide");
      button.classList.add("hide");
    }, 500);
  }
  if (overlay && logout && button) {
    overlay.classList.remove("show");
    logout.classList.remove("show");
    button.classList.remove("show");
    var head = document.getElementById("header");
    if (head) head.style.background = 'var(--bg-color)';
    setTimeout(() => {
      overlay.classList.add("hide");
      logout.classList.add("hide");
      button.classList.add("hide");
    }, 500);
  }
}

function showMenuContainer() {
  if (menucontainer && overlay) {
    menucontainer.classList.remove("hide");
    overlay.classList.remove("hide");
    setTimeout(() => {
      overlay.classList.add("show");
      menucontainer.classList.add("show");
      menucontainer.style.left = '0';
    }, 100);
  }
}

function hideMenuContainer() {
  if (overlay && menucontainer) {
    overlay.classList.remove("show");
    menucontainer.classList.remove("show");
    setTimeout(() => {
      overlay.classList.add("hide");
      menucontainer.classList.add("hide");
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const orderButton = document.getElementById("order");
  if (orderButton) {
    orderButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/orders";
    });
  }
});

if (user) {
  user.addEventListener("click", () => {
    setTimeout(showContainer, 300);
  });
}

if (button) {
  button.addEventListener("click", () => {
    setTimeout(hideContainer, 300);
  });
}

if (menubutton) {
  menubutton.addEventListener("click", () => {
    if (menucontainer.classList.toggle("hide")) {
      setTimeout(hideMenuContainer, 100);
    } else {
      setTimeout(showMenuContainer, 100);
    }
  });
}

if (pwShowHide.length > 0) {
  pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      pwFields.forEach((pwField) => {
        pwField.type = pwField.type === "password" ? "text" : "password";
      });
      eyeIcon.classList.toggle("uil-eye");
      eyeIcon.classList.toggle("uil-eye-slash");
    });
  });
}

let currentIndex = 0;
const images = document.querySelectorAll(".slider-img");
const totalImages = images.length;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  showImage(currentIndex);
}

if (images.length > 0) {
  setInterval(nextImage, 7000);
}

//search input
function toggleSearchInput() {
  const input = document.getElementById('sInput');
  const inputValue = input.value.trim();

  if (input.style.display === 'none' || input.style.display === '') {
    input.style.display = 'inline-block';
    input.focus();
  } else {
    if (inputValue !== '') {
      const encodedBookName = encodeURIComponent(inputValue);
      console.log(`Navigating to /bookpage/${encodedBookName}`);
      window.location.href = `/bookpage/${encodedBookName}`;
    } else {
      resetSearchInput();
    }
  }
}

function resetSearchInput() {
  const input = document.getElementById('sInput');
  input.style.display = 'none';
  input.value = '';
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', toggleSearchInput);

document.addEventListener('click', function (event) {
  const searchInput = document.getElementById('sInput');
  const searchButton = document.querySelector('.search-button');
  if (searchInput.style.display !== 'none') {
    if (!searchInput.contains(event.target) && event.target !== searchButton) {
      resetSearchInput();
    }
  }
});

//cart 
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-53').forEach(button => {
    button.addEventListener('click', function () {
      const bookId = this.getAttribute('data-id');
  
      fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          if (data.success) {
            console.log('Book added to cart successfully');
            window.location.href = '/cart';
          } else {
            console.error('Failed to add book to cart:', data.message);
          }
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
    });
  });
});

// news API
document.addEventListener('DOMContentLoaded', () => {
  const newsTicker = document.getElementById('news-ticker');
  const apiKey = '43f06260ca9f4a97b1c9890e5eeeb679';
  const endpoint = `https://newsapi.org/v2/everything?q=book+recommendations&apiKey=${apiKey}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles.slice(0, 7);

      if (articles.length > 0) {
        articles.forEach(article => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');

          const title = document.createElement('span');
          title.innerText = article.title;
          newsItem.appendChild(title);

          const link = document.createElement('a');
          link.href = article.url;
          link.innerText = ' -> Read more';
          link.target = '_blank';
          link.style.color = '#8888be'
          newsItem.appendChild(link);

          newsTicker.appendChild(newsItem);
        });
      } else {
        newsTicker.innerText = 'No relevant articles found for now.';
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsTicker.innerText = 'Unable to load news at the moment.';
    });
});

// branches fron the DB and display in /about
function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: { lat: 32.047000, lng: 34.808080 }
  });

  fetch('/api/branches')
    .then(response => response.json())
    .then(branches => {
      branches.forEach(branch => {
        new google.maps.Marker({
          position: {
            lat: branch.location.lat,
            lng: branch.location.lng
          },
          map: map,
          title: branch.name
        });
      });
    })
    .catch(error => {
      console.error('Error fetching branches:', error);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.view-all button').forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');
      handleButtonClick(section);
    });
  });

  // Update radio button selection based on section query parameter
  const radios = document.querySelectorAll('input[name="value-radio"]');
  const currentSection = new URLSearchParams(window.location.search).get('section');

  radios.forEach(radio => {
    if (radio.id === currentSection) {
      radio.checked = true;
    }
    radio.addEventListener('change', () => {
      handleRadioChange(radio.id);
    });
  });

  // Trigger the selection display update
  updateSelectionDisplay();
});

function handleButtonClick(section) {
  console.log(`Button from ${section} section was clicked`);
  window.location.href = `/AllBooks?section=${section}`;
}

function handleRadioChange(section) {
  console.log(`Radio button for ${section} section was selected`);
  window.location.href = `/AllBooks?section=${section}`;
}

function updateSelectionDisplay() {
  const selection = document.querySelector('.selection');
  const checkedRadio = document.querySelector('input[name="value-radio"]:checked');
  const containerHeight = parseFloat(getComputedStyle(document.querySelector('.radio-input')).getPropertyValue('--container_height'));

  if (checkedRadio) {
    const index = Array.from(document.querySelectorAll('input[name="value-radio"]')).indexOf(checkedRadio);
    selection.style.transform = `translateY(calc(${containerHeight} * ${index} / 4))`;
    selection.style.backgroundColor = 'rgb(11 117 223)';
    selection.style.display = 'inline-block';
  }
}
// conferm order
function processPayment() {
  
  const name = document.getElementById('name').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;

  fetch('/process-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(responseText => {
    if (responseText.trim().toLowerCase() !== 'payment processed successfully'.toLowerCase()) {
      throw new Error('Server response was not OK');
    }
    alert('Your order will be delivered to you in 3 days, see you soon!');
    window.location.href = '/home';
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}


const paymentButton = document.getElementById('payment-button');
if (paymentButton) {
  paymentButton.addEventListener('click', processPayment);
}

// Chart rendering function
window.onload = function() {
  renderChart();
  renderChartIncome();
  renderChartQuantity()
};

function renderChart() {
  const dataElement = document.getElementById('books-sold-data');
  if (!dataElement) {
    console.error("books-sold-data element not found");
    return;
  }

  try {
    const data = JSON.parse(dataElement.textContent);

    const margin = { top: 20, right: 30, bottom: 40, left: 240 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#books-sold-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.totalSold)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.bookName))
      .range([0, height])
      .padding(0.1);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.bookName))
      .attr("width", d => x(d.totalSold))
      .attr("height", y.bandwidth());

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));

    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}

function renderChartIncome() {
  const dataElement = document.getElementById('income-data');
  try {
    const data = JSON.parse(dataElement.textContent);
    console.log(data);
  
    const margin = { top: 20, right: 30, bottom: 40, left: 240 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#income-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.totalIncome) + 100])
      .range([height, 0]);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.bookName))
      .range([0, width])
      .padding(0.1);
  
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.bookName))
      .attr("y", d => y(d.totalIncome))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.totalIncome));
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat(d3.format(".0f")));
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}

function renderChartQuantity() {
  const dataElement = document.getElementById('quantity-data');
  try {
    const data = JSON.parse(dataElement.textContent);
    console.log(data);
  
    const margin = { top: 20, right: 30, bottom: 40, left: 240 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#quantity-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.totalQuantity)]) 
      .range([height, 0]);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d._id)) 
      .range([0, width])
      .padding(0.1);
  
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d._id)) 
      .attr("y", d => y(d.totalQuantity)) 
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.totalQuantity));
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat(d3.format(".0f")));
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}