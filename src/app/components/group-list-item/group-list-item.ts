import { Component, inject, input } from '@angular/core';
import { GroupT } from '../../interfaces/group-type';
import { RouterModule } from '@angular/router';
import { GroupService } from '../../services/group-service';

@Component({
  selector: 'app-group-list-item',
  imports: [RouterModule],
  templateUrl: './group-list-item.html',
  styleUrl: './group-list-item.scss'
})
export class GroupListItem {
  group = input.required<GroupT>()
  groupService = inject(GroupService)
  GroupListItem: any;
}
