chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message:", request);  // 追加: メッセージを受信したか確認
  
    if (request.action === "checkHistory") {
      console.log("Checking history for URL:", request.url);  // 追加: 履歴を検索
  
      chrome.history.search({ text: "", maxResults: 10000 }, (historyItems) => {
        console.log("Fetched history items:", historyItems.length);  // 追加: 取得した履歴の数
  
        const visitedUrls = historyItems.map(item => item.url);
        const isVisited = visitedUrls.includes(request.url);
  
        console.log("URL visited:", isVisited);  // 追加: 訪問済みか確認
        sendResponse({ visited: isVisited });
      });
  
      return true; // 非同期レスポンスを許可
    }
  });
  