describe("Gherkin Tracks Users Clicks Makes Gherkin Tests", function() {

  /**
  * # Goal capture commen events
  * Click Link
  * Click Button
  * File in form field
  * Click Radio
  * Click Checkbox
  * Select
  *
  *
  * # Harder Items
  * File Upload
  * Save on page reload etc
  * CSS / ID needs
  *
  */
  var eventStore;

  beforeEach(function() {
    converter = new EventsConverter();

    eventStore = [];
    /**
     * 0 = Button
     */
     eventStore.push(
       {
         type: "click",
         data: {
           target: {
             nodeName: "BUTTON",
             outerText: "Button with ID"
           },
           path: [
             { button: "#foo-button.btn.btn-warning" }
           ]
         }
       }
     );

     eventStore.push(
       {
         type: "click",
         data: {
           target: {
             value: "foo@foo.com",
             nodeName: "INPUT",
             labels: [
               {
                 innerText: "Email address"
               }
             ]
           }
         }
       }
     );

  });

  it("should convert button click to step", function(){
      var results = converter.stepType(eventStore[0])
      expect(results).toEqual('When I press "BUTTON"');
  });

  //@TODO test gets id not button text


  it("should convert actions to form interactions", function(){
      var results = converter.stepType(eventStore[1])
      expect(results).toEqual('When I fill in "Email address" with "foo@foo.com"');
  });

  //@TODO Test Gets ID not label

  //@TODO no label no id no name use css path
});
