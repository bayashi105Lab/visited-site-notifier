// スタイルを適用する関数
function injectCSS() {
    const style = document.createElement("style");
    style.textContent = `
      #visited-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      }
  
      .modal-content {
        background: white;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
        width: 250px;  /* モーダルの幅を小さく */
        height: auto;  /* 高さは内容に応じて調整 */
      }
  
      .modal-content p {
        font-size: 14px;  /* 文字サイズを少し小さく */
        margin-bottom: 10px;
      }
  
      #close-modal {
        margin-top: 5px;
        padding: 4px 12px;
        font-size: 12px;
        border: none;
        background: #007bff;
        color: white;
        cursor: pointer;
        border-radius: 5px;
      }
  
      #close-modal:hover {
        background: #0056b3;
      }
    `;
    document.head.appendChild(style);
  }
  
  // モーダルを表示する関数
  function showVisitedModal() {
    injectCSS(); // CSSを適用
  
    const modal = document.createElement("div");
    modal.id = "visited-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <p>このサイトは訪問済みです！</p>
        <button id="close-modal">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
  
    // 閉じるボタンの動作
    document.getElementById("close-modal").addEventListener("click", () => {
      modal.remove();
    });
  }
  
  // 現在のページのURLを取得
  const currentUrl = window.location.href;
  
  // 履歴をチェック
  chrome.runtime.sendMessage({ action: "checkHistory", url: currentUrl }, (response) => {
    if (response.visited) {
      showVisitedModal();
    }
  });
  