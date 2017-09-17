# Description of work and decisions

I created a responsive  find-trip form using Angular 4, TypeScript, HTML5 and CSS3. I have used  Angular-CLI to bootstrap / scaffold the application.

I created a separate find-trip custom component and used it in application.  I used ReactiveFormModule to create reactive form. I created findTripForm  model and initialize it in component. I used FormBuilder,  FormGroup and Validatators classes  to  build the reactive form. While initializing I have added the validation rules as per requirement.

I have put template in separate HTML file.  I am using same template for retrieve booking form and displaying result. I used ngIf structural directive with ng-template to switch between two views. I could have used separate component to show result of query and used Router Module to navigate between two,  but to make thing simple I put both in same component.

I have also put styles used in component into separate CSS file.  I used CSS to style the layout and element . In  CSS,  I used media Query to make form responsive. I could have used SASS/SCSS file for styling,  but for this small app I used plain CSS . For font I could find the required "Excellence  in Motion"  font. So I imported and use similar font  "Roboto" font family.

I have created a separate MockDataService class to retrieve mock booking data and injected it find-trip component. In this class I have added a generic request method to handle HTTP REST calls and handle errors. I am using HttpModule and RxJs Observable to retrieve mocked trip data from local mock.json file. The same request method can be used to retrieve actual data from remote API.  The getBooking Method use this generic request method and return Observable with JSON data.

I used jasmine with Karma for  unit test and jasmine and protractor for end to end (e2e) test. I have added unit test specs  for find-trip component, MockDataService class and app component. I have also added one spec file for end to end test.

I used tslint for TypeScript linting.  I have also added some documentation to the method in find-trip component.

With help of Webpack module bundler this project builds an optimized and efficient find-trip component.

## Note: While Running the app use following input to retrieve booking.

Booking Code:  PZIGZ3
Family Name:   HESP

