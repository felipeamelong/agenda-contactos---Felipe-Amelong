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

  async deleteGroup(id: string) {
    const res = await fetch(`https://agenda-api.somee.com/api/groups/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    );
    if (res.ok) {
      this.groups = this.groups.filter(group => group.id !== id)
      return true;
    } else {
      return false;
    }
  }

  async getGroupsById(id: string | number) {
    const res = await fetch(`https://agenda-api.somee.com/api/groups/${id}`,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      }
    )
    const resGroup: GroupT = await res.json();
    return resGroup
  }

  async editGroup(grupoEditado: GroupT) {
    const res = await fetch(`https://agenda-api.somee.com/api/groups/${grupoEditado.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grupoEditado)
      }
    );
    this.groups = this.groups.map(group => {
      if (group.id === grupoEditado.id) {
        return grupoEditado;
      }
      return group
    })
    return grupoEditado;
  }
}
