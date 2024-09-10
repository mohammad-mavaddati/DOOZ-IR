"use strict";
//المان های مربوط به بازیکنان
const player_1_score = document.querySelectorAll("#player-1-score");
const player_2_score = document.querySelectorAll("#player-2-score");
const player_1_name = document.querySelectorAll("#player-1-name");
const player_2_name = document.querySelectorAll("#player-2-name");
const player_1_input = document.getElementById("player-1-input");
const player_2_input = document.getElementById("player-2-input");
let player_1_list = [];
let player_2_list = [];

const player_1_logo = `<img src="image/player-1.svg" alt="">`;
const player_2_logo = `<img src="image/player-2.svg" alt="">`;

const active_player_1 = "active-player-1";
const active_player_2 = "active-player-2";
const win_player_1 = "win-player-1";
const win_player_2 = "win-player-2";

//المان های مربوط به دکمه ها
const header_btn = document.getElementById("header-btns");

//المان اسکوربورد
const score_board = document.querySelectorAll("#score-board");

let dooz_list = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let turn = [player_1_list, player_1_score, player_1_logo, active_player_1, win_player_1];

const dooz_btns = document.querySelectorAll("#dooz-btns");

function start() {
  //جایگزین میشود (player 1 و player 2) درصورتی که بازیکنان در ورودی اسمی وارد نکردند نامشان در بازی با
  for (let i of player_1_name) {
    i.textContent = player_1_input.value.length > 0 ? player_1_input.value : "player 1";
  }
  for (let i of player_2_name) {
    i.textContent = player_2_input.value.length > 0 ? player_2_input.value : "player 2";
  }

  //(صفحه بازی) رفتن به صفحه دوم
  go_page_2();

  //فعال کردن دکمه های هدر
  header_btn.classList.remove("invisible");

  //فعال کردن افکت بازیکنی که نوبشه
  score_board[0].classList.add(turn[3]);

  for (let i of dooz_btns) {
    //درصورتی که بازین روی یکی از خونه های دوز کلیک کرد فانکشن زیر اجرا میشود
    i.addEventListener("click", function () {
      //خانه ای که کلیک شده
      const clicked_btn = i;

      if (dooz_list.includes(clicked_btn.value)) {
        //حذف خانه کلیک شده از خانه های موجود
        delete dooz_list[clicked_btn.value];
        //اضافه کردن خانه کلیک شده با لیست بازیکنی که نوبتش است
        turn[0].push(clicked_btn.value);
        //ظاهر کردن لوگوی بازین روی خانه ای که کلیک کرده
        clicked_btn.innerHTML = turn[2];
        //ایا برنده ای داریم؟
        if (check_winner()) {
          //غیر فعال کردن دکمه های هدر
          header_btn.classList.add("invisible");

          //برو به صفحه سوم
          go_page_3();
          //اضافه کردن افکت بازیکن برنده
          score_board[1].classList.add(turn[4]);
          //اضافه کردن به امتیاز بازیکنی که برنده شده
          for (let i of turn[1]) {
            i.textContent = Number(i.textContent) + 1;
          }
        } else {
          //تغییر نوبت
          switch_turn();
        }
	// در صورتی که بازی مساوی شد خانه ها از نو چیده میشوند
	if (player_1_list.length + player_2_list.length === 9){
	  pass();
	}
      }
    });
  }
}
function switch_turn() {
  score_board[0].classList.remove(turn[3]);
  turn = turn[0] === player_1_list ? [player_2_list, player_2_score, player_2_logo, active_player_2, win_player_2] : [player_1_list, player_1_score, player_1_logo, active_player_1, win_player_1];
  score_board[0].classList.add(turn[3]);
}

function check_winner() {
  let conditions = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],

    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],

    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  //تعداد خانه های مشترک بازیکن و شرط برنده شدن
  let trues = 0;

  // این حلقه به نوبت در خانه های کلیک شده توسط بازیکن را با شرط های مختلف برسی میکند که اگر درست بود ان بازیکن برنده میشود
  for (let i of conditions) {
    for (let j of i) {
      for (let b of turn[0]) {
        if (b === j) {
          trues++;
        }
      }
    }
    if (trues >= 3) {
      return true;
    } else {
      trues = 0;
    }
  }
}

function again() {
  //فعال کردن دکمه های هدر
  header_btn.classList.remove("invisible");

  //ریست کردن لیست بازیکنان
  player_1_list = [];
  player_2_list = [];
  //ریست کردن امتیاز بازیکنان
  for (let i of player_1_score) {
    i.textContent = 0;
  }
  for (let i of player_2_score) {
    i.textContent = 0;
  }
  //ریست کردن خانه های موجود
  dooz_list = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //حذف لوگوی بازیکنان از خانه ها
  for (let i of dooz_btns) {
    i.innerHTML = "";
  }

  //حذف کردن افکت بازیکن برنده 
  score_board[1].classList.remove(turn[4]);

  //تغییر نوبت
  switch_turn();

  //رفتن به صفحه دوم
  go_page_2();
}
function home() {
  //ریست کردن بازی
  again();

  //غیر فعال کردن دکمه های هدر
  header_btn.classList.add("invisible");

  //رفتن به صفحه اول
  go_page_1();
}
function pass() {
  //فعال کردن دکمه های هدر
  header_btn.classList.remove("invisible");

  //ریست کردن لیست بازیکنان
  player_1_list = [];
  player_2_list = [];

  //ریست کردن خانه های موجود
  dooz_list = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //حذف لوگوی بازیکنان از خانه ها
  for (let i of dooz_btns) {
    i.innerHTML = "";
  }

  //حذف کردن افکت بازیکن برنده 
  score_board[1].classList.remove(turn[4]);

  //تغییر نوبت
  switch_turn();

  //رفتن به صفحه دوم
  go_page_2();
}

function go_page_1() {
  document.getElementById("page-1").classList.remove("hidden");
  document.getElementById("page-1").classList.add("flex");

  document.getElementById("page-2").classList.add("hidden");
  document.getElementById("page-2").classList.remove("flex");

  document.getElementById("page-3").classList.add("hidden");
  document.getElementById("page-3").classList.remove("flex");
}

function go_page_2() {
  document.getElementById("page-1").classList.add("hidden");
  document.getElementById("page-1").classList.remove("flex");

  document.getElementById("page-2").classList.remove("hidden");
  document.getElementById("page-2").classList.add("flex");

  document.getElementById("page-3").classList.add("hidden");
  document.getElementById("page-3").classList.remove("flex");
}

function go_page_3() {
  document.getElementById("page-1").classList.add("hidden");
  document.getElementById("page-1").classList.remove("flex");

  document.getElementById("page-2").classList.add("hidden");
  document.getElementById("page-2").classList.remove("flex");

  document.getElementById("page-3").classList.remove("hidden");
  document.getElementById("page-3").classList.add("flex");
}

//روی کیبورد کلیک کند Enter برروی , start-btn بازیکن میتواند بجای کلیک برو روی 
document.addEventListener("keydown",function(e){
  if(document.getElementById("page-1").classList.contains("flex") && e.key === "Enter"){
    start()
  }
})
//روی کیبورد کلیک کند Esc برروی , home-btn بازیکن میتواند بجای کلیک برو روی 
document.addEventListener("keydown",function(e){
  if(document.getElementById("page-3").classList.contains("flex") || document.getElementById("page-2").classList.contains("flex") && e.key === "Escape"){
    home()
  }
})