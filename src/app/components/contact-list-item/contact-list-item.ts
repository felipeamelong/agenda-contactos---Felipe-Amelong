import { Component, inject, input } from '@angular/core';
import { ContactT } from '../../interfaces/contact-type';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-contact-list-item',
  imports: [],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact = input.required<ContactT>()
  contactService = inject(ContactService)
}
