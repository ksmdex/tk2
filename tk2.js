// ==UserScript==
// @name        tk2dlbrowser
// @namespace   some.thing.namespace
// @description Script description
// @include     https://tk2dl.com/*
// @include     */tk2dl.com/*
// @version     1.0.0
// ==/UserScript==

var fs = [];
var sh = 0;

function getVideo(vid){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    var wholePage = ajax.responseText;
    var plainVideo = "https://"+wholePage.match(/video.twimg.com[^"]+/)[0];
    var post = "https://nitter.snopyta.org"+wholePage.match(/\/[^\/]+\/status\/[0-9]+/)[0];
    document.getElementById("controls").innerHTML="<a href='"+post+"' style='position:absolute;top:0;left:0;opacity:0.3;z-index:99;background:blue;color:white;display:inline-block;text-decoration:none;font-size:10px;'>"+post+"</a><video loop controls style='position:absolute;height:100%;right:0;left:0;margin:auto;'><source src='"+plainVideo+"'/></video><button id='hideplayer' style='position:absolute;top:0;right:0;opacity:0.3;z-index:99;background:blue;color:white;display:inline-block;text-decoration:none;font-size:10px;'>Hide</button>";
    document.getElementById("controls").style.display="block";
    document.getElementById("showBtn").style.display="block";
    document.getElementById("hideplayer").addEventListener("click",hidePlayer);
    sh = 2;
  }
  ajax.open("POST","/t/playtw.html",true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send("x="+vid);
}

var forms = document.getElementsByTagName("form");
var hrefs = document.getElementsByTagName("a");
var images = document.getElementsByTagName("img");

for (var i = 0; i < forms.length; i++) {
  fs[i] = forms[i][0].value;
}

for (var i = 9, j = 0; i < hrefs.length; i++, j++) {
  if (hrefs[i].href.split("javascript:").length > 1) {
    hrefs[i].href = "#"+fs[j];
  }
}

for (var i = 0; i < images.length; i++) {
images[i].src = images[i].getAttribute('data-src');
}

var controls = document.createElement("div");
controls.style="display:none;position:fixed;top:0;bottom:0;right:0;left:0;margin:auto;width:80%;height:80%;background:powderblue;z-index:999;";
controls.id="controls";
document.body.appendChild(controls);

var showBtn = document.createElement("button");
showBtn.style="position:fixed;bottom:0;right:0;opacity:0.3;z-index:99;background:blue;color:white;display:none;text-decoration:none;font-size:30px;padding:5px;border-radius:10px;";
showBtn.innerHTML = "show";
showBtn.id = "showBtn";
showBtn.addEventListener("click",function(){if (sh == 1) {document.getElementById("controls").style.display="block"; sh=2} else if (sh == 2) {document.getElementById("controls").style.display="none"; sh=1}});
document.body.appendChild(showBtn);

var hash = window.location.hash.split("#")[1];

if (hash) {
  getVideo(hash);
}

onhashchange = function() {
  getVideo(window.location.hash.split("#")[1]);
}

function hidePlayer() {
document.getElementById("controls").style.display="none";
sh = 1;
}
