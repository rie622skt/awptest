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
  
  //バナーの代わりに表示するボタンを登録する
registerInstallAppEvent(document.getElementById("InstallBtn"));

//バナー表示をキャンセルし、代わりに表示するDOM要素を登録する関数
//引数１：イベントを登録するHTMLElement
function registerInstallAppEvent(elem){
  //インストールバナー表示条件満足時のイベントを乗っ取る
  window.addEventListener('beforeinstallprompt', function(event){
    console.log("beforeinstallprompt: ", event);
    event.preventDefault(); //バナー表示をキャンセル
    elem.promptEvent = event; //eventを保持しておく
    elem.style.display = "block"; //要素を表示する
    return false;
  });
  //インストールダイアログの表示処理
  function installApp() {
    if(elem.promptEvent){
      elem.promptEvent.prompt(); //ダイアログ表示
      elem.promptEvent.userChoice.then(function(choice){
        elem.style.display = "none";
        elem.promptEvent = null; //一度しか使えないため後始末
      });//end then
    }
  }//end installApp
  //ダイアログ表示を行うイベントを追加
  elem.addEventListener("click", installApp);
}//end registerInstallAppEvent