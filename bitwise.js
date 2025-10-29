const textfield1 = document.getElementById("textfield1");
const textfield2 = document.getElementById("textfield2");
const solution_area = document.getElementById("solution_area");
const bitwise_operator = document.getElementById("bitwise_operator");
const calcBtn = document.getElementById("calcBtn");
const answer_field = document.getElementById("answer_field");

let solution = "", operator;
let exp1_binary, exp2_binary ;
let exp1len, exp2len;

calcBtn.addEventListener("click", ()=>{ //alert("btn clicked");alert(bitwise_operator.value);
  solution = ""
  const exp1 = textfield1.value;
  const exp2 = textfield2.value;
  operator = bitwise_operator.value
  solution += `${exp1} ${operator} ${exp2}<br>`;
  
  switch(bitwise_operator.value){
    case "&": 
    case "|": 
    case "^": 
      let answer = solve(exp1, exp2)
      match_length(exp1, exp2);
      bitwise_and_or_xor();
      solution += `answer: ${answer} or ${decimal_toBinary(answer)}`;
      break;
    case "<<": bitwise_leftshift(exp1, exp2); break;
    case ">>": bitwise_rightshift(exp1, exp2); break;
    case "~": bitwise_revert(exp1); break;
  }
  
  solution_area.innerHTML = solution;
});

function decimal_toBinary(decimal){
  let binaryVal = "", remainder;
  while(decimal > 0){
    remainder = decimal % 2;
    binaryVal = remainder + binaryVal;
    decimal = ( decimal - remainder) / 2;
  }
  // console.log(binaryVal.length);
  return binaryVal;
};
function match_length(exp1, exp2){
  exp1_binary = decimal_toBinary(exp1);
  exp2_binary = decimal_toBinary(exp2);
  
  // console.log(`${exp1_binary} ${operator} ${exp2_binary}`);
  exp1len = exp1_binary.length;
  exp2len = exp2_binary.length;

  if(exp1len > exp2len){
    for(let i = exp1len - exp2len; i-- > 0;)
      exp2_binary = ('0' + exp2_binary);
    exp2len = exp1len;
  }else if(exp1len < exp2len){
    for(let i = exp2len - exp1len; i-- > 0;)
      exp1_binary = ('0' + exp1_binary);
    exp1len = exp2len;
  } 
  solution += ` = ${exp1_binary} ${operator} ${exp2_binary}<br>`;
};
function solve(exp1,exp2){
  let answer ;
  switch(operator){
    case '&': answer = exp1 & exp2; break;
    case '|': answer = exp1 | exp2; break;
    case '^': answer = exp1 ^ exp2; break;
    case "<<": answer = exp1 << exp2; break;
    case ">>": answer = exp1 >> exp2; break;
    case '~': answer = ~exp2; break;
  }
  return answer;
}
function bitwise_and_or_xor(){
  console.log(`${exp1_binary} ${operator} ${exp2_binary}`);
  let final_exp1 = "",final_exp2 = "", final_answer = "";
  let bit_result = 0, bit_color = "green";

  for(let i = 0; i < exp1len; i++){
    if((solve(exp1_binary[i], exp2_binary[i])) == 1){ 
      bit_result = 1; bit_color = "green";
    }else{
      bit_result = 0; bit_color = "red";
    }

    final_exp1 += `<span style=\"color:${bit_color};\">${exp1_binary[i]}</span>`;
    final_exp2 += `<span style=\"color:${bit_color};\">${exp2_binary[i]}</span>`;
    final_answer += `<span style=\"color:green;\">${bit_result}</span>`;
  }
  // alert(exp1_binary)
  solution += `${final_exp1}<br>${final_exp2}<br>= ${final_answer}<br>`
}
