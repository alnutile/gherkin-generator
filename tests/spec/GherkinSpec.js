describe("Gherkin converter:", function() {

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
             {
               button: "#foo-button.btn.btn-warning" ,
               id: "foo-button" ,
             }
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
           },
           path: [
             {
               id: "exampleInputEmail"
             }
           ]
         }
       }
     );

     eventStore.push(
       {
         type: "click",
         data: {
           target: {
             id: "learn-more",
             nodeName: "A",
             innerText: "Learn more"
           },
         }
       }
     );

  });

  it("should convert button click to step using label", function(){
      var results = converter.stepType(eventStore[0]);
      expect(results).toEqual('When I press "Button with ID"');
  });

  //@TODO test gets id not button text
  it("should get ID since no labels", function(){
      var eventStoreUpdated = eventStore[0];
      eventStoreUpdated.data.target.outerText = '';
      var results = converter.stepType(eventStoreUpdated);
      expect(results).toEqual('When I press "foo-button"');
  });

  it("should convert actions to form interactions", function(){
      var results = converter.stepType(eventStore[1])
      expect(results).toEqual('When I fill in "Email address" with "foo@foo.com"');
  });

  it("should use id if not label", function(){
      var eventStoreUpdated = eventStore[1];
      eventStoreUpdated.data.target.labels = [];
      console.log(eventStoreUpdated);
      var results = converter.stepType(eventStoreUpdated)
      expect(results).toEqual('When I fill in "exampleInputEmail" with "foo@foo.com"');
  });

  it("should use xpath for pressing", function(){
      var eventStoreUpdated = eventStore[1];
      eventStoreUpdated.data.target.labels = [];
      console.log(eventStoreUpdated);
      var results = converter.stepType(eventStoreUpdated)
      expect(results).toEqual('When I fill in "exampleInputEmail" with "foo@foo.com"');
  });

  it("should output the array of values", function() {
      var results = converter.iterateOverEvents(eventStore);
      expect(results.length).toEqual(3);
  })

  it("should write out the results in a test", function() {
      var results     = converter.iterateOverEvents(eventStore);
      var finalOutput = converter.outputFeature(results);
      expect(finalOutput).toContain("When I press \"Button with ID\"");
      expect(finalOutput).toContain("When I fill in \"Email address\" with \"foo@foo.com\"\n");
  })

  it("should turn links into a step", function() {
      console.log(eventStore[2]);
      var results = converter.stepType(eventStore[2]);
      expect(results).toEqual('When I follow "Learn more"');
  })
});
