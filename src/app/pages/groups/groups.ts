import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';
import { GroupService } from '../../services/group-service';
import { GroupListItem } from '../../components/group-list-item/group-list-item';

@Component({
  selector: 'app-groups',
  imports: [RouterModule, GroupListItem],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class Groups {
ngOnInit(): void {
  this.groupService.getGroups();
}

  authService = inject(AuthService);
  groupService = inject(GroupService)
}
