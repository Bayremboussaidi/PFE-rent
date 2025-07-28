import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// User Pages
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ThankYouComponent } from './components/pages/thank-you/thank-you.component';
import { ListcarsComponent } from './components/pages/carlisting/carlisting.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
//import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';

// Admin Pages
import { DashComponent } from './ADMIN/dash/dash.component';
import { UserAComponent } from './ADMIN/users-a/users-a.component';
import { BookingAComponent } from './ADMIN/booking-a/booking-a.component';
import { CarListAComponent } from './ADMIN/car-list-a/car-list-a.component';
import { CardetailsAComponent } from './ADMIN/cardetails-a/cardetails-a.component';
import { CarDetaComponent } from './ADMIN/car-deta/car-deta.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserADetailsComponent } from './ADMIN/user-a-details/user-a-details.component';
import { ListAgenceComponent } from './AGENCE/list-agence/list-agence.component';
import { ContactAgenceComponent } from './AGENCE/contact-agence/contact-agence.component';
import { AgencelayoutComponent } from './layouts/agencelayout/agencelayout.component';
import { CarDetailsAgenceComponent } from './AGENCE/car-details-agence/car-details-agence.component';

//CHAT
//import { ChatComponent } from './CHAT/chat/chat.component';
import { AddCarComponent } from './ADMIN/add-car/add-car.component';
import { AgenceComponent } from './ADMIN/agence/agence.component';
import { ShowAgenceComponent } from './ADMIN/show-agence/show-agence.component';
import { AgenceDetailsComponent } from './ADMIN/agence-details/agence-details.component';
import { BlogsAComponent } from './ADMIN/blogs-a/blogs-a.component';
import { BlogDetailsAComponent } from './ADMIN/blog-details/blog-details.component';
import { ChatComponent } from './CHAT/chat/chat.component';
import { UserGuard } from './guards/userguard.guard';
import { AdminGuard } from './guards/adminguard.guard';
import { AgenceGuard } from './guards/agence.guard';
import { SHaredGuard } from './guards/shared.guard';

// Route Guards (Optional)
//import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // User Layout
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'listcars', component: ListcarsComponent },
      { path: 'listcars/:id', component: CarDetailsComponent },
      { path: 'blogs', component: BlogComponent },
      { path: 'blogs/:id', component: BlogDetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'notif', component: NotificationComponent }
    ]

  },

  // Admin Layout
  {
    path: 'admin',
    component: AdminLayoutComponent,
    //canActivate: [AdminGuard], // Protect Admin Routes (Optional)
    children: [
      { path: '', component: DashComponent },
      { path: 'usera', component: UserAComponent },
      { path: 'usera/:id', component: UserADetailsComponent , canActivate: [AdminGuard] },
      { path: 'bookinga', component: BookingAComponent },
      { path: 'carlista', component: CarListAComponent  },
      { path: 'carlista/:id', component: CarDetaComponent  },
      { path: 'chat', component: ChatComponent ,canActivate:  [SHaredGuard] },
      { path: 'add-car', component: AddCarComponent ,canActivate:  [SHaredGuard] },
      { path: 'add-agence', component: AgenceComponent , canActivate: [AdminGuard] },

      { path: 'show-agence', component: ShowAgenceComponent , canActivate: [AdminGuard] },
      { path: 'show-agence/:id', component: AgenceDetailsComponent , canActivate: [AdminGuard] },


      { path: 'admin-show-blogs', component: BlogsAComponent },  // Changed path for admin blogs
      { path: 'admin-show-blogs/:id', component: BlogDetailsAComponent }


    ]
  },
  {
    path: 'agence',
    component: AgencelayoutComponent,
    //canActivate: [AdminGuard],
    children: [
      { path: '', component: ListAgenceComponent } ,
      { path: 'contact', component: ContactAgenceComponent },

      { path: 'carlista', component: ListAgenceComponent  } ,

      { path: 'carlista/:id', component: CarDetailsAgenceComponent }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
