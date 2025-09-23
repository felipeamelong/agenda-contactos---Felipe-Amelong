import { inject, Injectable } from '@angular/core';
import { ContactT, NewContactT } from '../interfaces/contact-type';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  authService = inject(AuthService);

  contacts: ContactT[] = []

  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: ContactT[] = await res.json()
    this.contacts = resJson;
  }

  getContactsById() { }

  async createContact(nuevoContacto: NewContactT) {
    const contacto: ContactT = {
      ...nuevoContacto,
      id: Math.random().toString()
    }
    await fetch("https://agenda-api.somee.com/api/contacts",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacto)
      }
    )
  }

  editContact() { }

  async deleteContact(id: string) {
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    );
    if (res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
      return true;
    } else {
      return false;
    }
  }

  setFavourite() { }
}
