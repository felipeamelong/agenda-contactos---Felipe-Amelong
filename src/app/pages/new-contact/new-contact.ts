import { Component, inject } from '@angular/core';
import { NewContactT } from '../../interfaces/contact-type';
import { ContactService } from '../../services/contact-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-contact',
  imports: [FormsModule],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewContact {
  contactService = inject(ContactService);
  router = inject(Router);
  
  createContact(form:any){
    const nuevoContacto: NewContactT ={
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavorite: form.isFavorite
    }

    this.contactService.createContact(nuevoContacto)
    this.router.navigate(["/"])
  }
}
