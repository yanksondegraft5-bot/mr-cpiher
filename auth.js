// Simple demo auth using localStorage
function getUsers(){
  try{ return JSON.parse(localStorage.getItem('cdh_users')||'[]'); }catch(e){return[]}
}
function saveUsers(users){ localStorage.setItem('cdh_users', JSON.stringify(users)); }
function registerUser(name,email,password){
  const users=getUsers();
  if(users.find(u=>u.email===email)) return {ok:false, msg:'Email already registered'};
  users.push({name,email,password});
  saveUsers(users);
  localStorage.setItem('cdh_current', JSON.stringify({name,email}));
  return {ok:true};
}
function loginUser(email,password){
  const users=getUsers();
  const u=users.find(x=>x.email===email && x.password===password);
  if(!u) return {ok:false, msg:'Invalid credentials'};
  localStorage.setItem('cdh_current', JSON.stringify({name:u.name,email:u.email}));
  return {ok:true};
}
function signOut(){ localStorage.removeItem('cdh_current'); }
function currentUser(){ try{return JSON.parse(localStorage.getItem('cdh_current')||'null')}catch(e){return null} }
