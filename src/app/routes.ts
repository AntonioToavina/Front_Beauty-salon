import { CommonService } from './shared/service/common.service';

const userTypeNavigationMap = {
    Admin: getAdminNavigations,
    Customer: getCustomerNavigations,
    Staff: getStaffNavigations,
};

function getAdminNavigations() {
    return [
        {
            id: 'home',
            title: 'Dashboard',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/admin/dashboard',
        },
        {
            id: 'management',
            title: 'Gestion',
            type: 'aside',
            icon: 'heroicons_outline:cog',
            link: '',
            children: [
                {
                    id: 'management.users',
                    title: 'Employés',
                    type: 'basic',
                    icon: 'heroicons_outline:user-group',
                    link: '/admin/management/staff',
                },
                {
                    id: 'management.users',
                    title: 'Heure de travail',
                    type: 'basic',
                    icon: 'heroicons_outline:calendar',
                    link: '/admin/management/workhours',
                },
                {
                    id: 'management.service',
                    title: 'Services',
                    type: 'basic',
                    icon: 'heroicons_outline:service',
                    link: '/admin/management/service-mgmt/services',
                },
                {
                    id: 'management.service.commission',
                    title: 'Commission',
                    type: 'basic',
                    icon: 'heroicons_outline:receipt-percent',
                    link: '/admin/management/service-mgmt/commissions',
                },
            ],
        },
        {
            id: 'expense-mgmt',
            title: 'Dépenses',
            type: 'aside',
            icon: 'heroicons_outline:credit-card',
            link: '',
            children: [
                {
                    id: 'expense-mgmt.salary',
                    title: 'Salaire',
                    type: 'basic',
                    icon: 'heroicons_outline:worker-salary',
                    link: '/admin/expense/salary',
                },

                {
                    id: 'expense-mgmt.expense',
                    title: 'Dépenses diverses',
                    type: 'basic',
                    icon: 'heroicons_outline:pay-day',
                    link: '/admin/expense/general',
                },
            ],
        },
        // lien pour les clients mais pas encore implementé
        {
            id: 'booking-mgmt',
            title: 'Réservation',
            type: 'aside',
            icon: 'heroicons_outline:barbershop',
            link: '',
            children: [
                {
                    id: 'booking-mgmt.general',
                    title: 'Réserver',
                    type: 'basic',
                    icon: 'heroicons_outline:booking-calendar',
                    // /customer/booking/general
                    link: '/admin/booking/general',
                },

                {
                    id: 'booking-mgmt.history',
                    title: 'Historique',
                    type: 'basic',
                    icon: 'heroicons_outline:document-search',
                    // /customer/booking/history
                    link: '/admin/booking/history',
                },
            ],
        },
    ];
}

function getCustomerNavigations() {
    return [];
}

function getStaffNavigations() {
    return [
        {
            id: 'home',
            title: 'Accueil',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: '/staff/home',
        },
        {
            id: 'home',
            title: 'Heure de travail',
            type: 'basic',
            icon: 'heroicons_outline:calendar',
            link: '/staff/workHour',
        },
    ];
}

export const navigations = (userType: string) => {
    let arrayMenu = [];

    let navigationFunction = userTypeNavigationMap[userType];
    if (navigationFunction) arrayMenu = navigationFunction();

    return {
        compact: arrayMenu,
        default: arrayMenu,
        futuristic: arrayMenu,
        horizontal: arrayMenu,
    };
};
