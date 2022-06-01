const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require("chromedriver");
const userId = require('../form_resource/form.json');
const data = userId["userId"];

describe('Login and Add Resource', function() {
  this.timeout(1200000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
    
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Login and add supervisor', async function() {
    await driver.get("https://wrmstormhotfixscs.azurewebsites.net/default.aspx")
    await driver.manage().window().setRect({ width: 1320, height: 760 })
    // Login Page
    await driver.findElement(By.id("AdvanceSearch_ASPxButton1_CD")).click()
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("nakorn_ton@hotmail.com.wrmsoftware.com")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("Multitenant01@")
    await driver.findElement(By.id("btn_VendorLogin")).click()

    // Access Page
    await driver.findElement(By.xpath("(//table[@class='dxeButtonEditSys dxeButtonEdit_DevEx']//td)[2]")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("(//td[@class='dxgv']//td)[3]")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("(//img[@alt='v'])[2]")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//td[@id='ASPxPanel2_ContentPlaceHolder1_gluEvents_DDD_gv_tccell6_0']//td[1]")).click()
    await driver.sleep(5000)
  
    
    // Go to Resources Page
    await driver.findElement(By.id("TopPanel_ASPxMenu1_DXI2_P")).click()
    await driver.sleep(3000)
    await driver.findElement(By.linkText("Resource")).click()
    await driver.sleep(3000)
    // await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_btnAdd_CD")).click()
    // await driver.sleep(3000)

    for(let i = 0; i < data.length; i++) {
        // Random discipline
        let disc = Math.floor(Math.random() * 8).toString();

        // Random company
        let Company = Math.floor(Math.random() * 4).toString();

        // check discipline
        if (data[0].discipline[disc] === "Damage Assessment") {
            count = 9;
          } else if (data[0].discipline[disc] === "Distribution Line") {
            count = 35;
          } else if (data[0].discipline[disc] === "Substation") {
            count = 21;
          } else if (data[0].discipline[disc] === "Support") {
            count = 18;
          } else if (data[0].discipline[disc] === "Transmission Line") {
            count = 33;
          } else if (data[0].discipline[disc] === "UAS") {
            count = 2;
          } else if (data[0].discipline[disc] === "UG Network") {
            count = 13;            
          } else if (data[0].discipline[disc] === "Vegetation Management") {
            count = 27;
          }
          const classification = Math.floor(Math.random() * count).toString();
        // console.log(data[0].discipline[disc])
        // console.log(classification)
        
        // Add Resource
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_btnAdd_CD")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_usr_first_name_ASPxTextBox_I")).click()
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_usr_first_name_ASPxTextBox_I")).sendKeys(data[i].firstName)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_usr_last_name_ASPxTextBox_I")).click()
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_usr_last_name_ASPxTextBox_I")).sendKeys(data[i].lastName)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ddeOperatingCompanies_B-1")).click()
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ddeOperatingCompanies_DDD_ltbOperatingCompanies_0_LBI"+Company+"T1")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ddeOperatingCompanies_B-1")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnDiscipline_discipline_id_ASPxComboBox_B-1")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnDiscipline_discipline_id_ASPxComboBox_I")).sendKeys(data[i].discipline[disc])
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnDiscipline_discipline_id_ASPxComboBox_I")).click()
        // await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnDiscipline_discipline_id_ASPxComboBox_B-1")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnClassificationCombobox_usr_classification_id_ASPxComboBox_B-1")).click()
        await driver.sleep(5000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_cpnClassificationCombobox_usr_classification_id_ASPxComboBox_DDD_L_LBI"+classification+"T0")).click()
        await driver.sleep(3000)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ST_user_AddButton_CD")).click()
        await driver.sleep(5000)

        // Check Notifications
        try {
            const noti = await driver.findElement(By.id("TopPanel_notifyDiv_Content")).getText()
            assert.strictEqual(noti,'Resource has been added successfully.')
            console.log("This notification is pass")
        } catch(error) {
            console.log("Error: 555 ", error)
        }
        
        //Search
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_TABManageDiscipline_tbDisciplineTab_AT"+disc+"T")).click();
        await driver.sleep(5000)
        
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ST_user_txtSearch_I")).click();
        await driver.sleep(2000)     
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_ST_user_txtSearch_I")).sendKeys(data[i].firstName)
        await driver.findElement(By.id("ASPxPanel2_ContentPlaceHolder1_Search_ASPxButton_CD")).click()
        await driver.sleep(5000)
    }
    
    

    })
})