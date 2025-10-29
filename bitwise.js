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
      create_solution()
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
      exp2_binary = '0' + exp2_binary;
    exp2len = exp1len;
  }else if(exp1len < exp2len){
    for(let i = exp2len - exp1len; i-- > 0;)
      exp1_binary = '0' + exp1_binary;
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
function create_solution(){
  console.log(`${exp1_binary} ${operator} ${exp2_binary}`);
  final_exp1 = "",final_exp2 = "", final_answer = "";
  for(let i = 0; i < exp1len; i++){
    if((solve(exp1_binary[i], exp2_binary[i])) == 1){alert("in")
      // alert(`<span color:\"green\">${exp1_binary[i]} </span>`)
      final_exp1 += `<span style=\"color:green;\">${exp1_binary[i]}</span>`;
      final_exp2 += `<span style=\"color:green;\">${exp2_binary[i]}</span>`;
      final_answer += `<span style=\"color:green;\">1</span>`;
    }else{
      final_exp1 += `<span style=\"color:red;\">${exp1_binary[i]}</span>`;
      final_exp2 += `<span style=\"color:red;\">${exp2_binary[i]}</span>`;
      final_answer += `<span style=\"color:green;\">0</span>`;
    }
  }
  // alert(exp1_binary)
  solution += `${final_exp1}<br>${final_exp2}<br>= ${final_answer}<br>`
  
}
function bitwise_and(exp1,exp2){
  let answer = solve(exp1, exp2)
  solution += `${exp1} ${operator} ${exp2}<br>`;
  match_length(exp1, exp2);
  create_solution()
  solution += `answer: ${answer} or ${decimal_toBinary(answer)}`;

  // console.log(decimal_toBinary(exp1));
  // console.log(`${exp1} ${operator} ${exp2}`);
};
function bitwise_or(exp1,exp2){
  let answer = exp1 & exp2;
  solution += `${exp1} ${operator} ${exp2}<br>`;
  match_length(exp1, exp2);
  create_solution()
  solution += `answer: ${answer} or ${decimal_toBinary(answer)}`;
};
function bitwise_xor(exp1,exp2){};
function bitwise_leftshift(exp1,exp2){};
function bitwise_rightshift(exp1,exp2){};
function bitwise_revert(exp1){};


