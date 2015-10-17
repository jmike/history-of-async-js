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
Promise.props({
  a: say('Hello'),
  b: say('mr.'),
  c: say('developer')
})
  .then(function (props) {
    console.log(props.b + ' ' + props.c + ', ' + props.a);
  })
  .catch(function (err) {
    console.error(err);
  })
  .finally(function () {
    console.timeEnd('timer');
  })
