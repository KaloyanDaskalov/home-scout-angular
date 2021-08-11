# Home Scout

<h4>powered by angular</h4>

This is a demo project app for real estate advertisements. Build with Angular, Bootstrap 5 for UI/UX and Firebase as backend. The project consists of a main page with all the advertisements, authtentification and user area.

Frameworks and dependencies include:

- Angular
- Bootstrap 5
- Angular-fire
- angular-fontawesome

<h3>Project schema</h3>

<ul>
    <li>Main page with advertisements</li>
    <li>Navigation with quick filters and search box</li>
    <li>Footer with contacts, social medea links and quick filters</li>
    <li>User authentication
        <ul>
            <li>Register</li>
            <li>Login</li>
            <li>Reset password</li>
        </ul>
    </li>
    <li>Authenticated users area
          <ul>
            <li>My favorites</li>
            <li>My advertisements</li>
            <li>Profile page with user settings
                <ul>
                    <li>Change email</li>
                    <li>Change password</li>
                    <li>Delete account</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

[See project in action](https://hscout.netlify.app/advertisements)

# Running Locally

Get the repo

    $ gh repo clone KaloyanDaskalov/home-scout-angular hs-project
    $ cd hs-project

Install dependencies

    $ npm install -g gulp karma-cli protractor
    $ npm install

Run the test suite

    $ npm test

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
