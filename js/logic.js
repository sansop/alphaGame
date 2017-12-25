var h1 = document.getElementsByTagName('h1')[0],
  seconds = 0,
  minutes = 0,
  t;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

function reset_game() {
  clearTimeout(t);
  h1.textContent = "00:00";
  seconds = 0;
  minutes = 0;
}

function start_game() {
  h1.textContent = "00:00";
  seconds = 0;
  minutes = 0;
  timer();
  var alphs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var sorted = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  alphs.sort(() => Math.random() * 2 - 1);
  if (alphs[25] == 'A') {
    var temp = alphs[0];
    alphs[0] = 'A';
    alphs[25] = temp;
  }
  var grid = document.getElementById('board').innerHTML = "";
  var grid = document.getElementById('board').appendChild(document.createElement('table'));
  grid.id = 'grid';

  var cell = [];

  var index = 0;
  var r;
  var c;
  for (r = 0; r < 5; ++r) {
    var tr = grid.appendChild(document.createElement('tr'));
    for (c = 0; c < 5; ++c) {
      cell[r * 5 + c] = tr.appendChild(document.createElement('td'));
      cell[r * 5 + c].innerHTML = alphs[(r) * 5 + c];
    }
  }
  $("#grid td").click(function() {
    if (index < 25) {
      var column_num = parseInt($(this).index());
      var row_num = parseInt($(this).parent().index());
      if (alphs[row_num * 5 + column_num] == sorted[index]) {
        alphs.splice(row_num * 5 + column_num, 1);
        alphs.sort(() => Math.random() * 2 - 1);
        for (var a = 0; a < 5; ++a) {
          for (var b = 0; b < 5; ++b) {
            cell[a * 5 + b].innerHTML = '';
          }
        }
        for (var r = 0; r < 5; ++r) {
          for (var c = 0; c < 5; ++c) {
            cell[r * 5 + c].innerHTML = '';
            if (alphs[(r) * 5 + c] != undefined)
              cell[r * 5 + c].innerHTML = alphs[(r) * 5 + c];
          }
        }
        index++;
      }
    } else if (index == 25) {
      grid.innerHTML = "<h1>You did it!</br>Share this game with your friends and see if you scored better than them!</h1>";
      clearTimeout(t);
    }
  });

}
