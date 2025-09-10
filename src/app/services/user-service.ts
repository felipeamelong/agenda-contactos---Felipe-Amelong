import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  async register(registerData:NewUser){
    return await fetch("https://agenda-api.somee.com/api/Users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(registerData)
    });
  }
}
