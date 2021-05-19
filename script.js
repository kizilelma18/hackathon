/*const form = document.getElementById('myForm');
const ul = document.getElementById('list');
         

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const search = document.getElementById('search').value;
      const original = search.split(' ').join('');
      document.getElementById('result').innerHTML = '';
      
      fetch(`https://api.github.com/users/${original}`)
      .then(response=>response.json())
      .then(data=>

        {
           console.log(data);
            document.getElementById('result').innerHTML=`
         <a target= '_blank' href = 'https://github.com/${original}'>   <img src='${data.avatar_url}'/>
         </a>`
         return fetch(`https://api.github.com/users/${original}/repos`)
        
         
        })
        .then(data=> data.json())
       
        .then(data=>{
         console.log(data);
         if(data.length<1){
            throw new Error('repositories no found');
            }else{
               const userData = [data][0];
            console.log(userData[1].name);
            
       
              for(let i= 0; i<userData.length; i++){
               const li = document.createElement('li');
                  li.innerHTML= userData[i].name;
                  ul.append(li);
              }
            }
           }
            
        
        ).catch(err=>console.log(err));
       
    
        
})
*/
const form = document.getElementById('myForm');
const URL_BASE = 'https://api.github.com';
const reps = document.getElementById('reps');


form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const URL_BASE = 'https://api.github.com';
  
   const search = document.getElementById('search').value;
   const original = search.split(' ').join('');

   //function to get the User Data
   async function getUserdata(){
      
   
   console.log(original);
     await fetch(`${URL_BASE}/users/${original}`,{method:'GET'})
     .then(response=>response.json())
     .then(data=>{
      console.log(`https://github.com/${data.login}?tab=followers`);
      
      //displaying the user's profile
      const un = document.getElementById('un')
      un.innerHTML = data.login;

      const img = document.getElementById('userimg');
      img.src = data.avatar_url;
     
      //displaying the user's profile
      const bigDiv = document.getElementById('bigdiv');
      bigDiv.innerHTML = ` <h5 id='user'>${data.name}</h5>
                           <h6 id='user1'></h6>
      <div class='user_infos'>

            <div class='user_infoDetail'>
               <i class='fa fa-map-marker pr-1'></i>
               <span>${data.location}</span>
            </div>

            <div class='user_infoDetail'>
               <i class='fa fa-globe pr-1'></i>
               <span>${data.blog}</span>
            </div>

            <div class='user_infoDetail'>
               <i class='fa fa-envelope pr-1'></i>
               <span>${data.email}</span>
            </div>

            <div class='user_infoDetail'>
               <i class='fa fa-twitter pr-1'></i>
               <span>${data.email}</span>
            </div>

            <div class='user_infoDetail'>
             <a class='prof' href="https://github.com/${data.login}?tab=followers" > <i class='fa fa-group pr-1'></i>
               <span>${data.followers} followers</span></a>
            </div>

            <div class='user_infoDetail'>
             <a class='prof' href="https://github.com/${data.login}?tab=following"> <i class='fa fa-heart pr-1'></i>
               <span>${data.following} following</span></a>
            </div>

      </div>`
      return fetch(`${URL_BASE}/users/${original}/repos`)

   })
      .then(data=>data.json())
      .then(data=>{

      if(data.length<1){
         const nullOwner = document.getElementById('user');

         throw new Error('repositories no found');
       } else {

       
      const userData = [data][0];
      const ul = document.getElementById('nav');
      ul.innerHTML = ` <li class="nav-item">
      <p class='nav-link mb-0 active'>Repositories ${userData.length}

      </p>
      </li>
 <li class="nav-item">
     <a 
     target="_blank"
     rel="noopener noreferrer"
     href='https://github.com/${userData[0].owner.login}?tab=packages' class='nav-link mb-0 ' href="#">Packages
         
     </a>
 </li>
 <li class="nav-item">
     <a 
     class='nav-link mb-0 ' 
     target="_blank"
     rel="noopener noreferrer" 
     href='https://github.com/orgs/${userData[0].owner.login}/people'>People
     
     </a>
</li>
<li class="nav-item">
     <a 
     class='nav-link mb-0 ' 
     target="_blank"
     rel="noopener noreferrer" href="https://github.com/${userData[0].owner.login}?tab=projects">Projects
 
     </a>
</li>
`
      
      for(i in userData){
         //displaying the repositories of a user.
          const anoDiv = document.createElement('div');
          anoDiv.setAttribute('class','repo')
          
           anoDiv.innerHTML = ` 
           <div>

              <div class='title'>
                 <i class='fa fa-book pr-1'></i>
                 <a target ='blank' rel='noreffer noopener' href='https://github.com/${userData[i].full_name}' class=""><span>${userData[i].name}</span></a>
              </div>
                <span class='description'>${userData[i].description}</span>
             </div>
           <div class='d-flex'>

            <div class='sub-item'>
                <i class='fa fa-code pr-1'></i>
                <span>${userData[i].language}</span>
            </div>

            <div class='sub-item'>
                <i class='fa fa-star pr-1'></i>
                <span>${userData[i].stargazers_count}</span>
            </div>

            <div class='sub-item'>
                <i class='fa fa-code-fork pr-1'></i>
                <span>${userData[i].forks_count}</span>
            </div>
      </div>
       `
       reps.append(anoDiv);
      }
   }
   }).catch(err=>{
      console.log(err);
      const errorElement = document.getElementById('user1');
      console.log(errorElement)
      errorElement.style.opacity = 100;
      errorElement.innerHTML = `${err} for this user`
   });
   
     
     
}
      
getUserdata();  
})



