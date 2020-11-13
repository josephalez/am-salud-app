import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-book-appointment',
    templateUrl: './book-appointment.page.html',
    styleUrls: ['./book-appointment.page.scss']
})
export class BookAppointmentPage implements OnInit {
    bookDate: any;
    employeeList: any = [
        {
            index: 1,
            image: 'https://placehold.it/52x52',
            name: 'Ben Jhonson'
        },
        {
            index: 2,
            image: 'https://placehold.it/52x52',
            name: 'Kieran Dely'
        },
        {
            index: 3,
            image: 'https://placehold.it/52x52',
            name: 'Helen White'
        },
        {
            index: 4,
            image: 'https://placehold.it/52x52',
            name: 'Daniel William'
        }
    ];
    timeSlot: any = [
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM'
    ];
    selectedEmployee: any = 2;
    activeTimeSlot: any = '12:00 PM';
    minYear: any = new Date().getFullYear();
    maxYear: any = new Date().getFullYear() + 5;
    constructor (private navCtrl: NavController) {
        this.bookDate = new Date();
    }

    ngOnInit() { }
    backPage() {
        this.navCtrl.back();
    }
    setEmployee(emp) {
        this.selectedEmployee = emp.index;
    }
    setTimeSlot(time) {
        this.activeTimeSlot = time;
    }
    continue() {
        this.navCtrl.navigateForward('/booking-detail');
    }
}
