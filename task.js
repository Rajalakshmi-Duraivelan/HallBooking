import express from "express";

const PORT = 9000;
const hallData = [
    {
        "id": "H100",
        "numberOfSeats": 75,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 5000,
        "ifBooked": true,
        "customerName": "RK",
        "date": "02-feb-2023",
        "startTime": "10-feb-2023 at 12PM",
        "endTime": "11-feb-2020 at 11am",
        "RoomId": 101,
        "RoomName": "Duplex"
      },
      {
        "id": "H101",
        "numberOfSeats": 100,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 5000,
        "ifBooked": false,
        "customerName": "Sivashini",
        "date": "",
        "startTime": "",
        "endTime": "",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H102",
        "numberOfSeats": 125,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 15000,
        "ifBooked": false,
        "customerName": "Sivashini",
        "date": "",
        "startTime": "",
        "endTime": "",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H103",
        "numberOfSeats": 300,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 50000,
        "ifBooked": false,
        "customerName": "Sivashini",
        "date": "",
        "startTime": "",
        "endTime": "",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H104",
        "numberOfSeats": 200,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 25000,
        "ifBooked": false,
        "customerName": "Sivashini",
        "date": "",
        "startTime": "",
        "endTime": "",
        "RoomId": 104,
        "RoomName": "Duplex"
      }
];


let bookRoom =[];
let customers=[];

const app = express();
app.use(express.json());

app.get("/show-HallDetails",(req,res)=>{
  res.send(hallData);
  console.log(hallData);
})

app.get("/hall-details",(req,res)=>{
    console.log(req.query);
        const {ifBooked,numberOfSeats} = req.query;
        let result = hallData;
        if(ifBooked){
            result = result.filter((hall)=>hall.ifBooked === ifBooked);
        }
        if(numberOfSeats){
            result = result.filter((hall)=>hall.numberOfSeats >= +numberOfSeats);
        }
        res.send(result)
})

app.listen(`${PORT}`,()=>console.log(`server started in localhost:${PORT}`))