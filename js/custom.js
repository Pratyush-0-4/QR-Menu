$(function () {
  // Main Menu JS
  $(window).scroll(function () {
    if ($(this).scrollTop() < 50) {
      $("nav").removeClass("site-top-nav");
      $("#back-to-top").fadeOut();
    } else {
      $("nav").addClass("site-top-nav");
      $("#back-to-top").fadeIn();
    }
  });
  //Search js
function searchFood() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll(".food-item");
  const resultDiv = document.getElementById("searchResult");

  let found = false;
  items.forEach(item => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    if (name.includes(input)) {
      item.style.display = "block";
      found = true;
    } else {
      item.style.display = "none";
    }
  });

  if (found) {
    resultDiv.textContent = `Showing results for: "${input}"`;
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = `No food item found for: "${input}"`;
    resultDiv.style.color = "red";
  }

  if (input === "") {
    resultDiv.textContent = "";
    items.forEach(item => item.style.display = "block");
  }
}
  // Shopping Cart Toggle JS
  $("#shopping-cart").on("click", function () {
    $("#cart-content").toggle("blind", "", 500);
  });

  // Back-To-Top Button JS
    $("#back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Delete Cart Item JS
  $(document).on("click", ".btn-delete", function (event) {
    event.preventDefault();
    $(this).closest("tr").remove();
    updateTotal();
  });
 
  // Update Total Price JS
  function updateTotal() {
   let total = 0;
    $("#food-menu-desc").each(function () {
      const priceText = $(this).find("td:nth-child(5)").text();
      const price = parseFloat(priceText.replace("₹", "").replace("$", "").trim());
      if (!isNaN(price)) {
        total += price;
      }
    });
    $("#cart-content th:nth-child(5)").text("$" + total.toFixed(2));
    $(".tbl-full th:nth-child(6)").text("$" + total.toFixed(2));
  }
});

  const gpayRadio = document.getElementById("gpay");
  const cashRadio = document.getElementById("cash");
  const qrSection = document.getElementById("gpay-qr");
  const resultText = document.getElementById("selected-method");

  // Toggle QR display on change
  document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (gpayRadio.checked) {
        qrSection.classList.remove("hidden");
      } else {
        qrSection.classList.add("hidden");
      }
    });
  });

  // Show selected payment method
  document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="payment"]:checked').value;
    resultText.textContent = `Payment Method Selected: ${selected}`;
  });
