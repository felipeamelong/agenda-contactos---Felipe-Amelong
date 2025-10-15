import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group-service';
import { GroupT, NewGroupT } from '../../interfaces/group-type';

@Component({
  selector: 'app-new-group',
  imports: [FormsModule],
  templateUrl: './new-group.html',
  styleUrl: './new-group.scss'
})
export class NewGroup implements OnInit{
  groupService = inject(GroupService)
  router = inject(Router)
  idGrupo = input<number>();
  grupoOriginal: GroupT|undefined = undefined;
  form = viewChild<NgForm>('newGroupForm');

  async ngOnInit() {
    if (this.idGrupo()){
      this.grupoOriginal = await this.groupService.getGroupsById(this.idGrupo()!);
      this.form()?.setValue({
        name: this.grupoOriginal!.name,
      })
    }
  }

  async handleFormSubmission(form:NgForm){
    const newGroup: NewGroupT = {
      name: form.value.name
    }
    
    if (this.idGrupo()){
      await this.groupService.editGroup({...newGroup, id: this.idGrupo()!.toString()});
    } else {
      await this.groupService.createGroup(newGroup)
    }

    this.router.navigate(["/groups"]);
  }
}
