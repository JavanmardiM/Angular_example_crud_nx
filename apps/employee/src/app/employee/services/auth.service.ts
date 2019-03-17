export class AuthService{
  loggedIn = false;

  isAuthenticate(){
    const promise = new Promise(
        (resolve, reject) =>{
          setTimeout(()=>{
            resolve(this.loggedIn)
          },100)
        }
    );
    return promise;
  }

  login(usernasme  :string , password : string){
    if(usernasme === '1' && password === '1'){
      this.loggedIn = true;
    }

  }
  logout(){
    this.loggedIn = false;
  }
}
