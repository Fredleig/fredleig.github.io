const ajax = (function () {

  function send(settings) {
    const xhr = new XMLHttpRequest();

    // Ошибка запроса
    xhr.addEventListener('error', function () {
      settings.error({
        errorText: xhr.statusText,
        code: xhr.status,
      });
    });

    // Действие после загрузки запроса
    xhr.addEventListener('load', function () {
      // 200-ые запросы (201, 205...)
      let status = Math.floor(xhr.status / 10);
      if (status === 20) {
        settings.success(xhr.responseText);
      } else {
        settings.error({
          errorText: xhr.statusText,
          code: xhr.status,
        });
      }

    });

    xhr.addEventListener('timeout', function () {
      // какое то действие после таймаута.
    });

    xhr.open(settings.method, settings.url);
    xhr.timeout = settings.time || 3000;

    // Если есть объект-свойство headers - перебрать объект headers (как forEach)
    if(settings.headers) {
      for(let headersName in settings.headers) {
        xhr.setRequestHeader(headersName, settings.headers[headersName]);
      }
    }

    xhr.send(settings.data);

  }

  return {
    send: send
}
})();