function getDateTime() {
  let today = new Date(),
    current_day = today.getDay() + 1 != 1 ? "Thứ " + String(today.getDay() + 1) : "Chủ Nhật",
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    hours = today.getHours(),
    minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();

  today = current_day + ", " + mm + "/" + dd + "/" + yyyy + ", " + hours + ":" + minutes;
  return today;
}
$(".menu__table-day").html(getDateTime());

function addFood(name, money) {
  str = "<tr class='foodName'><td class='foodName-name'>" + name + "</td>";
  str += "<td><input class = 'quantity' value='1'></td>";
  str += "<td><input class='foodMoney' value=" + money + ">" + "</td><td>";
  str += "<button class = 'btn-del'> Xoá </button></tr>";
  return str;
}

let seatNumber = $("#seat").val();
$("#seat").on("input", function () {
  seatNumber = $("#seat").val();
});

$("#food").on("input", function () {
  let listFood,
    totalMoney,
    tableReceiptMeal,
    foodMoney = $("#food").val(),
    foodName = $("#food :selected").text();
  if (seatNumber == "Bàn 1") {
    totalMoney = $(".total-money");
    listFood = $(".receipt-meal .foodName");
    tableReceiptMeal = $(".receipt-meal tr:last-child");
  } else if (seatNumber == "Bàn 2") {
    alert("Bàn không tồn tại");
  } else {
    alert("Bàn không tồn tại");
  }
  let flag = 0;
  if (listFood.length != 0) {
    listFood.each(function () {
      if ($(this).find(".foodName-name").text() == foodName) {
        var valueQnt = $(this).find(".quantity"),
          valueMoney = $(this).find(".foodMoney");
        valueQnt.val(Number(valueQnt.val()) + 1);
        valueMoney.val(Number(valueMoney.val()) + Number(foodMoney));
        totalMoney.text(Number(totalMoney.text()) + Number(foodMoney));
        flag = 1;
      }
    });
  }
  if (flag == 0 || listFood.length == 0) {
    tableReceiptMeal.before(addFood(foodName, foodMoney));
    totalMoney.text(Number(totalMoney.text()) + Number(foodMoney));
  }
});

$(document).on("click", ".btn-del", function () {
  let delMoney = $(this).parents(".foodName").find(".foodMoney").val(),
    newTotalMoney = $(this).parents(".receipt-meal").find(".total-money");
  newTotalMoney.text(Number(newTotalMoney.text()) - Number(delMoney));
  $(this).parent().parent().remove();
});

$(document).on("click", ".btn-print", function (event) {
  localStorage.setItem("dateTime", getDateTime());
  localStorage.setItem("staffName", $(".menu__table-name").text());
  let htmlFoodList, listFood, totalMoney;
  listFood = $(".receipt-meal .foodName");
  listFood.each(function () {
    let name = $(this).find(".foodName-name").text(),
      money = $(this).find(".foodMoney").val(),
      qnt = $(this).find(".quantity").val();
    htmlFoodList += "<tr><td>" + name + "</td>" + "<td>" + qnt + "</td>" + "<td>" + money + "</td></tr>";
  });
  totalMoney = $(".total-money").text();
  htmlFoodList += "<tr><th>Tổng tiền</th><th class='print-total-money' colspan='2'>" + totalMoney + " đ</th>'</tr>";
  localStorage.setItem("foodList", htmlFoodList);
  window.location.href = "./B3-receipt.html";
});

$(".print-receipt__day").html(localStorage.getItem("dateTime"));
$(".print-receipt__name").html(localStorage.getItem("staffName"));
$(".print-receipt__tbl").append(localStorage.getItem("foodList"));