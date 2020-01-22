var max = 500;
var cur = 1;
var lottery_id;
var running = false;
var interval = 13;
var result = new Set([]);

function setNumber(number) {
  number = number.toString();
  if (number.length < 3) {
    number = "0".repeat(3 - number.length) + number;
  }
  for (let i = 0; i < 3; i++) {
    $(".panel .digit:nth-child(" + (i + 1) + ") li").text(Number(number.charAt(i)));
  }
}

function lottery() {
  setNumber(cur);
  cur = (cur + 1) % (max + 1);
  if (0 === cur) {
    cur = 1;
  }
}

function addResult(res) {
  result.add(res);
  var result_li = document.createElement('li');
  result_li.innerText = res;
  document.getElementById('result_ul').appendChild(result_li);
}

function toggle_lottery() {
  if (running) {
    while (result.has(cur)) {
      cur = cur + parseInt(Math.random() * (max - cur));
    }
    setNumber(cur);
    clearInterval(lottery_id);
    addResult(cur);
    document.getElementById('btn_lottery').innerText = ' 再来一次 ';
  } else {
    lottery_id = setInterval(lottery, interval);
    document.getElementById('btn_lottery').innerText = ' 抽抽抽抽 ';
  }
  running = !running;
}

$("#custom-number").keyup(function () {
  let n = $(this).val();
  if (n.length == 0) {
    max = 100;
    $("#error").html("");
  } else if (isNaN(n) || Number(n) > 999) {
    max = 100;
    $("#error").html("数字不合法");
  } else {
    max = Number(n);
    $("#error").html("");
  }
});