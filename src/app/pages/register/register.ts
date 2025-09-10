import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule,FormsModule,Spinner],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
errorRegister=false;
usersService = inject(UserService);
isLoading = false;
router = inject(Router);

  async register(form:any){
    this.errorRegister = false;
    if(!form.value.email || !form.value.password || !form.value.password2 || !form.value.firstName || !form.value.lastName || form.password !== form.password2){
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res = await this.usersService.register(form.value);
    if(res.ok){
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true;
  }
}