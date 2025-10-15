import { Component, inject, input } from '@angular/core';
import { GroupT } from '../../interfaces/group-type';
import { RouterModule } from '@angular/router';
import { GroupService } from '../../services/group-service';
import Swal from 'sweetalert2';

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
  openDeleteModal(){
      Swal.fire({
        title: "Desea eliminar el grupo?",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Cancelar",
        denyButtonText: `Eliminar`
      }).then((result) => {
        if (result.isDenied) {
          this.groupService.deleteGroup(this.group().id);
        }
      });
  }
}
