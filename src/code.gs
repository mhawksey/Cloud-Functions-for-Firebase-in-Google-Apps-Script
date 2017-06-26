function fetchFromFirebaseFunctions() {
  // DriveApp.getRootFolder() included to make sure the scope is added to the project so that our 
  // token can be passed to the firebase function (this is obsolete as we call DriveApp later in the code)
  DriveApp.getRootFolder(); 
  
  var url = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Clocktower_Panorama_20080622_20mb.jpg";
  var fnUrl = "https://us-central1-cloudfunctionsdemo-2230.cloudfunctions.net/answerTheFetch"; 
  
  var resp = JSON.parse(UrlFetchApp.fetch(fnUrl+"?url="+url+"&token="+ScriptApp.getOAuthToken()+"&filename=image.jpg").getContentText());
  var file_loaction = DriveApp.getFileById(resp.id).getUrl();
  
  Logger.log("The file "+resp.id+" can be viewed at "+file_loaction);
}
