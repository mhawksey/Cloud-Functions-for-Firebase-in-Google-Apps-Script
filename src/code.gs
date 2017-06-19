function fetchFromFirebaseFunctions() {
  DriveApp.getRootFolder();
  var url = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Clocktower_Panorama_20080622_20mb.jpg";
  var id = UrlFetchApp.fetch("https://us-central1-cloudfunctionsdemo-2230.cloudfunctions.net/answerTheFetch?url="+url+"&token="+ScriptApp.getOAuthToken()+"&filename=image.jpg").getContentText();
  Logger.log(id);
}
