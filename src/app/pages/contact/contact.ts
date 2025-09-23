import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactT, NewContactT } from '../../interfaces/contact-type';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { ContactService } from '../../services/contact-service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  ngOnInit(): void {
    this.contactService.getContacts();
  }

  authService = inject(AuthService);
  contactService = inject(ContactService)
}
