var url = 'https://test.graceland.melabs.io/';
var omnibarSignIn = '.desktop .signin';
var overlay = '.blockOverlay';
var bbLogIn = '.bb_logo_container';
var bbEmailField ='SignIn_Email';
var bbEmail = 'matt.vaccaro@blackbaud.com';
var bbPwdField = 'SignIn_Password';
var bbPwd = 'M@ttV@232';
var bbSignIn = '#signin_button';
var home = '/html/body/div[1]/div[2]/div/nav/div/ul[1]/li[1]/a';
var applications = '[ui-sref="home.main.applications"]';
var requirements = '[ui-sref="home.main.requirements"]';
var progressUpdates = '.bb-tile-content-section';
var progressUpdateLink = 'anchor-1137-5376';
var inProgAppsGrid = 'applications-inprogress-bbgrid';
var inProgAppLink = 'anchor-21980';
var completedApps = 'applications-completed-tab';
var completedAppsGrid = 'applications-copmleted-bbgrid';
var completedAppLink = 'anchor-21975';
var newReqsGrid = 'requirements-new-bbgrid';
var newReqLink = 'anchor-21978';
var inProgReqs = 'requirements-inprogress-tab';
var inProgReqsGrid = 'requirements-inprogress-bbgrid';
var inProgReqLink = 'anchor-21977';
var completedReqs = 'requirements-active-tab';
var completedReqsGrid = 'requirements-complete-bbgrid';
var completedReqLink = 'anchor-21984';

beforeEach(function () {
    // this test uses webdriver directly where necessary because it goes to a non-angular app
    // which protractors wrapper can't deal with well
    browser.get(url);
    browser.driver.manage().window().maximize();
    element(by.css(omnibarSignIn)).click();

    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        browser.driver.findElement(by.css(bbLogIn)).click();      
    });

    browser.wait(function () {
        return browser.driver.isElementPresent(by.id(bbEmailField));
    })
    .then(function () {
        browser.driver.findElement(by.id(bbEmailField)).sendKeys(bbEmail);
        expect(browser.driver.findElement(by.id(bbEmailField)).getAttribute('value')).toBe(bbEmail);
        browser.wait(function () {
        return browser.driver.isElementPresent(by.id(bbPwdField));
        })
        .then(function() {
            browser.driver.findElement(by.id(bbPwdField)).sendKeys(bbPwd);
            expect(browser.driver.findElement(by.id(bbPwdField)).getAttribute('value')).toBe(bbPwd);
            browser.driver.findElement(by.css(bbSignIn)).click();
        });
        browser.wait(function(){
            return browser.driver.isElementPresent(by.css(applications));     
        });
    });
});

it('should navigate throughout the Graceland hub hitting each subcategory of Apps and Reqs', function(){
    browser.driver.sleep(1000);
    expect(element(by.className(progressUpdates)).isPresent()).toBeTruthy();
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    
    //clicks apps then waits for in progress apps to populate
    element(by.css(applications)).click();
    expect(element(by.id(inProgAppsGrid)).isDisplayed()).toBeTruthy();
    
    //clicks completed apps then waits for them to populate
    element(by.id(completedApps)).click()
    expect(element(by.id(completedAppsGrid)).isDisplayed()).toBeTruthy();
    
    //clicks requirements and waits for new requirements to populate
    element(by.css(requirements)).click();
    expect(element(by.id(newReqsGrid)).isDisplayed()).toBeTruthy();
    
    //clicks in progress requirements and waits for them to populate
    element(by.id(inProgReqs)).click();
    expect(element(by.id(inProgReqsGrid)).isDisplayed()).toBeTruthy();
    
    //clicks completed requirements and waits for them to populate
    element(by.id(completedReqs)).click();
    expect(element(by.id(completedReqsGrid)).isDisplayed()).toBeTruthy();
    
});

