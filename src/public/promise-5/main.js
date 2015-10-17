function say(q) {
  var resolver = function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/mirror?q=' + q, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(this.responseText);
        } else {
          reject(new Error('Unspecified error occured'));
        }
      }
    };
    xhr.send();
  };

  return new Promise(resolver);
}

console.time('timer');
Promise.race([
  say('Mitsos'),
  say('Kitsos'),
  say('Koula')
])
  .then(function (winner) {
    console.log(winner + ' wins!');
  })
  .catch(function (err) {
    console.error(err);
  })
  .finally(function () {
    console.timeEnd('timer');
  })
