var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('localhost:3000/Profile');  

var button = driver.findElement(By.css('button'));

button.click(); 