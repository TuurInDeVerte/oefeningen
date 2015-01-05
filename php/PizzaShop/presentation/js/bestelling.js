var winkelmandje = localStorage.getItem("winkelmandje");
winkelmandje = JSON.parse(winkelmandje);
winkelmandje = JSON.stringify(winkelmandje);

console.log(winkelmandje);