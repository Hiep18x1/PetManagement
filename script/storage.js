"use strict";
//Animation for sidebar
//Ta đặt nó ở dile này để khi chuyển sang bất kì trang nào thì vẫn hoạt động được vì các file html đều link tới file storage.js
const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function (e) {
  this.classList.toggle("active");
});

// function save to storage: ta chuyển luôn thành string
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

//function get from storage:
const getFromStorage = function (key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
};

//test data
const data1 = {
  id: "P001",
  name: "cho",
  age: 12,
  type: "Dog",
  weight: 12,
  length: 13,
  color: "#333333",
  breed: "chó trắng",
  vaccinated: true,
  Dewormed: true,
  Sterilized: true,
  date: new Date().toLocaleString().split(",")[0],
};

const data2 = {
  id: "P002",
  name: "meo",
  age: 12,
  type: "Cat",
  weight: 12,
  length: 13,
  color: "#000000",
  breed: "mèo đen",
  vaccinated: false,
  Dewormed: true,
  Sterilized: false,
  date: new Date().toLocaleString().split(",")[0],
};

const breed1 = {
  breed: "mèo đen",
  type: "Cat",
};
const breed2 = {
  breed: "chó trắng",
  type: "Dog",
};

// Nếu chưa có dữ liệu => getFromStorage("petArr")=null thì sẽ lưu petArr vào, nếu có rồi thì chỉ cần lấy thôi

if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");
// console.log(petArr);

if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2]);
}
const breedArr = getFromStorage("breedArr");
