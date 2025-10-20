import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { ContactT, NewContactT } from '../../interfaces/contact-type';
import { ContactService } from '../../services/contact-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group-service';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewContact implements OnInit{
  contactService = inject(ContactService);
  groupService = inject(GroupService);
  router = inject(Router);
  idContacto = input<number>();
  contactoOriginal: ContactT|undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;

  async ngOnInit() {
    await this.groupService.getGroups();
    if (this.idContacto()){
      this.contactoOriginal = await this.contactService.getContactsById(this.idContacto()!);
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavorite: this.contactoOriginal!.isFavorite,
        groupId: this.contactoOriginal!.groupId || null, 
      })
    }
  }

  async handleFormSubmission(form:NgForm){
    const contactData: NewContactT = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite === true,
      groupId: form.value.groupId
    }

    this.isLoading = true
    
    if (this.idContacto()){
      await this.contactService.editContact({...contactData, id: this.idContacto()!.toString()});
      if (this.contactoOriginal?.isFavorite !== contactData.isFavorite) {
        await this.contactService.setFavourite(this.idContacto()!);
      }

    } else {
      const contactoCreado = await this.contactService.createContact(contactData);
      if (contactData.isFavorite === true) {
        await this.contactService.setFavourite(contactoCreado.id);
      }
    }

    this.router.navigate(["/"]);
  }
}