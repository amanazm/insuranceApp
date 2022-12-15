const Employee = require("../model/Employee")


const addEmployee = async(req,res) =>{
    try {
        const {age,dependents,house,income,marital_status,risk_questions,vehicle }=req.body
        const result = await Employee.create({
            age:age,
            dependents:dependents,
            house:house,
            income:income,
            marital_status:marital_status,
            risk_questions:risk_questions,
            vehicle:vehicle
        })

        res.status(201).json({result});
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
        
    }
}

const getInsurance = async(req,res) =>{
    try {
        const {age,dependents,house,income,marital_status,risk_questions,vehicle }=req.body
        const result = {disability : "", life : "", auto: "", home: ""}
        let length = risk_questions.length;
        let life_score=0 , disability_score =0,auto_score =0, home_score=0;
        let sum=0
        for(let i=0; i<3; i++){
            sum= sum+ risk_questions[i];
        }
        life_score =sum;
        disability_score=sum;
        auto_score=sum;
        home_score =sum;
        console.log(sum)
        
        
        if(age <30){
            life_score = life_score-2;
            disability_score = disability_score-2;
            auto_score = auto_score-2;
            home_score = home_score-2;
        }
        if((age> 30 && age <40) || income > 2000000){
            life_score = life_score-1;
            disability_score=disability_score-1;
            auto_score=auto_score-1;
            home_score=home_score-1;
        }
        if(marital_status == "married"){
            life_score =life_score+1;
            disability_score =disability_score-1;
        }
        if(house.ownership_status == "mortgaged"){
            disability_score =disability_score+1;
            life_score=life_score+1;
        }

        if(dependents != 0){
            disability_score=disability_score+1;
            life_score=life_score+1;
        }
        if(age > 60){
            result.disability = "ineligible";
            result.life= "ineligible"
        }else{
            if(life_score <= 0 ){
                result.life = "economic"
            }
            if(life_score == 1 || life_score == 2){
                result.life= "regular"
            }
            if(life_score >= 3){
                result.life= "responsible"
            }
            if(income == 0){
                result.disability = "ineligible"
            }else{
                if(disability_score <= 0 ){
                    result.disability = "economic"
                }
                if(disability_score == 1 || disability_score == 2){
                    result.disability= "regular"
                }
                if(disability_score >= 3){
                    result.disability= "responsible"
                }
            }
        }

        

        if(auto_score <= 0 ){
            result.auto = "economic"
        }
        if(auto_score == 1 || auto_score == 2){
            result.auto= "regular"
        }
        if(auto_score >= 3){
            result.auto= "responsible"
        }

        if(home_score <= 0 ){
            result.home = "economic"
        }
        if(home_score == 1 || home_score == 2){
            result.home= "regular"
        }
        if(home_score >= 3){
            result.home= "responsible"
        }

        res.status(201).json({result});
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
        
    }
}


module.exports = {
    addEmployee,
    getInsurance
}