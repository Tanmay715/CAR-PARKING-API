import express from "express";

const router = express.Router();
class slots {
   total_slot
   slots(number){
   this.total_slot=number;
  }
}

  let total_slot=new slots(0);

class park {
  allocated_slot_number
  park(number){
    this.allocated_slot_number = number;
  }
}

let allocated_slot = new park(0);

let car = [
  {
    slot_no:1,
    car_color:"red",
    car_reg_no:"KA-01-AB-2211"
  }
];

router.get("/status", (req, res) => {
  res.send(car);
});

router.get("/registration_numbers/:color", (req, res) => {
  const color = req.params.color;
  const Car = car.filter((car) => car.car_color == color);
  const reg_no = [];
  for(let i =0;i<Car.length;i++){
    reg_no[i]=Car[i].car_reg_no;
  }
  res.send(reg_no);
});

router.post("/park", (req, res) => {
  const user = req.body;
  let n = car[car.length-1].slot_no;
  const userId = {slot_no:n,...user};
  allocated_slot.allocated_slot_number = n+1;
  if(n+1<=total_slot.total_slot)
  car.push(userId);
  else throw new Error('Parking Slots are Full');
  car[car.length-1].slot_no++;
  res.send({allocated_slot});
});

router.post("/clear", (req, res) => {
  const slotNo = req.body.slot_number;
  const ind = car.findIndex((car) => car.slot_no == slotNo);
  if(ind==-1) throw new Error('Given Slot is Already Empty');
  else car.splice(ind,1);
  res.send(car);
});

router.post("/parking_lot", (req, res) => {
  console.log(">>>",req)
  total_slot.total_slot = req.body.no_of_slot;
  res.send(total_slot);
});

router.patch("/parking_lot", (req, res) => {
  console.log(">>>",total_slot)
  let no_of_slots = req.body.increment_slot;
  total_slot.total_slot = total_slot.total_slot + no_of_slots;

  res.send({total_slot});
});

router.get("/slot_numbers/:color", (req, res) => {
  const color = req.params.color;
  const Car = car.filter((car) => car.car_color==color);
  const slots = [];
  for(let i = 0;i<Car.length;i++){
    slots[i]= Car[i].slot_no;
  }
  res.send(slots);
});

export default router;