it('should select a progress update and navigate/enter text into fields and save the values', function() {
    expect(element(by.id(progressUpdates)).isPresent()).toBeTruthy();
    expect(element(by.id(progressUpdateLink)).isPresent()).toBeTruthy();
    browser.driver.sleep(1000);
    element(by.id(progressUpdateLink)).click();
    expect(element(by.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/bb-page/section[1]/div/div/div/section[2]/div/div[2]/div[1]/div/button[1]')).isPresent()).toBeTruthy();
    element(by.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/bb-page/section[1]/div/div/div/section[2]/div/div[2]/div[1]/div/button[1]')).click();
    browser.wait(function(){
        return browser.driver.isElementPresent(by.css('.modal-content'));
    },1100)
    .then(function(){
        expect(element(by.id('value-input-0')).isPresent()).toBeTruthy();  
        element(by.id('value-input-0')).clear();
        element(by.id('value-input-0')).sendKeys('15');
        element(by.id('value-input-1')).clear();
        element(by.id('value-input-1')).sendKeys('4');
        element(by.id('sample-size-input-1')).clear();
        element(by.id('sample-size-input-1')).sendKeys('500');
        expect(element(by.xpath('/html/body/div[4]/div/div/div/div/div[3]/button[2]/span')).isPresent()).toBeTruthy();
        element(by.xpath('/html/body/div[4]/div/div/div/div/div[3]/button[2]/span')).click(); 
    });
    browser.driver.sleep(1000);
    element(by.xpath(home)).click();
    browser.driver.sleep(1000);
    expect(element(by.css(progressUpdates)).isDisplayed()).toBeTruthy();
    browser.driver.sleep(1000);
    expect(element(by.id(progressUpdateLink)).isDisplayed()).toBeTruthy();
});

it('should select an in progress application and navigate through the IGAM app, save/close, return to GL', function(){
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    element(by.css(applications)).click();
    expect(element(by.id(inProgAppsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(inProgAppLink)).isDisplayed()).toBeTruthy();
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        element(by.id(inProgAppLink)).click();     
    });
    
    
    browser.wait(function() {
        return browser.driver.isElementPresent(by.id('Q1'));
    }, 1100)
    .then(function(){
        browser.driver.findElement(by.id('Q1')).clear();
        browser.driver.findElement(by.id('Q1')).sendKeys('Automation');
    });
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent){
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        browser.driver.findElement(by.xpath('//*[@id="ContentFrame"]/table/tbody/tr[2]/td/input[2]')).click();      
    });
    
    
    browser.wait(function(){
        browser.driver.sleep(1000);
        return browser.driver.isElementPresent(by.id('outcomes-button'));
    }, 1100)
    .then(function(){
        browser.driver.sleep(1000);
        browser.driver.findElement(by.id('outcomes-button')).click();
        //works until this point
        browser.driver.sleep(3000);
    });
    browser.wait(function(){
        return browser.driver.isElementPresent(by.id('iframe'));
    }, 1100)
    .then(function(){
        browser.driver.switchTo().frame('iframe');
        browser.driver.isElementPresent(by.css('input.ng-valid-date'));
        browser.driver.findElement(by.css('input.ng-valid-date')).clear();
        browser.driver.findElement(by.css('input.ng-valid-date')).sendKeys('01/01/2016');
        browser.driver.findElement(by.id('measurableOutcome')).click();
    });
    browser.wait(function(){
        return browser.driver.isElementPresent(by.xpath('//*[@id="measurableOutcome"]'));
    })
    .then(function(){
        browser.driver.sleep(1000);
        browser.driver.findElement(by.id('measurableOutcome')).click();
        browser.driver.findElement(by.xpath('/html/body/div[1]/div/div/div/bb-page/section[1]/div/div/ng-form/div/section[2]/div/div[2]/div/div[2]/ng-form[2]/div[1]/input')).clear();
        browser.driver.findElement(by.xpath('/html/body/div[1]/div/div/div/bb-page/section[1]/div/div/ng-form/div/section[2]/div/div[2]/div/div[2]/ng-form[2]/div[1]/input')).sendKeys('100');
        browser.driver.sleep(1000);
        browser.driver.switchTo().defaultContent();
        browser.driver.findElement(by.id('save-button')).click();
        browser.driver.sleep(1000);
        browser.driver.isElementPresent(by.xpath('//*[@id="Form"]/form/table/tbody/tr[2]/td/input[1]'));
        browser.driver.findElement(by.xpath('//*[@id="Form"]/form/table/tbody/tr[2]/td/input[1]')).click();
    });
    browser.driver.sleep(1000);
    expect(element(by.css(applications)).isDisplayed()).toBeTruthy();
    expect(element(by.id(inProgAppsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(inProgAppLink)).isDisplayed()).toBeTruthy();
});

it('should select a completed application and return to GL', function(){
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    element(by.css(applications)).click();
    element(by.id(completedApps)).click();
    expect(element(by.id(completedAppsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(completedAppLink)).isDisplayed()).toBeTruthy();
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        element(by.id(completedAppLink)).click();     
        browser.getAllWindowHandles().then(function(handles){
            browser.driver.switchTo().window(handles[1]);
            browser.driver.sleep(1000);
            browser.driver.close();
            browser.driver.switchTo().window(handles[0]);
        });
    });
});

/*
it('should select a new requirement and navigate through the IGAM app, save/close, return to GL', function(){
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    element(by.css(requirements)).click();
    expect(element(by.id(newReqsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(newReqLink)).isDisplayed()).toBeTruthy();
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        element(by.id(newReqLink)).click();     
    });
    browser.wait(function() {
        return browser.driver.isElementPresent(by.id('Q1'));
    })
    .then(function(){
        browser.driver.findElement(by.id('Q1')).sendkeys('Test Org');
        browser.driver.findElement(by.css('save&close')).click();
    });
});

it('should select an in progress requirement and navigate through the IGAM app, save/close, return to GL', function(){
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    element(by.css(requirements)).click();
    expect(element(by.id(inProgReqsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(inProgReqLink)).isDisplayed()).toBeTruthy();
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        element(by.id(inProgReqLink)).click();     
    });
    browser.wait(function() {
        return browser.driver.isElementPresent(by.id('Q1'));
    })
    .then(function(){
        browser.driver.findElement(by.id('Q1')).sendkeys('Test Org');
        browser.driver.findElement(by.css('save&close')).click();
    });
});
*/

it('should select a completed requirement and return to GL', function(){
    expect(element(by.css(applications)).isPresent()).toBeTruthy();
    element(by.css(requirements)).click();
    expect(element(by.id(completedReqsGrid)).isDisplayed()).toBeTruthy();
    expect(element(by.id(completedReqLink)).isDisplayed()).toBeTruthy();
    browser.wait(function () {
        return browser.driver.isElementPresent(by.css(overlay))
        .then(function (isPresent) {
            return !isPresent;
        });
    }, 1100)
    .then(function () {
        element(by.id(completedReqLink)).click();     
        browser.getAllWindowHandles().then(function(handles){
            browser.driver.switchTo().window(handles[1]);
            browser.driver.sleep(1000);
            browser.driver.close();
            browser.driver.switchTo().window(handles[0]);
        });
    });
});
