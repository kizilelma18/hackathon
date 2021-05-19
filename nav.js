const account = {
    owner: 'zeeshan',

    pin: 4444,
  };

  const button = document.getElementById('button');
  const input = document.getElementById('name');
  const pass = document.getElementById('pass');
  console.log(input,pass)
  button.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log(input.value,pass.value)
      if(input.value === account.owner && account.pin === Number(pass.value)){
          document.location.href = 'main.html'
console.log('welcome');
      }

  })