//Card ID: 1-Fitness, 2-Swimming Pool, 3-Sauna, 4-Hot Tub, 5-Party Room, 6-Rooftop, 7-Game Room, 8-Guest Suite
//----------------------------------------------------------------------------------------------------------------
let cardModal = document.getElementById('cardModal');
const Timeslot = ['5:00am-7:00am','7:00am-9:00am','9:00am-11:00am','11:00am-1:00pm','1:00pm-3:00pm','3:00pm-5:00pm','5:00pm-7:00pm','7:00pm-9:00pm','9:00pm-11:00pm','11:00pm-1:00am', '1:00am-3:00am','3:00am-5:00am'];
const partyTimeslot=['11:00am-6:00pm','7:00pm-2:00am', '11:00am - 2:00am (All day)'];
const guestSuite = ['1 Night', '2 Nights', '3 Nights'];
let timeslot = document.querySelector('#timeslot');
cardModal.addEventListener('show.bs.modal', function (event) {
  // Card that triggered the modal
  let card = event.relatedTarget
  
  let amenity = document.getElementById('amenity')
  let modalImage = document.getElementById('modalImage');
  let images = document.querySelectorAll('.card-img-top')
  
  //Add picture to modal
  modalImage.src = images[card.id-1].src;
  //Add selected amenity to drop down menu
  amenity.selectedIndex = `${card.id}`
 
  createTimeSlots(card);
  
  
})

function createTimeSlots(card){
    let options = document.getElementById('timeslot');
    options.innerHTML='';
    let price = document.querySelector('#price');
    price.innerHTML='$0.00';
    if(card.id == 1){       
        for(let i =0; i<12; i++){
          let option = document.createElement('option');
          option.value = Timeslot[i]
          option.innerHTML = Timeslot[i]
          options.appendChild(option)
        }
    }else if((card.id>1 && card.id<5) || card.id==6 || card.id==7){
        for(let i = 1; i<9; i++){
          let option = document.createElement('option');
          option.value = Timeslot[i]
          option.innerHTML = Timeslot[i]
          options.appendChild(option)
        }
    }else if(card.id==5){
        for(let i =0; i<partyTimeslot.length;i++){
            let option = document.createElement('option');
          option.value = partyTimeslot[i]
          option.innerHTML = partyTimeslot[i]
          options.appendChild(option)
        }
    }else if(card.id==8){
        let numberOfNight = 1;        
        price.innerHTML='$105.00';
        for(let i =0; i<guestSuite.length;i++){
            let option = document.createElement('option');
          option.value = numberOfNight;
          option.innerHTML = guestSuite[i]
          options.appendChild(option)
          numberOfNight++;          
        }
        console.log(card.id)
        timeslot.addEventListener('change',calculateTotalGuestSuite);   
    }
    if(card.id!=8){
      console.log(card.id)
      timeslot.removeEventListener('change',calculateTotalGuestSuite);
    }
}

function calculateTotalGuestSuite(){
  console.log("calculateTotalGuestSuite called")
  let price = document.querySelector('#price');
  price.innerHTML='';
  let numOfNight = document.querySelector('#timeslot').value;
  let total =  105 * parseInt(numOfNight);
  price.innerHTML=`$`+total.toFixed(2);
}

