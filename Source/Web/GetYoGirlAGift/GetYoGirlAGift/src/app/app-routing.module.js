"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var about_component_1 = require("./directives/about/about.component");
var home_component_1 = require("./directives//home/home.component");
var homepage_component_1 = require("./directives//homepage/homepage.component");
var login_component_1 = require("./directives//login/login.component");
var register_component_1 = require("./directives//register/register.component");
var auth_guard_1 = require("./guards/auth.guard");
var appRoutes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'About', component: about_component_1.AboutComponent },
    { path: 'Login', component: login_component_1.LoginComponent },
    { path: 'Register', component: register_component_1.RegisterComponent },
    { path: 'Home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Homepage', component: homepage_component_1.HomepageComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app-routing.module.js.map