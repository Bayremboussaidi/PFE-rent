import { APP_INITIALIZER, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // ✅ Fixes `[routerLink]` issues

// ✅ PrimeNG Imports (Fixes `p-dialog`, `p-checkbox`, `p-button` issues)
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';


// ✅ Bootstrap Datepicker (Fixes `bsConfig` issues)
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// ✅ Third-party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// ✅ Routing Module
import { AppRoutingModule } from './app-routing.module';

// ✅ Main Component
import { AppComponent } from './app.component';

// ✅ Layouts
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

// ✅ Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { BecomeDriverSectionComponent } from './components/become-driver-section/become-driver-section.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { FindCarFormComponent } from './components/find-car-form/find-car-form.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { FeaturedVoitureListComponent } from './components/featured-voiture-list/featured-voiture-list.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ThankYouComponent } from './components/pages/thank-you/thank-you.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { CommonSectionComponent } from './components/common-section/common-section.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ListcarsComponent } from './components/pages/carlisting/carlisting.component';
import { DashComponent } from './ADMIN/dash/dash.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { BookingModalComponent } from './components/booking/booking.component';
import { UserAComponent } from './ADMIN/users-a/users-a.component';
import { BookingAComponent } from './ADMIN/booking-a/booking-a.component';
import { HeaderAComponent } from './ADMIN/header-a/header-a.component';
import { CarListAComponent } from './ADMIN/car-list-a/car-list-a.component';
import { CardetailsAComponent } from './ADMIN/cardetails-a/cardetails-a.component';
import { CarDetaComponent } from './ADMIN/car-deta/car-deta.component';
//import { NotificationComponent } from './components/notification/notification.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { TitanComponent } from './components/titan/titan.component';

import { ToastModule } from 'primeng/toast';





import { CommonModule } from '@angular/common';


// ✅ Keycloak Imports
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptor } from './services/interceptor/http-token';

import { FormsModule } from '@angular/forms'


//import { EmailDialogComponent } from './components/dialog/email-dialog/email-dialog.component';


import { MessagesModule } from 'primeng/messages';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialComponent } from './test/material/material.component';
import { ContactBadgeComponent } from './components/contact-badge/contact-badge.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserADetailsComponent } from './ADMIN/user-a-details/user-a-details.component';
import { HeadAgenceComponent } from './AGENCE/head-agence/head-agence.component';
import { ContactAgenceComponent } from './AGENCE/contact-agence/contact-agence.component';
import { ListAgenceComponent } from './AGENCE/list-agence/list-agence.component';
import {AgencelayoutComponent} from './layouts/agencelayout/agencelayout.component';
import { CarDetailsAgenceComponent } from './AGENCE/car-details-agence/car-details-agence.component';
import { ChatComponent } from './CHAT/chat/chat.component'






import { InputNumberModule } from 'primeng/inputnumber';
import { AddCarComponent } from './ADMIN/add-car/add-car.component';
import { AgenceComponent } from './ADMIN/agence/agence.component';
import { ShowAgenceComponent } from './ADMIN/show-agence/show-agence.component';
import { AgenceDetailsComponent } from './ADMIN/agence-details/agence-details.component';
import { BlogsAComponent } from './ADMIN/blogs-a/blogs-a.component';
import { BlogDetailsAComponent } from './ADMIN/blog-details/blog-details.component';
import { UserGuard } from './guards/userguard.guard';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { PaymentComponent } from './ADMIN/payment/payment.component';


// ✅ Keycloak Initialization Function
export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutSectionComponent,
    AddCarComponent,
    BecomeDriverSectionComponent,
    AboutComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    HeroSliderComponent,
    FindCarFormComponent,
    ServicesListComponent,
    ServiceItemComponent,
    FeaturedVoitureListComponent,
    TestimonialComponent,
    RegisterComponent,
    ThankYouComponent,
    NotFoundComponent,
    BlogListComponent,
    CommonSectionComponent,
    LoginComponent,
    ListcarsComponent,
    DashComponent,
    CarDetailsComponent,
    VideoPlayerComponent,
    BookingModalComponent,
    UserAComponent,
    BookingAComponent,

    AdminLayoutComponent,
    UserLayoutComponent,
    AgencelayoutComponent,
    HeaderAComponent,
    CarListAComponent,
    CardetailsAComponent,
    CarDetaComponent,

    TopMenuComponent,
    TitanComponent,
    /*EmailDialogComponent,*/
    MaterialComponent,
    ContactBadgeComponent,
    FaqComponent,
    NotificationComponent,
    UserADetailsComponent,
    HeadAgenceComponent,
    ContactAgenceComponent,
    ListAgenceComponent,
    CarDetailsAgenceComponent,
    ChatComponent,
    AgenceComponent,
    ShowAgenceComponent,
    AgenceDetailsComponent,
    BlogsAComponent,
    BlogDetailsAComponent,
    ChatbotComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    InputNumberModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    SlickCarouselModule,

    ReactiveFormsModule,
    MessagesModule,
    BrowserAnimationsModule,
    RouterModule, // ✅ Fixes `[routerLink]` errors
    DialogModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    FileUploadModule,
    TagModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot() // ✅ Fixes `bsConfig` errors
  ],
  providers: [
    HttpClient,
    KeycloakService,
    UserGuard,  // <-- Add a comma here
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // ✅ Added `NO_ERRORS_SCHEMA`
})
export class AppModule {}
