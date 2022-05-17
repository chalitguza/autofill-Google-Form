'use strict';
const prompt = require('prompt-sync')({sigint: true});
const sleep = require('./sleep.js');
const CF=require('./textcolor.js');
const { bold, green,bgRed,yellow, blue } = require('kleur');

module.exports = async function Login(page) {

var countn = 0;
console.clear();
CF('Autofill|GoogleForm','block','center')
const counter = prompt(bold().yellow().bgBlue().italic(('Please specify the number of times: ')));
console.log(bold().white().bgGreen().italic('Start...'));
await sleep(2)
console.clear();
while(true){
  console.clear();

let listAll = `(//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])`
let listAll_ = (await page.$x(listAll)).length
console.log(listAll_,' List')

//Randomnumber
function getRandom(min,max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
///


for (let i = 1; i <= listAll_; i++) {

    let options = `((//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])[${i}])/div//label`
    let OOP = (await page.$x(options)).length
    
    var options_ = OOP
    
    //sssssss ((//div[contains(@role, "listitem")])[2]//div[contains(@jscontroller, "")]//div[contains(@role, "radiogroup")]/span[contains(@aria-checked, "")])[1]/div/div
  ///Check if there are others, delete 1.//////
    try{
        let [O1] = await page.$x(`(((//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])[${i}])/div//label)[${options_}]`)
        let O2 = await O1.getProperty('textContent');
        var others = await O2.jsonValue();
        if (others == 'อื่นๆ:'){
          options_ = options_ - 1
        
        }
    }catch(error) {
        console.log('+++++++');
       }
  
  
    console.log(`No.${i} =`,options_,' Options')
 
  ////////////////////////////////////////
    
    let choiceRandom = getRandom(1,options_)
    var choice =`(((//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])[${i}])/div//label)[${choiceRandom}]`

    var choice2 =`(((//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])[${i}])/div/div//div[contains(@role, "listitem")])[1]`
    
    var element


    try{
      let [DD1] = await page.$x(choice2)
      let DD2 = await DD1.getProperty('textContent');
      await DD2.jsonValue();

      var listnum = [];

      for (let Z = 1; Z <= choiceRandom; Z++) {

        while(true){

          let R = getRandom(1,options_)

          if(listnum.includes(R) == false){
            listnum.push(R)
            break
          }

        }
        continue
      }

      for(let T = 0; T < choiceRandom; T++){
        element = await page.$x(`(((//div[contains(@role, "listitem")]/div[contains(@jsmodel, '') and contains(@data-params, '%')])[${i}])/div/div//div[contains(@role, "listitem")])[${listnum[T]}]`);
        await element[0].click();
      }
      //
      
      }catch(error) {
        
        try{
          let [C1] = await page.$x(choice)
          let C2 = await C1.getProperty('textContent');
          await C2.jsonValue();
         
  
           //---Click Button Overview---////
          element = await page.$x(choice);
          await element[0].click();
      
          }catch(error) {
            console.log('______________');
        }

    }
    


}
                            ///--////

  try{

  let listAll2 = `(//div[contains(@role, "listitem")])/div[contains(@data-params, "%")]`
  let listAll2_ = (await page.$x(listAll2)).length


  


  for (var i = 1; i <= listAll2_; i++) {
  
      let listAll3 = `(((//div[contains(@role, "listitem")])/div[contains(@data-params, "%")])[${i}]//div[contains(@jscontroller, "")]//div[contains(@role, "radiogroup")])`
      let listAll3_ = (await page.$x(listAll3)).length

          for (var j = 1; j <= listAll3_; j++) {


            //radio button random
            let subAll = `(((//div[contains(@role, "listitem")])/div[contains(@data-params, "%")])[${i}]//div[contains(@jscontroller, "")]//div[contains(@role, "radiogroup")])[${j}]/span[contains(@aria-checked, "")]/div/div`
            let subAll_ = (await page.$x(subAll)).length
            let subrandom = getRandom(1,subAll_)

          
          element = await page.$x(`((((//div[contains(@role, "listitem")])/div[contains(@data-params, "%")])[${i}]//div[contains(@jscontroller, "")]//div[contains(@role, "radiogroup")])[${j}]/span[contains(@aria-checked, "")]/div/div)[${subrandom}]`);
          await element[0].click();
          

        }


      }
    
    }catch(error) {
      console.log('...');
    }
      // try{
      //   let [next] = await page.$x(`//span[contains('jsslot', "")]/span[contains(text(),'ถัดไป')]`)
      //   let next2 = await next.getProperty('textContent');
      //   await next2.jsonValue();
        


      //   await next[0].click();
      //   await sleep(3)
    
      //   }catch(error) {
      //     console.log('Error1');
          
      // }
      

      
  await sleep(1)

  try{
  element = await page.$x(`//span[contains('jsslot', "")]/span[contains(text(),'ถัดไป')]`);
  await element[0].click();
  await sleep(1)
  
  }catch(error) {
   await sleep(1)
  element = await page.$x(`//span[contains('jsslot', "")]/span[contains(text(),'ส่ง')]`);
  await element[0].click();
  countn = countn + 1
  console.clear();
  //console.log(bold().cyan().bgBlue().italic(`------------------Send...${countn} times-----------------------`));

  CF(`Send: ${countn}`,'block','left')
    
  await sleep(2)

    try{
      await page.reload();
      if(countn == counter){
        break
      }
      }catch(error) {
        await sleep(3)
        await page.reload();
        if(countn == counter){
          break
        }
      }
  }




}};