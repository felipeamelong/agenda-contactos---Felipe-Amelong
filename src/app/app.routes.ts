import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { ContactDetails } from './pages/contact-details/contact-details';
import { Contact } from './pages/contact/contact';
import { Groups } from './pages/groups/groups';
import { Login } from './pages/login/login'
import { Routes } from '@angular/router';
import { Register } from './pages/register/register';

export const routes: Routes = [
{
    path: "login",
    component: Login
},
{
    path: "register",
    component: Register
},
{
    path: "",
    component: LoggedLayout,
    children: [
    {
    path: "",
    component: Contact
    },
    {
    path: "contact/:id",
    component: ContactDetails
    },
    {
    path:"groups",
    component: Groups
    }
    ]
}
];

