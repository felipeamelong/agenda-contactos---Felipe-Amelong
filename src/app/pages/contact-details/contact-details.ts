import { Component, inject, input, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { ContactT } from '../../interfaces/contact-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})
export class ContactDetails implements OnInit {
  contactService = inject(ContactService);
  id = input.required<string>(); 
  contact: ContactT | undefined = undefined;
  async ngOnInit() {
    this.contact = await this.contactService.getContactsById(this.id());
  }
}