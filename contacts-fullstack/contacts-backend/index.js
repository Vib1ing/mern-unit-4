const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"))

const requestLogger=(req,res,next)=>{
    console.log(`Request Method: ${req.method}`)
    console.log(`Request URL: ${req.url}`)
    console.log("Request body:" ,req.body)
    console.log("--------------")
    next();
}
app.use(requestLogger)
const port = 3001;
let contacts =[
    {id:1,name:"John Doe",email:"john@example.com"},
    {id:2,name:"Jane Smith",email:"jane@example.com"},
    {id:3,name:"Bob Johnson",email:"bob@example.com"}
]

app.post("/api/contacts",(req,res)=>{
    const contact=req.body;
    contact.id=`${Date.now()}${Math.floor(Math.random()*10000)}`;
    if(contact.name===undefined){
        res.status(400).json({error:"No name"})

    }
    if(contact.email===undefined){
        res.status(400).json({error:"No email"})
    } 
    else {
        for (let index = 0; index < contacts.length; index++) {
            const email = contacts[index].email;
            if(contact.email===email){
                res.status(409).json({error:"Email address already exists"})
                return;
            }
        }
        contacts.push(contact)
        
    }
    res.status(201).json(contact)
})
app.get("/",(req,res)=>{
    res.send("What's up my goodie")
})

app.get("/api/info",(req,res)=>{
    res.send(`<h1>Contacts Web Server</h1>
        <p>Number of contacts: ${contacts.length}</p>`)
})

app.get("/api/contacts/:id", (req,res)=>{
    const contact=contacts.find((m)=>m.id===Number(req.params.id));
    if(!contact){
        res.status(404).json({error: "Contact not found"})
    }
    else{ 
        res.json(contact)
    }
})

app.delete("/api/contacts/:id",(req,res)=>{
    const contact=contacts.find((m)=>m.id===Number(req.params.id));
    if(!contact){
        res.status(404).json({error: "Contact not found"})
    }
    else{
        contacts = contacts.filter((m)=>m.id!=req.params.id);
        res.status(204).json({message:"Contact deletion successful"})
    }
})



app.get("/api/contacts",(req,res)=>{
    res.json(contacts);
})

app.listen(port,()=>{
    console.log(`Server is running on ${port} `)
})