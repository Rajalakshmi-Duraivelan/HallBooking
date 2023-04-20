import express from "express";

const PORT = 9000;
let hallData = [
    {
        "id": "H1",
        "numberOfSeats": 75,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 5000,
        "ifBooked": "true",
        "RoomId": 101,
        "RoomName": "Duplex"
      },
      {
        "id": "H2",
        "numberOfSeats": 100,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 5000,
        "ifBooked": "false",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H3",
        "numberOfSeats": 125,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 15000,
        "ifBooked": "false",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H4",
        "numberOfSeats": 300,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 50000,
        "ifBooked": "false",
        "RoomId": 102,
        "RoomName": "Duplex"
      },
      {
        "id": "H5",
        "numberOfSeats": 200,
        "amenities": ["Ac", "chairs", "discolights"],
        "price": 25000,
        "ifBooked": "false",
        "RoomId": 104,
        "RoomName": "Duplex"
      }
];


let bookRoom =[];
let customers=[];

const app = express();
app.use(express.json());

//Show Hall Details
app.get("/show-HallDetails",(req,res)=>{
  res.send(hallData);
  console.log(hallData);
})

//Create new Hall
app.post("/create-hall",(req,res)=>{
    const newHall = {
        id : `H${hallData.length+1}`,
        numberOfSeats : req.body.numberOfSeats,
        amenities : req.body.amenities,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
        RoomId: req.body.RoomId,
        RoomName: req.body.RoomName
    }
    console.log(newHall)
    hallData.push(newHall)
    let room = {
        id : `H${hallData.length+1}`,
        numberOfSeats : req.body.numberOfSeats,
        amenities : req.body.amenities,
        price: req.body.price,
        ifBooked: req.body.ifBooked,
        RoomId: req.body.RoomId,
        RoomName: req.body.RoomName
    };
    res.status(200).json({
        message:'room created',
        room:room
    })
})

//Book Room - using params
app.post('/bookRoom/:name/:date/:start/:end/:id',(req,res)=>{
    let flag=false;
    console.log(hallData.length)
    for(let i=0;i<hallData.length;i++)
    {
        console.log(req.params.id,hallData[i].id, hallData[i].ifBooked)
        if(req.params.id === hallData[i].id && hallData[i].ifBooked === "false")
        {
             flag=true;
            let roombookObj = {
                customerName: req.params.name,
                roomName: hallData[i].RoomName,
                date: req.params.date,
                start: req.params.start,
                end: req.params.end,
                roomId: req.params.roomId,
                ifBooked:true
            };
            let customerObj = {
                customerName: req.params.name,
                roomName: room[i].RoomName,
                date: req.params.date,
                start: req.params.start,
                end: req.params.end,  
            }
            bookRoom.push(roombookObj);
            customers.push(customerObj);
            res.status(200).json({
                'message':'room booked!',
                roombookObj,
            })

        }
    }
})
app.post("/book-room",(req,res)=>{
    //let booked = false;
    console.log(hallData)
    let count=0
    for(let i=0;i<hallData.length;i++){
        console.log(hallData[i])
        console.log(req.body.id, hallData[i].id,hallData[i].ifBooked)
        // if(req.params.id === hallData[i].id && hallData[i].ifBooked==="false"){
        //     count = count + 1
        //     console.log(count)
        // }
        
        if(req.body.id === hallData[i].id && hallData[i].ifBooked==="false"){
            //booked = true;
            let roombooked = {
                id: hallData[i].id,
                numberOfSeats: hallData[i].numberOfSeats,
                amenities:  hallData[i].amenities,
                price: hallData[i].price,
                ifBooked: "true",
                customerName: req.body.customerName,
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                RoomId: hallData[i].RoomId,
                RoomName: hallData[i].RoomName
            }
            let customer = {
                customerName: req.body.customerName,
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                RoomId: hallData[i].RoomId,
                RoomName: hallData[i].RoomName
            }
            bookRoom.push(roombooked)
            customers.push(customer)
            
            res.status(200).json({
                'message':'room booked!',
                roombooked,
            })
        }
        else if(req.body.id === hallData[i].id && req.body.ifBooked === "true"){
            res.send("All Rooms are booked! Please try later");
        }
        else{
            res.send("Couldnot book room! Room not available");
        }
        
    }
    // if(booked === false){
    //     res.send("Cannot book room all places full! Please try later");
    // }
})

//Show Booked Rooms
app.get('/show-BookedRooms',(req,res)=>{
    res.send(bookRoom);
})

//show Customers
app.get('/show-Customers',(req,res)=>{
    res.send(customers);
})


app.listen(`${PORT}`,()=>console.log(`server started in localhost:${PORT}`))