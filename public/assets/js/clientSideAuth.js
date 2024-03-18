function log(msg) {
    console.log(msg);
}

class Authentication {
    constructor() {
        this.userInfo = {
            id: null,
            isLoggedIn: null,
            isSubscribed: null,
            sid: null
        };
    }

    // When property is set run updateButtonTitles
    set user(user) {
        this.userInfo = user;
        this.updatePageDynamics();
    }
    get user() {
        return this.userInfo;
    }

    // Update the pages that require the user info
    updatePageDynamics() {
        if ($('#subscribe_button').text() != '')
            this.__updateSubscribePage();
    }

    __updateSubscribePage() {
        log('class Authentication: updating subscription page');

        let subscribe_button = $('#subscribe_button');
        let signup_login = $('#signup_login');

        if (this.user.isLoggedIn) {
            signup_login.attr('href', '/');
            signup_login.text('Enter Site');

            // Subscribe shenanigans
            subscribe_button.text(this.user.isSubscribed ? 'Manage Subscription' : 'Subscribe');
            subscribe_button.attr('href',
                this.user.isSubscribed ? `${_paymentAPIURL}/manage/?sid=${this.user.sid}` :
                    `${_paymentAPIURL}/subscribe/?userid=${this.user.id}`);
        } else {
            signup_login.text('Sign Up / Login');
            subscribe_button.text('Login to Subscribe');
            subscribe_button.attr('href', _loginURL);
        }
    }
}

auth = new Authentication();

// auth.user = { id: 0, isLoggedIn: true, isSubscribed: true, sid: 'cus_testies' };