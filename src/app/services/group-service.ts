import { inject, Injectable } from '@angular/core';
import { GroupT, NewGroupT } from '../interfaces/group-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  authService = inject(AuthService);

  groups: GroupT[] = [];
  
  async getGroups() {
    const res = await fetch("https://agenda-api.somee.com/api/groups",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: GroupT[] = await res.json();
    this.groups = resJson;
  }

  async createGroup(nuevoGrupo: NewGroupT) {
    const grupo: GroupT = {
      ...nuevoGrupo,
      id: Math.random().toString()
    }
    const res = await fetch("https://agenda-api.somee.com/api/groups",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grupo)
      }
    )
    return await res.json()
  }
}
