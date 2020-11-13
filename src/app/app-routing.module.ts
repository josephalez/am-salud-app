import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoginGuard } from './services/auth/login.guard';

const routes: Routes = [
     { path: '', redirectTo: 'sign-in', pathMatch: 'full' },

     //{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    {
      path: 'nutricion',
      loadChildren: './pages/nutricion/nutricion.module#NutricionPageModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'sign-in',
      loadChildren: './pages/sign-in/sign-in.module#SignInPageModule',
      canActivate: [LoginGuard]
    },
    {
      path: 'sign-up',
      loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule'
    },
    {
      path: 'home',
      loadChildren: './pages/home/home.module#HomePageModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'laser-clinic',
      loadChildren: './pages/laser-clinic/laser-clinic.module#LaserClinicPageModule',
      canActivate: [AuthGuardService]
    },
    {
      path: 'perfil',
      loadChildren: './pages/perfil/perfil.module#PerfilPageModule',
      canActivate: [AuthGuardService]
    },

    { 
      path: 'reserva', 
      loadChildren: './pages/reserva/reserva.module#ReservaPageModule',
      canActivate:[AuthGuardService]
    },

    { 
      path: 'add-person',
      loadChildren: './pages/add-person/add-person.module#AddPersonPageModule',
   /*    canActivate:[AuthGuardService] */
    },
    
    {
      path: 'paquetes',
      loadChildren: './pages/paquetes/paquetes.module#PaquetesPageModule',
      canActivate:[AuthGuardService]
    },

    {
      path: 'tienda',
      loadChildren: './pages/tienda/tienda.module#TiendaPageModule',
      canActivate:[AuthGuardService]      
    },
    { 
      path: 'nosotros', 
      loadChildren: './pages/nosotros/nosotros.module#NosotrosPageModule',
      canActivate:[AuthGuardService]
    },
    { 
      path: 'servicios', 
      loadChildren: './pages/servicios/servicios.module#ServiciosPageModule',
      canActivate:[AuthGuardService] 
    },
    { 
      path: 'carrito', 
      loadChildren: './pages/carrito/carrito.module#CarritoPageModule',
      canActivate:[AuthGuardService]
    },  { path: 'asociados', loadChildren: './pages/asociados/asociados.module#AsociadosPageModule' },



     /*
     {
       path: 'forgot-password',
       loadChildren:
         './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule'
     },
     {
       path: 'slider',
       loadChildren: './pages/slider/slider.module#SliderPageModule'
     },
     {
       path: 'phone-verification',
       loadChildren:
         './pages/phone-verification/phone-verification.module#PhoneVerificationPageModule'
     },
     {
       path: 'otpverification',
       loadChildren:
         './pages/otpverification/otpverification.module#OTPVerificationPageModule'
     },
     {
       path: 'book-appointment',
       loadChildren:
         './pages/book-appointment/book-appointment.module#BookAppointmentPageModule'
     },
     {
       path: 'select-service',
       loadChildren:
         './pages/select-service/select-service.module#SelectServicePageModule'
     },
     {
       path: 'booking-detail',
       loadChildren:
         './pages/booking-detail/booking-detail.module#BookingDetailPageModule'
     },
   
     {
       path: 'salon-detail',
       loadChildren:
         './pages/salon-detail/salon-detail.module#SalonDetailPageModule'
     }*/
];
@NgModule({
     imports: [
          RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
     ],
     exports: [RouterModule]
})
export class AppRoutingModule { }
