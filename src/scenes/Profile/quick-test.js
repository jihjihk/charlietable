var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('localhost:3000/Profile');  


//driver.quit();

//var submit = driver.findElement(By.css("submit")).click();
driver.sleep(2000).then(function() {
  input.sendKeys('Filling in my form');
  input.getAttribute("value").then(function(value) {
    if(value !== '') {
      console.log('Form input editable');
    }
  });
});
