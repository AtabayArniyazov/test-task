"use strict";

$(function () {
    $("#jstree").jstree({
        "core" : {
        "check_callback" : true
    },
    "plugins" : [ "unique", "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
    });
});

var currentLevel = '1';
var ull = document.getElementById("treeDiv");
ull.onclick = function(event){
  var target = event.target;
  while(target != ull){
    if(target.tagName == 'LI'){
      var str = target.id;
      currentLevel = str.substring(3);
      clearTable();
      tab();

      return;
    }
    target = target.parentNode;
  }
};

function parent_create(){
  var ref = $("#jstree").jstree(true),
      sel = ref.get_selected(),
      selEl = document.getElementById(sel);
  if(!sel.length) {return false; };
  sel = sel[0];
  sel = ref.create_node($($(selEl).parent()).parent());
  if(sel){
    ref.edit(sel);
  };
  createMass();
  clearTable();
  tab();
}

function child_create(){
  var ref = $("#jstree").jstree(true),
      sel = ref.get_selected();
  if(!sel.length) {return false; };
  sel = sel[0];
  sel = ref.create_node(sel, {"type": "file"});
  if(sel){
    ref.edit(sel);
  };
  createMass();
  clearTable();
  tab();
}

function level_remove(){
  var ref = $("#jstree").jstree(true),
      sel = ref.get_selected();
  if(!sel.length){return false; };
  ref.delete_node(sel);
}

var mass = [];
var myObj = {mass};
function createMass(){
  for(var i = 1; i <= (document.getElementsByTagName('li').length); i++){
    if(mass[i] == undefined){
    mass[i] =  'j1_' + (i+1);
    myObj.mass[i] = [
      [ "iOS", 100],
      [ "Frontend", 200],
      [ "Backend", 300] ];
    }
  }
}

var addString = document.getElementById('addString');
addString.addEventListener('click', addSrt);
var remString = document.getElementById('remString');
remString.addEventListener('click', remSrt);

var container = document.getElementById('example');
function tab(){
  var hot = new Handsontable(container, {
    data: myObj.mass[currentLevel],
    rowHeaders: true,
    colHeaders: true,
    filters: true,
    dropdownMenu: true
  });
  hot.updateSettings({
      colHeaders: ['Наименование','Количество']
  });
  document.getElementById("hot-display-license-info").remove();
}

window.onload = function start(){
  createMass();
  tab();
};
function addSrt(){
  myObj.mass[currentLevel].push([ , ]);
  clearTable();
  tab();
}
function remSrt(){
  myObj.mass[currentLevel].pop();
  clearTable();
  tab();
}
function clearTable(){
  var delTab = document.getElementsByClassName("ht_master");
  var delTab2 = document.getElementsByClassName("ht_clone_top");
  var delTab3= document.getElementsByClassName("ht_clone_bottom");
  var delTab4 = document.getElementsByClassName("ht_clone_left");
  for(var i = 0; i < delTab.length; i++){
    delTab[i].remove();
    delTab2[i].remove();
    delTab3[i].remove();
    delTab4[i].remove();
  }
}