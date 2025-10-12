import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group-service';
import { NewGroupT } from '../../interfaces/group-type';

@Component({
  selector: 'app-new-group',
  imports: [FormsModule],
  templateUrl: './new-group.html',
  styleUrl: './new-group.scss'
})
export class NewGroup {
  groupService = inject(GroupService)
  router = inject(Router)

  async handleFormSubmission(form:NgForm){
    const newGroup: NewGroupT = {
      name: form.value.name
    }
    
    await this.groupService.createGroup(newGroup)
    
    await this.groupService.getGroups();
    this.router.navigate(["/groups"]);
  }
}
