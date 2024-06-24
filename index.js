if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //Service Worker(sw.js)が登録できたら特に何もしない。
      }, function(err) {
        //Service Worker(sw.js)の登録が失敗した場合はブラウザにログを出す。
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // インストールプロンプトを抑制し、後で表示できるように保存
    e.preventDefault();
    deferredPrompt = e;
    // インストールボタンを表示する
    const installButton = document.createElement('button');
    installButton.innerText = 'Install PWA';
    document.body.appendChild(installButton);
  
    installButton.addEventListener('click', () => {
      // プロンプトを表示する
      deferredPrompt.prompt();
      // ユーザーが選択した結果を処理する
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });
  